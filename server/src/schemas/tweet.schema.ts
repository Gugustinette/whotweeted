import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TweetDocument = mongoose.HydratedDocument<Tweet>;

// Represents a tweet
@Schema()
export class Tweet {
  /**
   * Attributes
   */
  // id
  @Prop()
  id: string;

  // author_id
  @Prop()
  author_id: string;

  // author_username
  @Prop()
  author_username: string;

  // text
  @Prop()
  text: string;
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);
