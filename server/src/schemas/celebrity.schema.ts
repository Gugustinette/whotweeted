import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CelebrityDocument = HydratedDocument<Celebrity>;

// Représente une personnalité sur Twitter
@Schema()
export class Celebrity {
  // Identifiant de l'utilisateur
  @Prop()
  id_twitter: string;

  // Nom d'utilisateur
  @Prop()
  username: string;

  // Catégories dans lesquels l'utilisateur est classé
  @Prop()
  categories: string[];
}

export const CelebritySchema = SchemaFactory.createForClass(Celebrity);
