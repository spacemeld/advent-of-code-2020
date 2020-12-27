import { readFileSync } from "fs";
import path from "path";
import Day from "../Day";
import chalk from "chalk";
import ora, { Ora } from "ora";
import dedent from "ts-dedent";
import { exit } from "process";

class Day1 extends Day {
  constructor() {
    super("Day 1");
  }

  importExpenseReport(): string {
    const expenseReportPath = path.join(__dirname, "expense_report.txt");
    return readFileSync(expenseReportPath, "utf-8");
  }

  async displayFinding(reportEntry: number, reportCandidateEntry: number) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          console.log(dedent`

            The two problematic entries are ${reportEntry} and ${reportCandidateEntry}.
          `),
        );
      }, 2000);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          console.log(dedent`

            To fix this error, we multiply the problematic entries together.
          `),
        );
      }, 1000);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          console.log(dedent`

            ${chalk.underline(reportEntry)} x ${chalk.underline(reportCandidateEntry)} = ${chalk.underline(
            reportEntry * reportCandidateEntry,
          )}

          `),
        );
      }, 1000);
    });
  }

  async execute() {
    console.log(dedent`
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
        let expenseReportEntries = this.importExpenseReport().split(/\r?\n/);
        expenseReportEntries.pop();

        expenseReportEntries.forEach((entry, index) => {
          const reportEntry = parseInt(entry);
          const reportEntryCandidates = expenseReportEntries.slice(index);

          reportEntryCandidates.forEach((candidateEntry) => {
            const reportCandidateEntry = parseInt(candidateEntry);

            if (reportEntry + reportCandidateEntry == 2020) {
              resolve(this.displayFinding(reportEntry, reportCandidateEntry));
            }
          });
        });
      }, 500);
    });

    super.complete();
  }
}

export { Day1 as default };
