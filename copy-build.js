/**
 * Cross-platform build deploy script
 * Copies Angular build output from /build to /dist,
 * while preserving the .git folder and CNAME for deployment repo.
 */

const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "build", "adminPanel-build-temp");
const destDir = path.join(__dirname, "dist", "adminPanel-build-temp");

const gitDir = path.join(destDir, ".git");
const cnameFile = path.join(destDir, "CNAME");

const gitBackup = path.join(__dirname, ".git-backup-temp");
const cnameBackup = path.join(__dirname, ".CNAME-backup-temp");

/**
 * Recursively copy a folder
 * @param {string} src
 * @param {string} dest
 */
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((file) => {
    if (file === ".git" || file === "CNAME") return; // never overwrite .git or CNAME

    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);

    if (fs.lstatSync(srcFile).isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

/**
 * Preserve .git and CNAME if present
 */
function backupGitAndCNAME() {
  if (fs.existsSync(gitDir)) fs.renameSync(gitDir, gitBackup);
  if (fs.existsSync(cnameFile)) fs.renameSync(cnameFile, cnameBackup);
}

/**
 * Restore .git and CNAME after copying
 */
function restoreGitAndCNAME() {
  if (fs.existsSync(gitBackup)) fs.renameSync(gitBackup, gitDir);
  if (fs.existsSync(cnameBackup)) fs.renameSync(cnameBackup, cnameFile);
}

/**
 * Remove destination folder safely (without .git or CNAME)
 */
function cleanDest() {
  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
}

// --- MAIN EXECUTION ---

if (!fs.existsSync(srcDir)) {
  console.error(`❌ Source directory not found: ${srcDir}`);
  process.exit(1);
}

console.log(`🚀 Starting copy from ${srcDir} → ${destDir}`);

backupGitAndCNAME();
cleanDest();
copyDir(srcDir, destDir);
restoreGitAndCNAME();

console.log("✅ Build copied successfully (with .git and CNAME preserved).");
