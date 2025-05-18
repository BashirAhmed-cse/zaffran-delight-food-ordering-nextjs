// core.js
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("upload completed", file.ufsUrl);
    }),
};




// No need for `satisfies` or `type` in JavaScript
// Also remove `export type OurFileRouter` — it's TypeScript-only
