import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env FIRST
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('✅ .env loaded');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);

// Use dynamic imports so they run AFTER dotenv
const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/db.js");

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});