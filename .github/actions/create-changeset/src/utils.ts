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
): Promise<
  {
    url: string;
    id: number;
    node_id: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    issue_url: string;
    commits_url: string;
    review_comments_url: string;
    review_comment_url: string;
  }[]
> {
  const octokit = new Octokit({ auth: token });

  try {
    const response = await octokit.pulls.list({
      owner,
      repo,
      pull_number: prNumber,
    });

    const issues = response.data.map((issue) => issue);
    return issues;
  } catch (error) {
    console.error("Error fetching pull request issues:", error);
    throw error;
  }
}
