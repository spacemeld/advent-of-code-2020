import { readFileSync } from "fs";
import path from "path";
import Day from "../Day";
import chalk from "chalk";
import ora, { Ora } from "ora";
import dedent from "ts-dedent";
class Day1 extends Day {
  constructor() {
    super("Day 1");
  }

  importExpenseReport(): string {
    const expenseReportPath = path.join(__dirname, "expense_report.txt");
    return readFileSync(expenseReportPath, "utf-8");
  }

  async part1() {
    console.log(dedent`
      ~PART I~

      The Elves in accounting found an ${chalk.italic("error")} in your expense report.
      In order to fix this error, we need to find two entries that sum to ${chalk.underline("2020")}.

    `);

    let importProgress: Ora;
    let scanProgress: Ora;

    await new Promise((resolve) => {
      resolve((importProgress = ora("Importing Expense Report...").start()));
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(importProgress.succeed());
      }, 2000);
    });

    await new Promise((resolve) => {
      resolve((scanProgress = ora("Scanning Expense Report...").start()));
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(scanProgress.warn("Found an error in the Expense Report as expected."));
      }, 2000);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        let firstSectionOf2020 = 0;
        let secondSectionOf2020 = 0;

        let expenseReportEntries = this.importExpenseReport().split(/\r?\n/);
        expenseReportEntries.pop();

        expenseReportEntries.forEach((entryForFirstSection, indexForFirstSection) => {
          const potentialFirstSection = parseInt(entryForFirstSection);
          const candidatesForSecondSection = expenseReportEntries.slice(indexForFirstSection);

          candidatesForSecondSection.forEach((entryForSecondSection) => {
            const potentialSecondSection = parseInt(entryForSecondSection);

            if (potentialFirstSection + potentialSecondSection == 2020) {
              firstSectionOf2020 = potentialFirstSection;
              secondSectionOf2020 = potentialSecondSection;
              return;
            }
          });
        });

        resolve(this.displayFinding(firstSectionOf2020, secondSectionOf2020));
      }, 500);
    });
  }

  async part2() {
    console.log(dedent`


      ~PART II~

      Grateful for your work, the Elves in accounting wants to see if the same
      can be done for three entries that sum to ${chalk.underline("2020")}

    `);

    let importProgress: Ora;
    let scanProgress: Ora;

    await new Promise((resolve) => {
      resolve((importProgress = ora("Importing Expense Report again...").start()));
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(importProgress.succeed());
      }, 2000);
    });

    await new Promise((resolve) => {
      resolve((scanProgress = ora("Scanning Expense Report once more...").start()));
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(scanProgress.warn("Found potential issues in the Expense Report as expected."));
      }, 2000);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        let firstSectionOf2020 = 0;
        let secondSectionOf2020 = 0;
        let thirdSectionOf2020 = 0;

        let expenseReportEntries = this.importExpenseReport().split(/\r?\n/);
        expenseReportEntries.pop();

        expenseReportEntries.forEach((entryForFirstSection, indexForFirstSection) => {
          const potentialFirstSection = parseInt(entryForFirstSection);
          const candidatesForSecondSection = expenseReportEntries.slice(indexForFirstSection);

          candidatesForSecondSection.forEach((entryForSecondSection, indexForSecondSection) => {
            const potentialSecondSection = parseInt(entryForSecondSection);
            const candidatesForThirdSection = candidatesForSecondSection.slice(indexForSecondSection);

            candidatesForThirdSection.forEach((entryForThirdSection) => {
              const potentialThirdSection = parseInt(entryForThirdSection);

              if (potentialFirstSection + potentialSecondSection + potentialThirdSection == 2020) {
                firstSectionOf2020 = potentialFirstSection;
                secondSectionOf2020 = potentialSecondSection;
                thirdSectionOf2020 = potentialThirdSection;

                return;
              }
            });
          });
        });

        resolve(this.displayFinding(firstSectionOf2020, secondSectionOf2020, thirdSectionOf2020));
      }, 500);
    });
  }

  async displayFinding(firstSectionOf2020: number, secondSectionOf2020: number, thirdSectionOf2020?: number) {
    await new Promise((resolve) => {
      setTimeout(() => {
        if (typeof thirdSectionOf2020 !== "undefined") {
          return resolve(
            console.log(dedent`

              The three problematic entries are ${firstSectionOf2020}, ${secondSectionOf2020}, and ${thirdSectionOf2020}.
            `),
          );
        }

        return resolve(
          console.log(dedent`

            The two problematic entries are ${firstSectionOf2020} and ${secondSectionOf2020}.
          `),
        );
      }, 2000);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        return resolve(
          console.log(dedent`

            To fix this error, we multiply the problematic entries together.
          `),
        );
      }, 1000);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        if (typeof thirdSectionOf2020 !== "undefined") {
          return resolve(
            console.log(dedent`

              ${chalk.underline(firstSectionOf2020)} x ${chalk.underline(secondSectionOf2020)} x ${chalk.underline(
              thirdSectionOf2020,
            )} = ${chalk.underline(firstSectionOf2020 * secondSectionOf2020 * thirdSectionOf2020)}
            `),
          );
        }

        return resolve(
          console.log(dedent`

            ${chalk.underline(firstSectionOf2020)} x ${chalk.underline(secondSectionOf2020)} = ${chalk.underline(
            firstSectionOf2020 * secondSectionOf2020,
          )}
          `),
        );
      }, 1000);
    });
  }

  async execute() {
    await this.part1();

    await this.part2();

    super.complete();
  }
}

export { Day1 as default };
