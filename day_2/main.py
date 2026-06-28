print("Hi, this is a calculator")

# Get first number
while True:
    try:
        num1 = int(input("Enter your first number: "))
        break
    except ValueError:
        print("Please input an integer")

# Get second number
while True:
    try:
        num2 = int(input("Enter your second number: "))
        break
    except ValueError:
        print("Please input an integer")

# Get operator
while True:
    OPER = input("Input your operator ( + | - | * | / ): ")
    if OPER in ["+", "-", "*", "/"]:
        break
    print("Input an actual operator")

# Calculate
match OPER:
    case "+":
        print(num1 + num2)
    case "-":
        print(num1 - num2)
    case "*":
        print(num1 * num2)
    case "/":
        if num2 == 0:
            print("Cannot divide by zero")
        else:
            print(num1 / num2)