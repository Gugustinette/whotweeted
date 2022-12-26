import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { User } from './user.schema';

export type RoundDocument = mongoose.HydratedDocument<Round>;

// Représente un round d'une partie
@Schema()
export class Round {
  /**
   * Attributs
   */
  // Identifiant du tweet du round
  @Prop()
  id_tweet: string;

  // Identifiant du compte du tweet du round
  id_twitter_user_response: string;

  // Identifiant des comptes à proposer aux joueurs
  id_twitter_user_propositions: string[];

  // Réponses des joueurs de la partie
  @Prop()
  player_responses: Record<string, string>;
}

export const RoundSchema = SchemaFactory.createForClass(Round);
