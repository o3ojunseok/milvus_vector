import { Injectable } from "@nestjs/common";
import { CreateScrapingDto } from "./dto/create-scraping.dto";
import { UpdateScrapingDto } from "./dto/update-scraping.dto";
import * as puppeteer from "puppeteer";
import * as pdf from "pdf-parse"

@Injectable()
export class ScrapingService {
  constructor() {}

  private async getPdfBuffer(browser: puppeteer.Browser, file: Express.Multer.File, url: string): Promise<Buffer> {
    if (url) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });
      
      const pdfData = await page.pdf({
        format: "A4",
        printBackground: true,
      });
      
      return Buffer.from(pdfData);
    } else if (file?.buffer) {
      return file.buffer;
    }
  }

  async scraping(url: string, file: Express.Multer.File) {
    const browser = await puppeteer.launch();
    const pdfBuffer = await this.getPdfBuffer(browser, file, url);
    const data = await pdf(pdfBuffer);
    const text = data.text;
    const rowsArray = text.split(/\r?\n/);
    const texts = rowsArray.filter(e => e !== "");
    await browser.close();
    return texts;
  }
}
