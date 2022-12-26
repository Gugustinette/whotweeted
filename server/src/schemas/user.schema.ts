import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// Représente un utilisateur
@Schema()
export class User {
  // Nom d'utilisateur
  @Prop()
  username: string;

  // URL de la photo de profil de l'utilisateur
  @Prop()
  url_pp: string;

  // Nombre de parties gagnées par l'utilisateur
  @Prop()
  nb_won_game: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
