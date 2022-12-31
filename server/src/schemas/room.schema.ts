import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { UserDocument } from './user.schema';
import { RoundDocument } from './round.schema';

export type RoomDocument = mongoose.HydratedDocument<Room>;

// Represents a room
@Schema()
export class Room {
  /**
   * Attributes
   */
  // User's id who created the room
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  master: UserDocument;

  // Users who play in the room
  @Prop({ type: mongoose.Schema.Types.Array, ref: 'User' })
  players: UserDocument[];

  // Scores of each player
  @Prop({
    type: mongoose.Schema.Types.Mixed,
  })
  scores: Record<string, number>;

  // Round in progress
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Round' })
  actual_round: RoundDocument;

  // Rounds of the game
  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Round' })
  rounds: RoundDocument[];

  // Twitter's id of the users that will be used in the game
  @Prop()
  id_twitter_users: string[];

  // Game mode (Custom / Celebrity)
  @Prop()
  mode: string;

  // Status of the game 'initialization' / 'in_progress' / 'finished'
  @Prop()
  status: string;

  /**
   * Configuration
   */
  // Number of rounds in the game
  @Prop()
  nb_max_round: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
