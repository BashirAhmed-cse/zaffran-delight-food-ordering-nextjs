'use client';

import Image from "next/image";
import toast from "react-hot-toast";
import { uploadFiles } from "../../app/utils/uploadthing"; // 👈 adjust this path if needed

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (!files?.length) return;

    const uploadPromise = uploadFiles("imageUploader", {
      files: [files[0]],
    }).then(res => {
      if (!res || res.length === 0) throw new Error("No file uploaded");
      setLink(res[0].ufsUrl);
    });

    await toast.promise(uploadPromise, {
      loading: 'Uploading...',
      success: 'Upload complete!',
      error: 'Upload failed',
    });
  }

  return (
    <>
      {link ? (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={250}
          height={250}
          alt="avatar"
        />
      ) : (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
