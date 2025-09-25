/**
 * Cross-platform build deploy script
 * Copies Angular build output from /build to /dist,
 * while preserving the .git folder for deployment repo.
 */

const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "build", "adminPanel-build-temp");
const destDir = path.join(__dirname, "dist", "adminPanel-build-temp");
const gitDir = path.join(destDir, ".git");
const gitBackup = path.join(__dirname, ".git-backup-temp");

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
    if (file === ".git") return; // never overwrite .git

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
 * Preserve .git if present
 */
function backupGit() {
  if (fs.existsSync(gitDir)) {
    fs.renameSync(gitDir, gitBackup);
  }
}

/**
 * Restore .git after copying
 */
function restoreGit() {
  if (fs.existsSync(gitBackup)) {
    fs.renameSync(gitBackup, gitDir);
  }
}

/**
 * Remove destination folder safely (without .git)
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

backupGit();
cleanDest();
copyDir(srcDir, destDir);
restoreGit();

console.log("✅ Build copied successfully (with .git preserved).");
