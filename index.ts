#! /usr/bin/env node 

import { differenceInSeconds, interval } from "date-fns";
import inquirer from "inquirer";

const res = await inquirer.prompt({
  name: "userInput",
  type: "input",
  message: "Enter the seconds",
  validate: (input) => {
    if (isNaN(input)) {
      return "Please enter a number";
    } else if (input > 60) {
      return `Seconds must be in 60`;
    } else {
      return true;
    }
  },
});
let input = parseInt(res.userInput);

function startTime(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(intTime);
  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currentTime);
    if (timeDiff <= 0) {
      console.log("timer has expired");
      process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(
      `${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`
    );
  }, 1000);
}
startTime(input);
