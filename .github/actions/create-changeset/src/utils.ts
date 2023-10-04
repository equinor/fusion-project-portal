import path from "path";
import fs from "fs";
import util from "util";

const createDir = util.promisify(fs.mkdir);

/**
 * Validates an environment variable is set and returns its value.
 * @param name Name of the environment variable to validate
 */
export const validateEnv = (name: string): string => {
  const value = process.env[name];

  if (value) {
    return value;
  }

  throw new Error(`Environment variable '${name}' is not set but is required`);
};

/**
 * Parses the body text of the pull request and returns only the changeset section.
 * @param body Body text of the pull request
 */
export const parseBodyForChangeType = (body: string): string | undefined => {
  const pattern = /(-\[\s|.\]\s\w*)/g;
  const types = ["major", "minor", "patch", "none"];
  const result = body
    .split(pattern)
    .filter((p) =>
      types.find(
        (t) =>
          p.toLowerCase().includes(t.toLowerCase()) &&
          p.toLowerCase().includes("x")
      )
    );

  if (result.length > 1 || result.length === 0) {
    throw new Error(
      "Select only one of the following, major, minor, patch or none"
    );
  }

  return types.find((type) => result[0].includes(type));
};

/**
 * Parses the body text of the pull request and returns only the changeset section.
 * @param body Body text of the pull request
 */
export const parseBody = (body: string): string => {
  const pattern = new RegExp("^#{1,6}\\s+changeset?\\s+$", "im");
  const result = body.split(pattern)[1];

  if (result) {
    return result;
  }

  throw new Error("No release notes header was found");
};

/**
 * Creates changeset directory if no directory is percent
 * @param workspacePath Base path for github workspace
 */
export const createChangesetPath = async (workspacePath: string) => {
  const directory = path.join(workspacePath, ".changeset");

  if (!fs.existsSync(directory)) {
    await createDir(directory);
  }
  return directory;
};

export const createValidFileNameFromTitle = (title: string) => {
  const filenameSections = title.split(":");

  if (!filenameSections[1] && filenameSections.length > 2) {
    throw new Error(
      "Pull request title is not valid, can not extract changeset file name."
    );
  }
  const fileName = filenameSections[1];

  return fileName.trim().replaceAll(" ", "-");
};

export const formatChangeSet = (changeSet: string) => {
  var inputArray = changeSet.split("\n");
  var setArray = inputArray.map((rowString) => rowString.trimStart());
  return setArray.join("\n");
};
