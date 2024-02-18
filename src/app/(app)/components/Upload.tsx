"use client";

import React, { useContext } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { addFiletoDB } from "@/app/action";
import { FileContext } from "../context/FileContext";

export default function Upload() {
  const fileContext = useContext(FileContext);


  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={async (res: any) => {
        // Do something with the response
        console.log("Files: ", res);
        const content = await addFiletoDB(res[0].name, res[0].url, res[0].key);
        console.log("File added to db ");
        fileContext?.setFile(content); // Set the file in the global state
        alert("Upload Completed");
      }}
    />
  );
}

// [0].key
// [0].name
// [0].url
