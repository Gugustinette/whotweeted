import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { Owner } from './owner.schema';

export type CatDocument = mongoose.HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;

  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
    }),
  )
  details: Record<string, any>;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
