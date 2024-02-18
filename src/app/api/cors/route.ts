import fetch from 'node-fetch';
import { NextResponse } from 'next/server'


interface ResponseData {
    url: string;
  }
  
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');

  const response = await fetch("http://localhost:3000/api/cors", {
    method: "POST",
    body: formData,
  });
  const data = await response.json() as ResponseData;

//   console.log("data", data);
  console.log("url", data.url);


  const uploadResponse = await fetch(data.url, {
    method: "PUT",
    body: file,
  });

  return NextResponse.json({ status: uploadResponse.status });
}