import { v2 as cloudinary } from "cloudinary";

console.log('🔍 Cloudinary Config Check:');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME || '❌ MISSING');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Found' : '❌ MISSING');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Found' : '❌ MISSING');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

console.log('✅ Cloudinary configured');

export default cloudinary;