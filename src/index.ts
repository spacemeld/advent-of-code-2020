import inquirer from "inquirer";

export interface Answer {
    chosenDay: number;
}

export interface Option {
    name: string;
    value: number;
}

export function clearScreen(): void {
    process.stdout.write('\x1b[2J');
}

export async function whichDayMenu(): Promise<Answer> {
    const listOfDays: Option[] = [
        {name: "Day 1", value: 1}
    ];

    return inquirer.prompt([{
        name: "chosenDay",
        type: "list",
        message: "Which day do you want to view?",
        choices: listOfDays
    }]);
}

export async function cli() {
    const answer: Answer = await whichDayMenu();

    switch(answer.chosenDay) {
        case 1:
            console.log("Selected DAY 1...");
            break;

        default:
            console.log(answer.chosenDay);
    }
}

cli();
