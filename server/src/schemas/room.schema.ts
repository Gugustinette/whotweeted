import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { User } from './user.schema';
import { Round } from './round.schema';

export type RoomDocument = mongoose.HydratedDocument<Room>;

// Représente une partie
@Schema()
export class Room {
  /**
   * Attributs
   */
  // Identifiant de l'utilisateur possédant la Room
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  master: User;

  // Identifiant des utilisateurs jouant dans la Room
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  players: User[];

  // Score des utilisateurs jouant dans la Room
  @Prop()
  scores: Record<string, number>;

  // Round actuel
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Round' })
  actual_round: Round;

  // Rounds
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Round' })
  rounds: Round[];

  // Identifiants Twitter des personnes avec lesquels on joue
  @Prop()
  id_twitter_users: string[];

  // Mode de jeu (Célébrité / Personnalisé)
  @Prop()
  mode: string;

  /**
   * Configuration
   */
  // Nombre de rounds
  nb_max_round: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
