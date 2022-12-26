import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// Represents a user
@Schema()
export class User {
  // Username
  @Prop()
  username: string;

  // Profile picture's url
  @Prop()
  url_pp: string;

  // Number of games won
  @Prop()
  nb_won_game: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
