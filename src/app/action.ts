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
import OpenAI from "openai";

export async function addFiletoDB(name: string, url: string, key: string) {
  const content = await doPDF(url, "temp.pdf");
  const result = await db.insert(pdf).values({
    key,
    name,
    url,
    content,
    userId: 1,
  });
  return content;
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

export async function chatwithOpenAI(content: string, question: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log(content);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are a chat with pdf educative teacher so you'll , so here is the pdf as text and you'll answer. ${content}`,
      },
      {
        role: "user",
        content: `${question}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 400,
    top_p: 1,
  });

  console.log(response.choices[0].message.content);

  return response.choices[0].message.content;
}
// Call the function with the URL of the PDF file and the destination path
// downloadPDF('https://utfs.io/f/0516ac07-e644-4fca-b985-b5ae47fffc72-1jxn63.pdf', 'filename.pdf');

// https://utfs.io/f/0516ac07-e644-4fca-b985-b5ae47fffc72-1jxn63.pdf
