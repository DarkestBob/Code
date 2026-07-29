"""
✋ Hand Gesture Finger Counter (1–10)
=====================================
Real-time finger counting using webcam, OpenCV, and MediaPipe.
Detects up to 2 hands and counts total raised fingers (0–10).

Controls:
    Q - Quit
    F - Toggle fullscreen
    M - Toggle mirror mode
"""

import cv2
import numpy as np
import mediapipe as mp
import time
import math


# ─── MediaPipe Setup ──────────────────────────────────────────────────────────

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Landmark indices for fingertips and their corresponding PIP/IP joints
FINGER_TIPS = [
    mp_hands.HandLandmark.INDEX_FINGER_TIP,
    mp_hands.HandLandmark.MIDDLE_FINGER_TIP,
    mp_hands.HandLandmark.RING_FINGER_TIP,
    mp_hands.HandLandmark.PINKY_TIP,
]
FINGER_PIPS = [
    mp_hands.HandLandmark.INDEX_FINGER_PIP,
    mp_hands.HandLandmark.MIDDLE_FINGER_PIP,
    mp_hands.HandLandmark.RING_FINGER_PIP,
    mp_hands.HandLandmark.PINKY_PIP,
]

THUMB_TIP = mp_hands.HandLandmark.THUMB_TIP
THUMB_IP = mp_hands.HandLandmark.THUMB_IP
THUMB_MCP = mp_hands.HandLandmark.THUMB_MCP
WRIST = mp_hands.HandLandmark.WRIST


# ─── Color Palette ────────────────────────────────────────────────────────────

class Colors:
    """Premium color palette using BGR format for OpenCV."""
    # Gradient-inspired palette
    CYAN = (235, 206, 50)         # #32CEEB
    MAGENTA = (200, 55, 200)      # #C837C8
    ELECTRIC_BLUE = (255, 150, 30) # #1E96FF
    LIME_GREEN = (80, 220, 100)   # #64DC50
    CORAL = (100, 120, 255)       # #FF7864
    GOLD = (50, 200, 255)         # #FFC832
    SOFT_WHITE = (240, 240, 245)  # #F5F0F0
    DARK_BG = (30, 30, 35)        # #231E1E
    PANEL_BG = (45, 42, 40)       # #282A2D
    MUTED_TEXT = (160, 160, 170)  # #AAA0A0

    # Gradient stops for the count display
    GRADIENT = [
        (180, 180, 190),  # 0 - gray
        (255, 150, 30),   # 1 - blue
        (235, 206, 50),   # 2 - cyan
        (80, 220, 100),   # 3 - green
        (50, 200, 255),   # 4 - gold
        (100, 120, 255),  # 5 - coral
        (200, 55, 200),   # 6 - magenta
        (255, 100, 100),  # 7 - purple-blue
        (100, 200, 255),  # 8 - orange
        (50, 255, 200),   # 9 - yellow-green
        (200, 100, 255),  # 10 - pink
    ]


# ─── Finger Counting Logic ───────────────────────────────────────────────────

def count_fingers(hand_landmarks, handedness_label):
    """
    Count the number of raised fingers for a single hand.

    Uses landmark geometry:
    - Thumb: Checks if the thumb tip is extended away from the palm
      by comparing the angle formed at the thumb IP joint.
    - Other fingers: Checks if the fingertip is above (lower y) the PIP joint,
      indicating the finger is extended.

    Args:
        hand_landmarks: MediaPipe hand landmarks.
        handedness_label: 'Left' or 'Right' (from MediaPipe's perspective).

    Returns:
        Tuple of (count, list_of_bools) where bools indicate each finger's state.
        Order: [thumb, index, middle, ring, pinky]
    """
    landmarks = hand_landmarks.landmark
    fingers_up = []

    # ── Thumb detection ──
    # Use angle-based detection for robustness across orientations
    thumb_tip = landmarks[THUMB_TIP]
    thumb_ip = landmarks[THUMB_IP]
    thumb_mcp = landmarks[THUMB_MCP]

    # Vector from MCP to IP
    v1 = np.array([thumb_ip.x - thumb_mcp.x, thumb_ip.y - thumb_mcp.y])
    # Vector from IP to TIP
    v2 = np.array([thumb_tip.x - thumb_ip.x, thumb_tip.y - thumb_ip.y])

    # Cross product to determine direction of bend
    cross = v1[0] * v2[1] - v1[1] * v2[0]

    # For the right hand (camera perspective), thumb extends to the left
    # For the left hand (camera perspective), thumb extends to the right
    # MediaPipe's handedness is from the camera's perspective (mirrored)
    if handedness_label == "Right":
        thumb_is_up = thumb_tip.x < thumb_ip.x
    else:
        thumb_is_up = thumb_tip.x > thumb_ip.x

    # Additional check: thumb must be sufficiently extended (not curled)
    thumb_dist = math.hypot(thumb_tip.x - thumb_mcp.x, thumb_tip.y - thumb_mcp.y)
    ip_dist = math.hypot(thumb_ip.x - thumb_mcp.x, thumb_ip.y - thumb_mcp.y)
    thumb_is_up = thumb_is_up and (thumb_dist > ip_dist * 0.9)

    fingers_up.append(thumb_is_up)

    # ── Other four fingers ──
    for tip_id, pip_id in zip(FINGER_TIPS, FINGER_PIPS):
        tip = landmarks[tip_id]
        pip_joint = landmarks[pip_id]
        # Finger is raised if tip is above PIP joint (lower y value = higher on screen)
        fingers_up.append(tip.y < pip_joint.y)

    return sum(fingers_up), fingers_up


# ─── Drawing Utilities ────────────────────────────────────────────────────────

def draw_rounded_rect(img, pt1, pt2, color, radius=15, thickness=-1, alpha=0.7):
    """Draw a rounded rectangle with optional transparency."""
    overlay = img.copy()
    x1, y1 = pt1
    x2, y2 = pt2

    # Clamp radius
    radius = min(radius, (x2 - x1) // 2, (y2 - y1) // 2)

    # Draw the rounded rectangle on overlay
    # Top side
    cv2.rectangle(overlay, (x1 + radius, y1), (x2 - radius, y1 + radius), color, thickness)
    # Bottom side
    cv2.rectangle(overlay, (x1 + radius, y2 - radius), (x2 - radius, y2), color, thickness)
    # Left side
    cv2.rectangle(overlay, (x1, y1 + radius), (x1 + radius, y2 - radius), color, thickness)
    # Right side
    cv2.rectangle(overlay, (x2 - radius, y1 + radius), (x2, y2 - radius), color, thickness)
    # Center
    cv2.rectangle(overlay, (x1 + radius, y1 + radius), (x2 - radius, y2 - radius), color, thickness)

    # Corners
    cv2.ellipse(overlay, (x1 + radius, y1 + radius), (radius, radius), 180, 0, 90, color, thickness)
    cv2.ellipse(overlay, (x2 - radius, y1 + radius), (radius, radius), 270, 0, 90, color, thickness)
    cv2.ellipse(overlay, (x1 + radius, y2 - radius), (radius, radius), 90, 0, 90, color, thickness)
    cv2.ellipse(overlay, (x2 - radius, y2 - radius), (radius, radius), 0, 0, 90, color, thickness)

    cv2.addWeighted(overlay, alpha, img, 1 - alpha, 0, img)


def draw_glow_circle(img, center, radius, color, intensity=0.4):
    """Draw a soft glowing circle effect."""
    overlay = img.copy()
    for r in range(radius, radius // 3, -2):
        alpha = intensity * (1 - (radius - r) / radius)
        cv2.circle(overlay, center, r, color, 2)
    cv2.addWeighted(overlay, intensity, img, 1 - intensity, 0, img)


def draw_finger_status_bar(img, fingers_up, x_start, y_start, hand_label, color):
    """
    Draw a visual indicator showing which fingers are up/down for one hand.
    """
    finger_names = ["👍", "☝️", "🖕", "💍", "🤙"]  # Emoji labels for fun
    finger_labels = ["T", "I", "M", "R", "P"]
    bar_width = 36
    bar_height = 36
    spacing = 6
    total_width = 5 * bar_width + 4 * spacing

    # Panel background
    draw_rounded_rect(
        img,
        (x_start - 10, y_start - 30),
        (x_start + total_width + 10, y_start + bar_height + 15),
        Colors.PANEL_BG,
        radius=12,
        alpha=0.75,
    )

    # Hand label
    cv2.putText(
        img, f"{hand_label} Hand", (x_start, y_start - 10),
        cv2.FONT_HERSHEY_SIMPLEX, 0.45, Colors.MUTED_TEXT, 1, cv2.LINE_AA
    )

    for i, (label, is_up) in enumerate(zip(finger_labels, fingers_up)):
        x = x_start + i * (bar_width + spacing)
        fill_color = color if is_up else (60, 60, 65)
        border_color = color if is_up else (90, 90, 95)

        # Filled rounded indicator
        cv2.rectangle(img, (x, y_start), (x + bar_width, y_start + bar_height), fill_color, -1)
        cv2.rectangle(img, (x, y_start), (x + bar_width, y_start + bar_height), border_color, 1)

        # Letter label
        text_color = Colors.DARK_BG if is_up else (120, 120, 125)
        text_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.55, 2)[0]
        text_x = x + (bar_width - text_size[0]) // 2
        text_y = y_start + (bar_height + text_size[1]) // 2
        cv2.putText(
            img, label, (text_x, text_y),
            cv2.FONT_HERSHEY_SIMPLEX, 0.55, text_color, 2 if is_up else 1, cv2.LINE_AA
        )


def draw_count_display(img, count, frame_width, frame_height, pulse_phase):
    """Draw the large centered finger count with glow effects."""

    # Choose color based on count
    color = Colors.GRADIENT[min(count, 10)]

    # Pulsing size for emphasis
    pulse = 1.0 + 0.06 * math.sin(pulse_phase)
    font_scale = 4.0 * pulse

    # Main count text
    count_text = str(count)
    text_size = cv2.getTextSize(count_text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, 8)[0]

    # Position: top-center of frame
    text_x = (frame_width - text_size[0]) // 2
    text_y = 90

    # Background panel
    panel_w = max(text_size[0] + 60, 160)
    panel_h = text_size[1] + 70
    panel_x = (frame_width - panel_w) // 2
    panel_y = 15
    draw_rounded_rect(
        img,
        (panel_x, panel_y),
        (panel_x + panel_w, panel_y + panel_h),
        Colors.DARK_BG,
        radius=20,
        alpha=0.8,
    )

    # Glow effect behind text
    glow_center = (frame_width // 2, text_y - text_size[1] // 3)
    glow_radius = int(50 * pulse)
    draw_glow_circle(img, glow_center, glow_radius, color, intensity=0.2)

    # Shadow
    cv2.putText(
        img, count_text, (text_x + 3, text_y + 3),
        cv2.FONT_HERSHEY_SIMPLEX, font_scale, (0, 0, 0), 10, cv2.LINE_AA
    )
    # Main text
    cv2.putText(
        img, count_text, (text_x, text_y),
        cv2.FONT_HERSHEY_SIMPLEX, font_scale, color, 8, cv2.LINE_AA
    )

    # "FINGERS" label below count
    label = "FINGERS"
    label_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)[0]
    label_x = (frame_width - label_size[0]) // 2
    cv2.putText(
        img, label, (label_x, text_y + 30),
        cv2.FONT_HERSHEY_SIMPLEX, 0.5, Colors.MUTED_TEXT, 1, cv2.LINE_AA
    )


def draw_hand_landmarks_styled(img, hand_landmarks, color):
    """Draw hand landmarks with custom styling."""
    h, w, _ = img.shape
    landmarks = hand_landmarks.landmark

    # Draw connections
    connections = mp_hands.HAND_CONNECTIONS
    for connection in connections:
        start = landmarks[connection[0]]
        end = landmarks[connection[1]]
        start_pt = (int(start.x * w), int(start.y * h))
        end_pt = (int(end.x * w), int(end.y * h))

        # Draw semi-transparent line
        cv2.line(img, start_pt, end_pt, color, 2, cv2.LINE_AA)

    # Draw landmark points
    for i, lm in enumerate(landmarks):
        cx, cy = int(lm.x * w), int(lm.y * h)

        # Fingertips get larger dots
        if i in [4, 8, 12, 16, 20]:
            cv2.circle(img, (cx, cy), 8, color, -1, cv2.LINE_AA)
            cv2.circle(img, (cx, cy), 10, Colors.SOFT_WHITE, 1, cv2.LINE_AA)
        elif i == 0:  # Wrist
            cv2.circle(img, (cx, cy), 7, color, -1, cv2.LINE_AA)
        else:
            cv2.circle(img, (cx, cy), 4, color, -1, cv2.LINE_AA)


def draw_fps(img, fps, frame_width):
    """Draw FPS counter in corner."""
    fps_text = f"FPS: {int(fps)}"
    cv2.putText(
        img, fps_text, (frame_width - 120, 30),
        cv2.FONT_HERSHEY_SIMPLEX, 0.55, Colors.MUTED_TEXT, 1, cv2.LINE_AA
    )


def draw_instructions(img, frame_height, mirror_mode):
    """Draw subtle instruction text at the bottom."""
    instructions = "Q: Quit  |  F: Fullscreen  |  M: Mirror"
    mirror_status = f"Mirror: {'ON' if mirror_mode else 'OFF'}"

    cv2.putText(
        img, instructions, (15, frame_height - 15),
        cv2.FONT_HERSHEY_SIMPLEX, 0.4, Colors.MUTED_TEXT, 1, cv2.LINE_AA
    )
    cv2.putText(
        img, mirror_status, (15, frame_height - 40),
        cv2.FONT_HERSHEY_SIMPLEX, 0.4, Colors.CYAN, 1, cv2.LINE_AA
    )


def draw_no_hands_message(img, frame_width, frame_height, pulse_phase):
    """Draw a message when no hands are detected."""
    alpha = 0.5 + 0.3 * math.sin(pulse_phase * 0.5)
    color = tuple(int(c * alpha) for c in Colors.MUTED_TEXT)

    text = "Show your hands to start counting!"
    text_size = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)[0]
    text_x = (frame_width - text_size[0]) // 2
    text_y = frame_height // 2

    cv2.putText(
        img, text, (text_x, text_y),
        cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2, cv2.LINE_AA
    )


# ─── Main Application ────────────────────────────────────────────────────────

def main():
    """Run the hand gesture finger counter application."""

    print("=" * 55)
    print("  ✋  Hand Gesture Finger Counter (1–10)")
    print("=" * 55)
    print("  Controls:")
    print("    Q - Quit")
    print("    F - Toggle fullscreen")
    print("    M - Toggle mirror mode")
    print("-" * 55)
    print("  Starting camera...")

    # Initialize webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("  ❌ Error: Could not open webcam.")
        print("     Make sure your camera is connected and not in use.")
        return

    # Set camera resolution
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"  ✅ Camera opened: {frame_width}x{frame_height}")
    print("=" * 55)

    # State
    mirror_mode = True
    fullscreen = False
    window_name = "Hand Gesture Finger Counter"

    cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)
    cv2.resizeWindow(window_name, min(frame_width, 1280), min(frame_height, 720))

    # FPS tracking
    prev_time = time.time()
    fps = 0
    fps_smoothing = 0.9

    # Animation phase
    pulse_phase = 0.0

    # Smoothed count for display stability
    count_history = []
    smoothed_count = 0

    # Hand colors (for distinguishing two hands)
    hand_colors = [Colors.CYAN, Colors.CORAL]

    # Initialize MediaPipe Hands
    with mp_hands.Hands(
        model_complexity=1,
        min_detection_confidence=0.7,
        min_tracking_confidence=0.6,
        max_num_hands=2,
    ) as hands:

        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                print("  ⚠️  Failed to read frame, skipping...")
                continue

            # Mirror mode
            if mirror_mode:
                frame = cv2.flip(frame, 1)

            # Convert to RGB for MediaPipe
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            rgb_frame.flags.writeable = False
            results = hands.process(rgb_frame)
            rgb_frame.flags.writeable = True

            # Slight darkening for contrast
            frame = cv2.convertScaleAbs(frame, alpha=0.85, beta=10)

            # Process hands
            total_fingers = 0
            hand_data = []  # Store (hand_label, fingers_up, color) for each hand

            if results.multi_hand_landmarks and results.multi_handedness:
                for idx, (hand_landmarks, handedness) in enumerate(
                    zip(results.multi_hand_landmarks, results.multi_handedness)
                ):
                    # Get handedness label
                    label = handedness.classification[0].label  # "Left" or "Right"

                    # If mirrored, the label is already from camera perspective
                    # so we flip it to match the user's actual hand
                    if mirror_mode:
                        display_label = "Right" if label == "Left" else "Left"
                    else:
                        display_label = label

                    # Count fingers
                    finger_count, fingers_up = count_fingers(hand_landmarks, label)
                    total_fingers += finger_count

                    color = hand_colors[idx % len(hand_colors)]
                    hand_data.append((display_label, fingers_up, color))

                    # Draw styled landmarks
                    draw_hand_landmarks_styled(frame, hand_landmarks, color)

            # Smooth the count to avoid flickering
            count_history.append(total_fingers)
            if len(count_history) > 5:
                count_history.pop(0)
            # Use mode (most common value) for stability
            smoothed_count = max(set(count_history), key=count_history.count)

            # ── Draw UI overlays ──

            # FPS
            current_time = time.time()
            dt = current_time - prev_time
            prev_time = current_time
            if dt > 0:
                fps = fps_smoothing * fps + (1 - fps_smoothing) * (1.0 / dt)

            # Update animation phase
            pulse_phase += dt * 4.0

            # Draw count display
            draw_count_display(frame, smoothed_count, frame_width, frame_height, pulse_phase)

            # Draw finger status bars for each hand
            if hand_data:
                for i, (hand_label, fingers_up, color) in enumerate(hand_data):
                    y_offset = frame_height - 120 - i * 90
                    draw_finger_status_bar(frame, fingers_up, 20, y_offset, hand_label, color)
            else:
                draw_no_hands_message(frame, frame_width, frame_height, pulse_phase)

            # Draw FPS and instructions
            draw_fps(frame, fps, frame_width)
            draw_instructions(frame, frame_height, mirror_mode)

            # Show frame
            cv2.imshow(window_name, frame)

            # Handle key presses
            key = cv2.waitKey(1) & 0xFF
            if key == ord("q") or key == ord("Q"):
                break
            elif key == ord("f") or key == ord("F"):
                fullscreen = not fullscreen
                if fullscreen:
                    cv2.setWindowProperty(
                        window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN
                    )
                else:
                    cv2.setWindowProperty(
                        window_name, cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_NORMAL
                    )
            elif key == ord("m") or key == ord("M"):
                mirror_mode = not mirror_mode

    cap.release()
    cv2.destroyAllWindows()
    print("\n  👋 Goodbye!")


if __name__ == "__main__":
    main()
