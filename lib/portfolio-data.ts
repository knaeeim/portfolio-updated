import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio-content.json");

export function getPortfolioData() {
    try {
        if (fs.existsSync(DATA_PATH)) {
            const raw = fs.readFileSync(DATA_PATH, "utf-8");
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error("Error reading portfolio data:", err);
    }

    // Fallback default
    return null;
}

export function savePortfolioData(data: any) {
    try {
        const dir = path.dirname(DATA_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        // Strip security object to prevent credentials from ever being written to git-tracked json
        const cleanData = { ...data };
        delete cleanData.security;

        fs.writeFileSync(DATA_PATH, JSON.stringify(cleanData, null, 2), "utf-8");
        return true;
    } catch (err) {
        console.error("Error saving portfolio data:", err);
        return false;
    }
}
