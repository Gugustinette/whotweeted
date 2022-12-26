import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CelebrityDocument = HydratedDocument<Celebrity>;

// Represents a celebrity
@Schema()
export class Celebrity {
  // Twitter's id
  @Prop()
  id_twitter: string;

  // Username
  @Prop()
  username: string;

  // Categories the celebrity belongs to
  @Prop()
  categories: string[];
}

export const CelebritySchema = SchemaFactory.createForClass(Celebrity);
