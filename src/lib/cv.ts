import fs from "node:fs";
import path from "node:path";

/** True once public/cv.pdf exists. Checked each time a page is built; the CV buttons stay hidden until then. */
export const hasCv = () => fs.existsSync(path.join(process.cwd(), "public", "cv.pdf"));
