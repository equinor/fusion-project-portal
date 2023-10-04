import * as core from "@actions/core";

/**
 * Parses the body text of the pull request and returns only the changeset section.
 * @param body Body text of the pull request
 */
export const parseBody = (body: string): string => {
  const pattern = new RegExp("^#{1,6}\\s+changeset?\\s+$", "im");
  const result = body.split(pattern)[1];

  if (result) {
    return result.trim().concat("\n");
  }

  throw new Error("No release notes header was found");
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

const formatChangeSet = (changeSet: string) => {
  var inputArray = changeSet.split("\n");
  var setArray = inputArray.map((rowString) => rowString.trimStart());
  return setArray.join("\n");
};

const getChangesetHeader = (type: string, projectName: string) => {
  return `
    ---
    "${projectName}": ${type}
    --- 
    `;
};

const getEmptySet = () => {
  return `
    ---
    ---
    `;
};

export const createChangesetByType = (
  changeSet: string,
  type?: string
): string => {
  if (!type) throw new Error("No valid changeset type provided.");
  const projectName = core.getInput("projectName");

  const header = getChangesetHeader(type, projectName);
  return formatChangeSet((type = "none" ? header + changeSet : getEmptySet()));
};
