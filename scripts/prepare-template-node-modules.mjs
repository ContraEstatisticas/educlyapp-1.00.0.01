import { existsSync, lstatSync, mkdirSync, readdirSync, rmSync, symlinkSync } from "node:fs";
import path from "node:path";

const templateModulesDir = "/opt/template-node-modules";
const virtualNodeModulesDir = path.join(templateModulesDir, "node_modules");

const ensureDirSymlink = (targetPath, linkPath) => {
  try {
    if (existsSync(linkPath)) {
      const existing = lstatSync(linkPath);
      if (existing.isSymbolicLink()) return;
      rmSync(linkPath, { recursive: true, force: true });
    }

    symlinkSync(targetPath, linkPath, "dir");
  } catch {
    // Best effort only: keep build running even if one symlink cannot be created
  }
};

if (!existsSync(templateModulesDir)) {
  process.exit(0);
}

mkdirSync(virtualNodeModulesDir, { recursive: true });

for (const entry of readdirSync(templateModulesDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === "node_modules") continue;

  const entryPath = path.join(templateModulesDir, entry.name);

  if (entry.name.startsWith("@")) {
    const scopeNodeModulesDir = path.join(virtualNodeModulesDir, entry.name);
    mkdirSync(scopeNodeModulesDir, { recursive: true });

    for (const scopedPkg of readdirSync(entryPath, { withFileTypes: true })) {
      if (!scopedPkg.isDirectory()) continue;
      ensureDirSymlink(
        path.join(entryPath, scopedPkg.name),
        path.join(scopeNodeModulesDir, scopedPkg.name),
      );
    }

    continue;
  }

  ensureDirSymlink(entryPath, path.join(virtualNodeModulesDir, entry.name));
}
