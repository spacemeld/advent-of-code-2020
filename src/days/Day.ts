import dedent from "ts-dedent";
import figlet from "figlet";
import { insertSeparator } from "../cli/cli-helpers";
import { exit } from "process";

abstract class Day {
  constructor(public dayName: string) {
    this.printDay();
  }

  printDay(): void {
    console.log(dedent`
      ${figlet.textSync(this.dayName, {
        font: "Speed",
        horizontalLayout: "fitted",
        verticalLayout: "fitted",
      })}

      ${insertSeparator()}

    `);
  }

  complete(): void {
    console.log(dedent`

      ${insertSeparator()}

      ${this.dayName} completed!

    `);

    exit(0);
  }
}

export { Day as default };
