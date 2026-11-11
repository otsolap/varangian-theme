# Planning

Create multi-phase plans when the work spans multiple distinct topics. Each phase must be independently committable. Phase 1 must not depend on phase 2 changes.

After completing each phase, stop and wait for the user to review, adjust, and commit before proceeding to the next phase.

# Git

NEVER commit directly. Instead, suggest an appropriate commit message to the developer.

# Release Process

- The version in `package.json` is the release version. Match it with the git tag `vX.Y.Z`.
- Sites install `git+https://github.com/otsolap/varangian-theme.git#semver:~0.0.1`.
- That range accepts later `0.0.x` tags. A `0.1.0` tag stays out until the site range changes.
- Suggest the commit and the tag commands. Do not run them.
- Keep `"private": false`.
- Keep `license` set to `UNLICENSED`. All rights reserved. Do not add a license that grants use, copy, or share rights.

# Package contents

- `package.json` `files` is an allowlist. A new root file stays out of the tarball until you add it.
- Keep `.grok` in `files`. Sites read `.grok/rules/shared-rules.md` from the installed package, so that folder must ship.
- When you add, move, or rename a root file, run `npm pack --dry-run` and read the file list.
