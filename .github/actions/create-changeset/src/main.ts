import fs from "fs";
import path from "path";
import util from "util";

import * as core from "@actions/core";
import { createChangesetPath, validateEnv } from "./utils";
import {
  createChangesetByType,
  parseBody,
  parseBodyForChangeType,
} from "./changeset";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function run(): Promise<void> {
  try {
    const eventPath = validateEnv("GITHUB_EVENT_PATH");
    const workspace = validateEnv("GITHUB_WORKSPACE");

    const event = JSON.parse(await readFile(eventPath, { encoding: "utf8" }));
    const { body, id, number } = event.pull_request;

    core.setOutput("event", event);
    core.info(event.pull_request);

    if (event.pull_request.issue) {
      const { number, title, body } = event.pull_request.issue;
      core.debug(`Issue Number: ${number}`);
      core.debug(`Issue Title: ${title}`);
      core.debug(`Issue Body: ${body}`);
    } else {
      core.debug("This pull request is not associated with an issue.");
    }

    const directory = await createChangesetPath(workspace);

    const fileName = `pr-${number}-${id}.md`;
    const changeSetPath = path.join(directory, fileName);
    const fileExists = fs.existsSync(changeSetPath);

    let releaseNote = "";
    const type = parseBodyForChangeType(body);
    if (type && type !== "none") {
      releaseNote = parseBody(body);
    }

    const changeSet = createChangesetByType(releaseNote, type);

    await writeFile(changeSetPath, changeSet);

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
