# I-MAX (Bhagirathi) — Quick GitHub push instructions

From project root (C:\Users\parag\OneDrive\Desktop\I-MAX):

1. Check status and add files
   - git status
   - git add .

2. Commit
   - git commit -m "Initial commit"

   If you see "nothing added to commit", ensure you ran `git add .` and that files are not excluded by .gitignore.

3. Rename default branch to main (optional, but recommended)
   - git branch -M main

4. Create a repo on GitHub (via web) and copy the remote URL (HTTPS or SSH), then:
   - git remote add origin <REMOTE_URL>
   - git push -u origin main

Notes:
- If using HTTPS and prompted for password, create a GitHub Personal Access Token (PAT) and use it as the password.
- If you prefer SSH, set up SSH keys and use the SSH remote URL.
- Verify with `git remote -v` and `git log -1` after pushing.
