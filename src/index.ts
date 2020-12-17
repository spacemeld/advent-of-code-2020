import inquirer from "inquirer";
import CollectDays from "./CollectDays";
import { Answer, DayOption } from "./definitions";

export function clearScreen(): void {
  process.stdout.write("\x1b[2J");
}

export async function whichDayMenu(): Promise<Answer> {
  const daysToCollect = new CollectDays("dist/days/");
  const collectionOfDays = daysToCollect.listClassesAsDays();
  const listOfDays: DayOption[] = collectionOfDays;

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
  const dayPath: string = answer.chosenDay;
  const dayClass = ["./days/", dayPath].join("");
  import(dayClass).then((chosenDayClass) => {
    new chosenDayClass.default().execute();
  });
}

cli();
