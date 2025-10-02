
declare module "simple-resume-parser" {
  export default class ResumeParser {
    constructor(filePath: string);
    parseToJSON(): Promise<any>;
  }
}
