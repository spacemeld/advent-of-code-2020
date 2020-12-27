import figlet from "figlet";
import inquirer from "inquirer";
import { getAvailableDays, view } from "./cli-helpers";
import { Answer, DayOption, DaysReturnTypes } from "./../definitions";
import dedent from "ts-dedent";

class Menu {
  constructor() {}

  async whichDayPrompt() {
    const listOfDays: DayOption[] = getAvailableDays(DaysReturnTypes.OPTIONS) as DayOption[];

    return inquirer.prompt([
      {
        name: "chosenDay",
        type: "list",
        message: "Which day do you want to view?",
        choices: listOfDays,
      },
    ]);
  }

  async show() {
    console.log(dedent`
      Welcome to my...

      ${figlet.textSync("escape-plan", {
        font: "Colossal",
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
      })}


    `);

    const answer: Answer = await this.whichDayPrompt();
    const dayPath: string = answer.chosenDay;

    view(dayPath);
  }
}

export { Menu as default };
