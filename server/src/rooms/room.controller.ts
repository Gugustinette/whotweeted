import { Controller, Get, Post, Request } from '@nestjs/common';
import { RoomService } from './room.service';
import { UserService } from '../users/user.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
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
        username: user.username,
        url_pp: user.url_pp,
      },
    };
  }
}
