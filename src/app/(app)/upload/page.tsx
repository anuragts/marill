"use client";
 
import { UploadButton } from "@/utils/uploadthing";
import { addFiletoDB, readPDF } from "@/app/action";
 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={async (res:any) => {
            // Do something with the response
            console.log("Files: ", res);
            // const content = await readPDF(res[0].url);
            const file = await addFiletoDB(res[0].name, res[0].url, res[0].key);
            console.log("File added to db ", file);
            alert("Upload Completed");
          }}
      />
    </main>
  );
}

// [0].key
// [0].name
// [0].url