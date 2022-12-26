import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Import the User model
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  // Inject the User model
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create a new user
  async createUser(user: User): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  // Create a new user with default values from username
  async createDefaultUser(username: string): Promise<UserDocument> {
    const user = new this.userModel({
      username: username,
      url_pp: '',
      nb_won_game: 0,
    });
    return user.save();
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
