import fs from "fs";
import path from "path";
import util from "util";

import * as core from "@actions/core";
import {
  createChangesetPath,
  createValidFileNameFromTitle,
  formatChangeSet,
  parseBody,
  parseBodyForChangeType,
  validateEnv,
} from "./utils";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function run(): Promise<void> {
  try {
    const eventPath = validateEnv("GITHUB_EVENT_PATH");
    const workspace = validateEnv("GITHUB_WORKSPACE");

    const event = JSON.parse(await readFile(eventPath, { encoding: "utf8" }));
    const { body, title, id, number } = event.pull_request;

    const directory = await createChangesetPath(workspace);
    const fileName = `pr-${number}-${id}.md`;

    const changeSetPath = path.join(directory, fileName);
    const fileExists = fs.existsSync(changeSetPath);

    const releaseNotes = parseBody(body).trim().concat("\n");
    const type = parseBodyForChangeType(body);
    const projectName = core.getInput("projectName");

    const changesetHeader =
      type === "none"
        ? `
    ---
    ---
    `
        : `
      ---
      "${projectName}": ${type}
      --- 
    `;

    await writeFile(
      changeSetPath,
      formatChangeSet(changesetHeader + releaseNotes)
    );

    core.setOutput("changeType", type);
    core.setOutput(
      "changeSetPath",
      fileExists ? `chore: update ${fileName}` : `chore: create ${fileName}`
    );
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
