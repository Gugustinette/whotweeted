import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Import the Room model
import { Room, RoomDocument } from '../schemas/room.schema';
// Import the User model
import { UserDocument } from '../schemas/user.schema';

// Round service
import { RoundService } from '../rounds/round.service';

@Injectable()
export class RoomService {
  // Inject the Room model
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private roundService: RoundService,
  ) {}

  getHello(): string {
    return 'Hello Room!';
  }

  // Create a new room
  createRoom(room: Room): Promise<RoomDocument> {
    const createdRoom = new this.roomModel(room);
    return createdRoom.save();
  }

  // Create a new room with default values
  createDefaultRoom(user: UserDocument): Promise<RoomDocument> {
    const createdRoom = new this.roomModel({
      master: user,
      players: [],
      // Score is a record of the score of each player
      scores: {
        [String(user._id)]: 0,
      },
      actual_round: null,
      rounds: [],
      id_twitter_users: [],
      mode: 'custom',
      status: 'initialization',
      nb_max_round: 5,
    });
    return createdRoom.save();
  }

  // Get a room by its ID
  getRoomById(room_id: string): Promise<RoomDocument> {
    return this.roomModel.findById(room_id).exec();
  }
  getRoomPopulatedById(room_id: string): Promise<RoomDocument> {
    return this.roomModel
      .findById(room_id)
      .populate('master')
      .populate('players')
      .exec();
  }

  // Add a user to a room
  async addUserToRoom(
    room_id: string,
    user: UserDocument,
  ): Promise<RoomDocument> {
    // Get the room
    const room = await this.getRoomById(room_id);

    // Check if the user is already in the room
    if (room.players.includes(user)) {
      return room;
    }
    // Add the user to the room
    room.players.push(new mongoose.Types.ObjectId(user._id) as any);
    // Add the user to the score record
    room.scores[String(user._id)] = 0;
    // Save the room
    return room.save();
  }

  // Launch the game
  async launchGame(room_id: string): Promise<RoomDocument> {
    // Get the room
    const room = await this.getRoomById(room_id);
    // Set the status to "playing"
    room.status = 'playing';
    // Generate rounds
    /*
    const rounds = await this.roundService.generateRounds(
      room.id_twitter_users,
      room.nb_max_round,
    );
    // Set the rounds
    room.rounds = rounds;
    // Set the actual round
    room.actual_round = rounds[0];
    */
    // Save the room
    return room.save();
  }

  // Configure the game
  async configureGame(
    room_id: string,
    mode: string,
    nb_max_round: number,
    id_twitter_users: string[],
  ): Promise<RoomDocument> {
    // Get the room
    const room = await this.getRoomById(room_id);
    // Set the mode
    room.mode = mode;
    // Set the number of rounds
    room.nb_max_round = nb_max_round;
    // Set the twitter's ids of the users
    room.id_twitter_users = id_twitter_users;
    // Save the room
    return room.save();
  }
}
