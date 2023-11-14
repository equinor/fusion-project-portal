import path from "path";
import fs from "fs";
import util from "util";
import { Octokit } from "@octokit/rest";

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

export async function getPullRequestIssues(
  owner: string,
  repo: string,
  prNumber: number,
  token: string
): Promise<any[]> {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
    });

    return response;
  } catch (error) {
    console.error("Error fetching pull request issues:", error);
    throw error;
  }
}
