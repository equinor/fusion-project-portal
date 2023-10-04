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
