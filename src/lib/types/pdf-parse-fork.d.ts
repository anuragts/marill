declare module 'pdf-parse-fork' {
    export interface PDFData {
      numpages: number;
      info: object;
      metadata?: object;
      text: string;
      version: string;
      numrender: number;
      javascript: string;
    }
  
    export interface Options {
      version?: string;
      pagerender?: (pageData: PDFData) => string;
    }
  
    function pdfParse(dataBuffer: Buffer, options?: Options): Promise<PDFData>;
  
    export default pdfParse;
  }