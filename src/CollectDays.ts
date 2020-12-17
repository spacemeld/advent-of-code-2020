import { readdirSync, statSync } from "fs";
import path from "path";
import { DayOption } from "./definitions";

export class CollectDays {
  rootPath: string;

  constructor(rootPath: string) {
    this.rootPath = rootPath;
  }

  collectSubFolders(baseFolder: string, listOfFolders?: Array<string>): Array<string> {
    let folderList = listOfFolders ?? [];
    let folders: string[] = readdirSync(baseFolder).filter((file) =>
      statSync(path.join(baseFolder, file)).isDirectory(),
    );

    folders.forEach((folder) => {
      folderList.push(path.join(baseFolder, folder));
      this.collectSubFolders(path.join(baseFolder, folder), folderList);
    });

    return folderList;
  }

  collectFilesInFolder(rootPath: string): Array<string> {
    return readdirSync(rootPath)
      .filter((filePath) => !statSync(path.join(rootPath, filePath)).isDirectory())
      .map((filePath) => path.normalize(path.join(rootPath, filePath)));
  }

  generateFileList(): Array<string> {
    const filesInRootPath = this.collectFilesInFolder(this.rootPath);
    const subFoldersInRootPath = this.collectSubFolders(this.rootPath);

    let files: Array<string> = filesInRootPath;

    return subFoldersInRootPath.reduce(
      (filesInPath, foldersInPath) => [...filesInPath, ...this.collectFilesInFolder(foldersInPath)],
      files as Array<string>,
    );
  }

  generateTitleFromDayNumber(dayNumber: string | undefined): string {
    return ["Day", dayNumber].join(" ");
  }

  getFilePathWithoutExtension(filePath: string): string {
    const parsedFilePath = path.parse(filePath);
    const trimmedFilePath = path.join(parsedFilePath.dir, parsedFilePath.name);
    return trimmedFilePath.includes(".") ? this.getFilePathWithoutExtension(trimmedFilePath) : trimmedFilePath;
  }

  listClassesAsDays(): DayOption[] {
    const fileList = this.generateFileList().map((filePath) => filePath.replace(this.rootPath, ""));
    const dayFileList = fileList.filter((filePath) => filePath.includes("Day"));
    const trimmedDayFileList = dayFileList.map((filePath) => this.getFilePathWithoutExtension(filePath));
    const deduplicatedDayFiles = [...new Set(trimmedDayFileList)];

    return deduplicatedDayFiles.flatMap((file) => ({
      name: this.generateTitleFromDayNumber(file?.match(/\d+/g)?.pop()),
      value: file,
    }));
  }
}

export { CollectDays as default };
