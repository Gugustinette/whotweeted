import { Controller, Get, Post, Request } from '@nestjs/common';
import { RoomService } from './room.service';
import { UserService } from '../users/user.service';

// TwitterService
import { TwitterService } from '../twitter/twitter.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
    private readonly twitterService: TwitterService,
  ) {}

  @Get()
  getHello(): string {
    return this.roomService.getHello();
  }

  /**
   * Create a new room to play a game
   * @returns {string} - The room ID
   */
  @Post('create')
  async createRoom(@Request() req): Promise<any> {
    // Get user's username from request
    const username = req.body.username;
    // Create a new user
    const user = await this.userService.createDefaultUser(username);

    // Create a new room
    const room = await this.roomService.createDefaultRoom(user);

    // Return the room ID and user information
    return {
      room_id: room._id,
      user: {
        _id: user._id,
        username: user.username,
        url_pp: user.url_pp,
      },
    };
  }

  /**
   * Create a user (so other players can join the room)
   * @returns {username} - The user's username
   */
  @Post('create-user')
  async createUser(@Request() req): Promise<any> {
    // Get user's username from request
    const username = req.body.username;
    // Create a new user
    const user = await this.userService.createDefaultUser(username);

    // Return the user information
    return {
      _id: user._id,
      username: user.username,
      url_pp: user.url_pp,
    };
  }

  /**
   * Search a user by its username
   * @param {string} username - The user's username
   * @returns {User} - The user
   */
  @Get('search-user')
  async searchUserByUsername(@Request() req): Promise<any> {
    // Get user's username from request
    const username = req.query.username;
    // Search the user
    const user = await this.twitterService.searchUserByUsername(username);

    // Return the user information
    return user;
  }

  /**
   * Test Route
   */
  @Post('test')
  async testRoute(): Promise<any> {
    return this.twitterService.searchUserByUsername('realDonaldTrump');
  }
}
