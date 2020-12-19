import meow from "meow";
import inquirer from "inquirer";
import CollectDays from "./CollectDays";
import { Answer, DayOption, DayIndex, DaysReturnTypes } from "./definitions";

export function clearScreen(): void {
  process.stdout.write("\x1b[2J");
}

export function getAvailableDays(returnType: DaysReturnTypes): DayOption[] | DayIndex[] {
  const daysToCollect = new CollectDays("dist/days/");
  const collectionOfDays = daysToCollect.listClassesAsDays(returnType);

  return collectionOfDays;
}

export async function whichDayMenu(): Promise<Answer> {
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

export function view(dayPath: string) {
  const dayClass = ["./days/", dayPath].join("");

  import(dayClass).then((chosenDayClass) => {
    new chosenDayClass.default().execute();
  });
}

export async function menu() {
  const answer: Answer = await whichDayMenu();
  const dayPath: string = answer.chosenDay;

  view(dayPath);
}

export function cli() {
  const cli = meow(
    `
      Usage
        $ escape-plan

      Options
        --viewDay, --vd  Bypass menu and view a specific day

      Examples
        $ escape-plan
          [Shows menu to choose a day to view]

        $ escape-plan --viewDay=1
          [Results from day 1]
  `,
    {
      flags: {
        viewDay: {
          type: "number",
          alias: "vd",
        },
      },
    },
  );

  if (typeof cli.flags.viewDay !== "undefined") {
    const listOfDays = getAvailableDays(DaysReturnTypes.INDEX) as DayIndex[];
    const dayEntry = listOfDays.find(({ index }) => index === cli.flags.viewDay);

    if (dayEntry === undefined) {
      throw new TypeError("Could not find the day to be viewed.");
    }

    view(dayEntry.path);
  } else {
    menu();
  }
}

cli();
