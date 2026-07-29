# ✋ Hand Gesture Finger Counter (1–10)

A real-time hand gesture detection app that counts raised fingers from **1 to 10** using your webcam.

## How It Works

- Uses **MediaPipe Hands** to detect up to 2 hands and track 21 landmarks per hand.
- Determines which fingers are raised on each hand using landmark geometry.
- Sums finger counts across both hands to display a number from **0 to 10**.

## Setup

```bash
# Navigate to this folder
cd hand_gesture_detection

# (Optional) Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Usage

```bash
python main.py
```

- Show **one hand** to count 1–5.
- Show **both hands** to count 6–10.
- Press **Q** to quit.

## Controls

| Key | Action            |
|-----|-------------------|
| `q` | Quit the app      |
| `f` | Toggle fullscreen |
| `m` | Toggle mirror     |

## Requirements

- Python 3.8+
- Webcam
- macOS / Windows / Linux
