
import fetch from 'node-fetch';
import fs from 'fs';
import pdf from 'pdf-parse-fork';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import OpenAI from "openai";

import dotenv from 'dotenv';
dotenv.config();




async function downloadPDF(url, destination) {
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFileSync(destination, buffer);
    console.log('PDF downloaded successfully');
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
}

// Call the function with the URL of the PDF file and the destination path
// downloadPDF('https://utfs.io/f/0516ac07-e644-4fca-b985-b5ae47fffc72-1jxn63.pdf', 'filename.pdf');



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function readPDF(){
    const filePath = path.resolve(__dirname, 'temp.pdf');
    await downloadPDF('https://utfs.io/f/0516ac07-e644-4fca-b985-b5ae47fffc72-1jxn63.pdf', filePath);

    if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        return;
    }

    const data = fs.readFileSync(filePath);
    const content = await pdf(data);
    console.log(content.text);

    fs.unlinkSync(filePath);


    return content.text;
}

// readPDF();

export async function chatwithOpenAI(content,question){

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        "role": "system",
        "content": `You are a chat with pdf educative teacher so you'll , so here is the pdf as text and you'll answer. ${content}`
      },
      {
        "role": "user",
        "content": `${question}`
      }
    ],
    temperature: 0.7,
    max_tokens: 64,
    top_p: 1,
  });
  
  console.log(response.choices[0].message.content);
  
  return response;
  }

chatwithOpenAI(`Business Plan: CrackedDevs.com
Executive Summary
CrackedDevs.com is a curated platform for high-skilled freelancers, designed to revolutionize the gig economy by
focusing on quality over quantity. We aim to be a market leader in the freelance industry, providing a platform that
connects top-tier freelancers with clients seeking premium services.
Business Description
CrackedDevs.com is not just another freelancing platform. Our unique selling proposition is the exclusive, high-caliber
talent pool. Unlike competitors like Upwork, we only admit a selected group of highly skilled freelancers to maintain the
standard of services offered.
Market Analysis
The global freelancing market is burgeoning, with more professionals opting for flexible work arrangements. This creates
a demand for platforms like ours, that prioritize service quality. Our target customer base includes businesses looking for
top-notch freelance services and freelancers seeking fair compensation for their high-level skills.
Marketing/Sales Strategy
Our marketing strategy involves targeting both freelancers and businesses through social media campaigns, content
marketing, SEO, and partnerships. We'll highlight the benefits of our curated approach, emphasizing the quality of our
freelancers.
Our sales strategy involves a revenue model where we retain a 20% cut from the freelancers' project payment. This
model incentivizes both customers and freelancers to use our platform consistently, creating a steady revenue flow.
Operations
Our operations will focus on maintaining a smooth, user-friendly platform. We'll invest in top-notch UX/UI design and
robust technical infrastructure to ensure seamless transactions. Additionally, we'll implement a stringent vetting process
for freelancers to ensure only the best are admitted.
Financial Projections
Our financial projections are optimistic, considering our unique approach to freelancing. With the 20% cut from
freelancers' payments, we expect a substantial revenue stream once we've built a solid user base.
Conclusion
CrackedDevs.com aims to disrupt the freelancing market by focusing on the quality of freelancers. Our unique business
model and strategic focus on top-tier talent position us to make a significant impact in the freelance industry.`,"what is this pdf about");
