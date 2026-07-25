import { execFile } from "node:child_process";
import { promisify } from "node:util";
import "./dashboard.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
if (process.platform !== "darwin") { console.log("Dashboard generated. Open .internal/dashboard/index.html in your browser."); } else { await promisify(execFile)("open", [path.join(root, ".internal", "dashboard", "index.html")]); }
