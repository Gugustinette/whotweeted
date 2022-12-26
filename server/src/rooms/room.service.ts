import { Model } from 'mongoose';
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
      players: [user._id],
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
}
