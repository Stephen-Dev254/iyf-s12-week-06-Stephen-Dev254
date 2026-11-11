import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(process.cwd(), ".env");
const configOutPath = path.resolve(process.cwd(), "config.js");

function parseEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = {};

    for (const line of raw.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        const eqIndex = trimmed.indexOf("=");
        if (eqIndex === -1) continue;

        const key = trimmed.slice(0, eqIndex).trim();
        let value = trimmed.slice(eqIndex + 1).trim();

        // Strip surrounding single or double quotes if present
        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        parsed[key] = value;
    }
    return parsed;
}

const fileEnv = parseEnvFile(envPath);
const apiKey = process.env.OPENWEATHER_API_KEY || fileEnv.OPENWEATHER_API_KEY || "";
const baseUrl = process.env.OPENWEATHER_BASE_URL || fileEnv.OPENWEATHER_BASE_URL || "https://openweathermap.org";
const defaultUnits = process.env.DEFAULT_UNITS || fileEnv.DEFAULT_UNITS || "metric";

if (!apiKey || apiKey === "your_openweathermap_api_key_here") {
    console.error("❌ Error: OPENWEATHER_API_KEY is missing or still set to placeholder in .env");
    process.exit(1);
}

const configContent = `// Auto-generated from .env by build-env.js — DO NOT COMMIT
const ENV = Object.freeze({
    API_KEY: ${JSON.stringify(apiKey)},
    BASE_URL: ${JSON.stringify(baseUrl)},
    DEFAULT_UNITS: ${JSON.stringify(defaultUnits)}
});
const API_KEY = ENV.API_KEY;
`;

fs.writeFileSync(configOutPath, configContent, "utf-8");
console.log("✅ Successfully compiled .env into config.js");
