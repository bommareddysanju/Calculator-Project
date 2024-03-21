const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

//Define function to calculate based on button clicked.
const calculate = (btnValue) => {
    display.focus();
    if (btnValue === "=" && output !== "") {
        // Handling division by zero
        try {
            output = eval(output.replace("%", "/100"));
            if (!isFinite(output)) {
                output = "Error";
            }
        } catch (error) {
            output = "Error";
        }
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        //If DEL button is clicked, remove the last character from the output.
        output = output.toString().slice(0, -1);
    } else if (btnValue === "x²") {
        // Implement functionality to square the current value.
        if (output !== "") {
            output = Math.pow(parseFloat(output), 2).toString();
        }
    } else if (btnValue === ".") {
        // Ensure only one decimal point can be added to a number.
        if (!output.includes(".")) {
            output += ".";
        }
    } else {
        //If output is empty and button is specialChars then return
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value = output;
};

//Add event listener to buttons, call calculate() on click.
buttons.forEach((button) => {
    //Button click listener calls calculate() with dataset value as argument.
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});