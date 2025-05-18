// app/api/uploadthing/core.js
import { createUploadthing,  FileRouter } from "uploadthing/next";
import {  NextRequest } from "next/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete", file);
      return { uploadedBy: "admin", url: file.ufsUrl };
    }),
};
