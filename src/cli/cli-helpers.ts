import chalk from "chalk";
import figures from "figures";
import CollectDays from "./CollectDays";
import { DayOption, DayIndex, DaysReturnTypes } from "../definitions";

export function getAvailableDays(returnType: DaysReturnTypes): DayOption[] | DayIndex[] {
  const daysToCollect = new CollectDays("dist/days/");
  const collectionOfDays = daysToCollect.listClassesAsDays(returnType);

  return collectionOfDays;
}

export function view(dayPath: string) {
  const dayClass = ["./../days/", dayPath].join("");

  import(dayClass).then((chosenDayClass) => {
    new chosenDayClass.default().execute();
  });
}

export function insertSeparator() {
  return chalk.dim(new Array(70).join(figures.line));
}
