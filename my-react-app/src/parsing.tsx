import { PDFParse } from 'pdf-parse';


export async function parseFile(bloblurl: string) {
    const parser = new PDFParse({ url: bloblurl });

    const result = await parser.getText();

    return result.text

}


