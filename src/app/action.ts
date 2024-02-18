"use server";

import fetch from "node-fetch";
import fs from "fs";
//ts-ignore
import pdfParse from "pdf-parse-fork";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { db } from "@/lib/db/client";
import { pdf } from "@/lib/db/schema";

export async function addFiletoDB(name: string, url: string, key: string) {
  const content = await doPDF(url, "temp.pdf");
  const result = await db.insert(pdf).values({
    key,
    name,
    url,
    content,
    userId: 1,
  });
  return result;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function doPDF(url: string, file_name: string) {
  const response = await readPDF(url, file_name);

  // const response = await axios.get(url, { responseType: 'arraybuffer' });

  return response;
}

async function downloadPDF(url: string, destination: string) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(destination, buffer);
    console.log("PDF downloaded successfully");
  } catch (error) {
    console.error("Error downloading PDF:", error);
  }
}

export async function readPDF(url: string, file_name: string) {
  const filePath = path.resolve(__dirname, file_name);
  await downloadPDF(url, filePath);

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return;
  }

  const data = fs.readFileSync(filePath);
  const content = await pdfParse(data);
//   console.log(content.text);

  fs.unlinkSync(filePath);

  return content.text;
}

// Call the function with the URL of the PDF file and the destination path
// downloadPDF('https://utfs.io/f/0516ac07-e644-4fca-b985-b5ae47fffc72-1jxn63.pdf', 'filename.pdf');

// https://utfs.io/f/0516ac07-e644-4fca-b985-b5ae47fffc72-1jxn63.pdf
