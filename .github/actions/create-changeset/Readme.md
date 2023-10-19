# Create Changeset


The create changeset actions creates a changeset according to pull request body.
If the template changeset is not provided in pull request body the action will append a base on 
template that can be defined as md file. 

## Inputs

changesetTemplateFile: string
packageName: string

## Changeset

What type changes has been made?
- [x] major
- [ ] minor
- [ ] patch
- [ ] none

---

-- changeset body here






# Result 

---
"@fusion-project-portal": patch
---

Auto create changeset based on pull request description 2222
