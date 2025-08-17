import { readFile, readdir, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";

const config = {
  targetDir: "./weather",
  oldColor: "#ffffff",
  newColor: "#ffffff"
};
const processSVGFiles = async (dir: string) => {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        await processSVGFiles(fullPath);
      } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".svg") {
        await replaceColorInSVG(fullPath);
      }
    }
  } catch (err: any) {
    console.error(`[错误] 遍历目录失败: ${dir}\n原因: ${err}`);
  }
};
const replaceColorInSVG = async (filePath: string) => {
  try {
    let content = await readFile(filePath, "utf8");
    const colorRegex = new RegExp(config.oldColor, "gi");
    const newContent = content.replace(colorRegex, config.newColor);
    await writeFile(filePath, newContent);
    console.log(`[成功] 已处理: ${filePath}`);
  } catch (err: any) {
    console.error(`[失败] 文件处理错误: ${filePath}\n原因: ${err}`);
  }
};

processSVGFiles(config.targetDir)
  .then(() => console.log("✅ 颜色替换完成"))
  .catch(err => console.error("❌ 脚本异常:", err));
