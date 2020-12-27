import Menu from "./Menu";
import meow from "meow";
import { getAvailableDays, view } from "./cli-helpers";
import { DaysReturnTypes, DayIndex } from "./../definitions";

class CLI {
  constructor() {}

  clearScreen(): void {
    process.stdout.write("\x1b[2J");
  }

  init(): void {
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
      new Menu().show();
    }
  }
}

export { CLI as default };
