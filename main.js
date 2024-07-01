import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";
// Prompt user to enter the amount of seconds
const res = await inquirer.prompt([{
        name: "userinput",
        type: "number",
        message: "Enter the amount of seconds",
        validate: (input) => {
            if (isNaN(input)) {
                return "please enter a valid number";
            }
            else if (input > 60) {
                return "Seconds must be in seconds";
            }
            else {
                return true;
            }
        }
    }]);
// Get the input from user and convert it to seconds
let input = res.userinput;
// Function to start the countdown timer
function starttimer(value) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.red("Timer stop"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
starttimer(input);
