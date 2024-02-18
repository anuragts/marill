
import fetch from 'node-fetch';
import fs from 'fs';
import pdf from 'pdf-parse-fork';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


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

readPDF();