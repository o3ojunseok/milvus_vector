import { BadRequestException, Injectable } from "@nestjs/common";
import { GptTypeRole, MessagesType } from "./interface/interface";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import OpenAI from "openai";
@Injectable()
export class OpenAiService {
  constructor(
  ) {}

  private async openAiKey() {
    return new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });
  }

  async embedding(text: string[], dimensions=3072) {
    try {
      const openai = await this.openAiKey();
      const embed = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: text,
        dimensions,
      });
      return embed;
    } catch (err) {
      console.log(err);
      throw new BadRequestException("key error");
    }
  }

  async bulkEmbedding(text: string[], dimensions=3072) {
    const result = [];
    try {
      const openai = await this.openAiKey();
      for (const value of text) {
        const embed = await openai.embeddings.create({
          model: "text-embedding-3-large",
          input: value,
          dimensions,
        });
        result.push(embed);
      }
      return {
        embeddings: result,
        usage: result.map(e => e.usage),
      }
    } catch (err) {
      console.log(err);
    }
  }

  async timeoutEmbedding(text: string[][], dimensions=3072) {
    try {
      const openai = await this.openAiKey();
      const usage = [];
      const embeddings = [];
      let result;
      for (const value of text) {
        result = await openai.embeddings.create({
          model: "text-embedding-3-large",
          input: value,
          dimensions,
        });
        embeddings.push(result);
        usage.push(result.usage);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      return {
        embeddings,
        usage,
      };
    } catch (err) {
      throw new BadRequestException("key error");
    }
  }

  async gptChat(gptType: GptTypeRole, messages: MessagesType[]) {
    try {
        const openai = await this.openAiKey();
        const response = await openai.chat.completions
        .create({
          model: gptType,
          messages,
      });
      return response;
    } catch (err) {
      if (err.status === 401) {
        throw new BadRequestException("key error");
      } else {
        throw new BadRequestException("error");
      }
    }
  }

  async zodParse(prompt: string, data: { sessionId: string, input: string }[]) {
    const schema = z.object({
      res: z.array(
        z.object({
          i: z.string(),
          co: z.number(),
          p: z.number()
        })
      ),
      tc: z.number()
    });
    const openai = await this.openAiKey();
    const response = await openai.beta.chat.completions.parse({
      messages: [
        {
          role: "system", content: prompt,
        },
        { 
          role: "user", content: data.toString(),
        },
      ],
      model: "gpt-4o-2024-08-06",
      response_format: zodResponseFormat(schema, "json_object"),
      temperature: 0.0,
    });
    return response.choices[0].message.parsed;
  }
}
