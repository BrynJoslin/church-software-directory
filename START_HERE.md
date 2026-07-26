# Church Software UK: Starter Pack

This pack contains the persistent instructions and project documents to place in the repository before asking Codex to build the site.

## Included files

```text
AGENTS.md
docs/
  PROJECT_SPEC.md
  IMPLEMENTATION.md
  ROADMAP.md
  PRINCIPLES.md
  IMPLEMENTATION_STATUS.md
prompts/
  01_SOL_FOUNDATION.md
```

## How to use this pack

1. Create an empty local project folder.
2. Copy these files into it, preserving the folder structure.
3. Initialise Git.
4. Open the folder in Codex.
5. Select the strongest coding model available to you and a high reasoning setting for the first architectural pass.
6. Paste the contents of `prompts/01_SOL_FOUNDATION.md`.
7. Review the resulting site locally before allowing Codex to push anything.

## Recommended local commands

```bash
mkdir -p ~/Developer/uk-church-software-directory
cd ~/Developer/uk-church-software-directory
git init
```

Copy this starter pack into that folder, then create the first commit:

```bash
git add .
git commit -m "docs: add project brief and agent instructions"
```

## Important boundary

The first task deliberately creates only a small representative catalogue. Do not ask the strongest model to research and write dozens of listings. The difficult first job is designing a sound architecture. Catalogue expansion can be handled later in smaller, cheaper, evidence-backed batches.
