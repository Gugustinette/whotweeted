import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type RoundDocument = mongoose.HydratedDocument<Round>;

// Import the Tweet model
import { Tweet } from './tweet.schema';

// Represent a round
@Schema()
export class Round {
  /**
   * Attributs
   */
  // Tweet's id of the round
  @Prop()
  id_tweet: string;

  // Tweet's of the round
  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  tweet: Tweet;

  // Tweet's user's id of the round
  @Prop()
  id_twitter_user_response: string;

  // Tweet's user's ids to propose to the players
  @Prop()
  id_twitter_user_propositions: string[];

  // Record to store twitter users' profiles
  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  twitter_users_profiles: Record<string, any>;

  // Player's responses (id_user => id_twitter_user)
  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  player_responses: Record<string, string>;
}

export const RoundSchema = SchemaFactory.createForClass(Round);
