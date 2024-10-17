import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ChatLogDocument = ChatLog & Document;

@Schema()
export class ChatLog {
  @Prop({ type: String })
  input: string;

  @Prop({ type: String })
  output: string;

  @Prop({ type: String })
  inputDateTime: string;

  @Prop({ type: String })
  outputDateTime: string;
}

export const ChatLogDocument = SchemaFactory.createForClass(ChatLog);