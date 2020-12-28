import { readFileSync } from "fs";
import path from "path";
import Day from "../Day";
import chalk from "chalk";
import ora, { Ora } from "ora";
import dedent from "ts-dedent";

class Day2 extends Day {
  constructor() {
    super("Day 2");
  }

  importPasswordList(): string {
    const passwordListPath = path.join(__dirname, "passwords_with_policy.txt");
    return readFileSync(passwordListPath, "utf-8");
  }

  async displayResult(validPasswords: number) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          console.log(dedent`

            There are ${chalk.underline(validPasswords)} valid passwords according to the policy at the time.
          `),
        );
      }, 2000);
    });
  }

  async execute() {
    console.log(dedent`
      The shopkeeper at the ${chalk.bold("North Pole Toboggan Rental Shop")} could not log into their systems.
      In order to fix this issue, we need to collect the ${chalk.underline(
        "number of valid passwords",
      )} in the provided list.

    `);

    let importProgress: Ora;
    let scanProgress: Ora;

    await new Promise((resolve) => {
      resolve((importProgress = ora("Importing Password List...").start()));
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(importProgress.succeed());
      }, 3000);
    });

    await new Promise((resolve) => {
      resolve((scanProgress = ora("Scanning Passwords...").start()));
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(scanProgress.succeed());
      }, 1500);
    });

    await new Promise((resolve) => {
      setTimeout(() => {
        const passwordsWithPolicy = this.importPasswordList().split(/\r?\n/);

        const passwordsAndPolicies = passwordsWithPolicy.map((passwordWithPolicy) => {
          const passwordAndPolicy = passwordWithPolicy.split(": ");

          return { policy: passwordAndPolicy[0], password: passwordAndPolicy[1] };
        });

        const passwordsAndPolicyDetails = passwordsAndPolicies.map((passwordAndPolicy) => {
          const policyDetails = passwordAndPolicy.policy.split(" ");
          const countRange = policyDetails[0];
          const targetLetter = policyDetails[1];
          const rangeMinMax = countRange.split("-");
          const minNumberOfTargetLetters = rangeMinMax[0];
          const maxNumberOfTargetLetters = rangeMinMax[1];

          return {
            requiredNumberOfLetters: { min: minNumberOfTargetLetters, max: maxNumberOfTargetLetters },
            letter: targetLetter,
            password: passwordAndPolicy.password,
          };
        });

        let validPasswords = 0;

        passwordsAndPolicyDetails.forEach((passwordAndPolicyDetails) => {
          const searchForLetter = new RegExp(passwordAndPolicyDetails.letter, "g");
          const numberOfLettersFound = [...passwordAndPolicyDetails.password.matchAll(searchForLetter)].length;

          if (
            numberOfLettersFound >= parseInt(passwordAndPolicyDetails.requiredNumberOfLetters.min) &&
            numberOfLettersFound <= parseInt(passwordAndPolicyDetails.requiredNumberOfLetters.max)
          ) {
            validPasswords += 1;
          }
        });

        return resolve(this.displayResult(validPasswords));
      }, 500);
    });

    super.complete();
  }
}

export { Day2 as default };
