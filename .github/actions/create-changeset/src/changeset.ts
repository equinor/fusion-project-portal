import * as core from "@actions/core";

const addRelations = (
  changeset: string,
  body: string,
  relations: ((changeSet: string, body: string) => string)[]
) => {
  return relations.reduce((acc, relationFunction) => {
    return relationFunction(acc, body);
  }, changeset);
};

const shouldAddDbChange = (body: string): boolean => {
  return body.includes("- [x] database migration");
};

const addDbChange = (changeSet: string, body: string) => {
  if (!shouldAddDbChange(body)) return changeSet;

  const addDBWaring = `
    
    > [!IMPORTANT]  
    > This change requires database migration.
    `;

  return changeSet + addDBWaring;
};

/**
 * Parses the body text of the pull request and returns only the changeset section.
 * @param body Body text of the pull request
 */
export const parseBody = (body: string): string => {
  const pattern = new RegExp("^#{1,6}\\s+changeset?\\s+$", "im");
  const result = body.split(pattern)[1];

  if (result) {
    return addRelations(result.trim().concat("\n"), body, [
      addDbChange,
    ]).replaceAll("<!--[^>]*>", "");
  }

  throw new Error("No changeset notes header was found");
};

/**
 * Parses the body text of the pull request and returns only the changeset section.
 * @param body Body text of the pull request
 */
export const parseBodyForChangeType = (body: string): string | undefined => {
  const pattern = /(?<=\[x\]\s)(major|minor|patch|none)/g;
  const types = ["major", "minor", "patch", "none"];
  const result = body
    .split(pattern)
    .filter((p) => types.includes(p.toLowerCase()));

  if (result.length > 1 || result.length === 0) {
    throw new Error(
      "Select only one of the following, major, minor, patch or none, you have:" +
        result
    );
  }

  return result[0];
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
  return formatChangeSet(type === "none" ? getEmptySet() : header + changeSet);
};
