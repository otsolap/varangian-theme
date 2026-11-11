# Planning

Create multi-phase plans when the work spans multiple distinct topics. Each phase must be independently committable. Phase 1 must not depend on phase 2 changes.

After completing each phase, stop and wait for the user to review, adjust, and commit before proceeding to the next phase.

# Git

NEVER commit directly. Instead, suggest an appropriate commit message to the developer.

# Release Process

- The version in `package.json` is the release version. Match it with the git tag `vX.Y.Z`.
- Sites install `varangian-theme` at `latest` from the npm registry.
- `latest` is the newest published version. A site runs `npm update varangian-theme` to get it.
- Suggest the commit and the tag commands. Do not run them.
- After the tag is on the remote, run `npm publish`. The npm version matches the git tag.
- Keep `"private": false`.
- Keep `license` set to `MIT`. The copyright notice is `MIT © Otso Lappalainen`, and the name links to `https://varangianventure.com`. The `LICENSE` file is the MIT license.

# Package contents

- `package.json` `files` is an allowlist. A new root file stays out of the tarball until you add it.
- Keep `.grok` in `files`. Sites read `.grok/rules/shared-rules.md` from the installed package, so that folder must ship.
- When you add, move, or rename a root file, run `npm pack --dry-run` and read the file list.
