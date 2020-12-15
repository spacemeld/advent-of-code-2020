import inquirer from "inquirer";
import { Days } from "./days/definitions";

export interface Answer {
  chosenDay: number;
}

export interface Option {
  name: string;
  value: number;
}

export function clearScreen(): void {
  process.stdout.write("\x1b[2J");
}

export async function whichDayMenu(): Promise<Answer> {
  const listOfDays: Option[] = Object.entries(Days).map((day) => ({ name: day[0], value: day[1] as number }));

  return inquirer.prompt([
    {
      name: "chosenDay",
      type: "list",
      message: "Which day do you want to view?",
      choices: listOfDays,
    },
  ]);
}

export async function cli() {
  const answer: Answer = await whichDayMenu();
  const dayNumber: number = answer.chosenDay;
  const dayClass = "./days/Day" + dayNumber;
  import(dayClass).then((chosenDayClass) => {
    new chosenDayClass.default().execute();
  });
}

cli();
