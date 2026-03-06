// import sharp from "sharp";
// import path from "path";
// import fs from "fs";

// async function convertToWebp(buffer: Buffer) {
//   const optimized = await sharp(buffer)
//     .rotate()
//     .resize({
//       width: 1920,
//       height: 1080,
//       fit: "inside",
//       withoutEnlargement: true,
//     })
//     .webp({ quality: 75 })
//     .toBuffer();

//   return optimized;
// }

// export async function imageUploader(buffer: Buffer, originalName: string) {
//   // ensure folder exists
//   await fs.mkdir(UPLOAD_DIR, { recursive: true });

//   // unique filename
//   const id = crypto.randomUUID();
//   const fileName = `${id}.webp`;

//   const optimized = await sharp(buffer)
//     .rotate() // fixes mobile orientation
//     .resize({ width: 1920, height: 1080, withoutEnlargement: true })
//     .webp({ quality: 75 })
//     .toBuffer();

//   const filePath = path.join(UPLOAD_DIR, fileName);

//   await fs.writeFile(filePath, optimized);

//   return {
//     fileName,
//     path: `/uploads/${fileName}`,
//     size: optimized.length,
//   };
// }
