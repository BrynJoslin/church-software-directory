import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
try { await access(path.join(root, "dist", ".internal")); throw new Error("Internal dashboard found inside dist."); } catch (error) { if (error.code !== "ENOENT") throw error; }
const files = await readFile(path.join(root, ".gitignore"), "utf8"); if (!files.includes(".internal/")) throw new Error(".internal/ must be gitignored.");
console.log("Production output does not include the internal dashboard.");
