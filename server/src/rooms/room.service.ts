import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Import the Room model
import { Room, RoomDocument } from '../schemas/room.schema';
// Import the User model
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class RoomService {
  // Inject the Room model
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

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
      players: [user],
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
}
