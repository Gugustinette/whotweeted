import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// Room Service
import { RoomService } from './room.service';
// User Service
import { UserService } from '../users/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
/**
 * Room Gateway
 * Contains every methods needed to play the game
 * @class
 * @classdesc Room Gateway
 * @memberof module:Rooms
 * @category Rooms
 * @subcategory Gateways
 */
export class RoomGateway {
  constructor(
    private readonly roomService: RoomService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  // Events Constants
  static readonly EVENT_JOIN_ROOM = 'join_room';
  static readonly EVENT_PLAYER_JOINED = 'player_joined';
  static readonly EVENT_ROOM_INFO = 'room_info';

  /**
   * Let a user join a room
   * @param {string} room_id - The room ID
   * @param {string} user_id - The user's ID
   * Return every players in the room
   * @returns {User[]} - The list of players in the room
   */
  @SubscribeMessage('join_room')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const room_id = data.room_id;
    const user_id = data.user_id;

    // Check if the user exists
    const user = await this.userService.getUserById(user_id);
    if (!user) {
      // If the user doesn't exist, return an error
      client.emit('error', {
        message: 'User not found',
      });
      return;
    }

    // Send a message to the room to notify that a player joined
    this.server.to(room_id).emit(RoomGateway.EVENT_PLAYER_JOINED, {
      user_id,
    });

    // Add the user to the room socket
    client.join(room_id);

    // Get the room
    const room = await this.roomService.getRoomPopulatedById(room_id);
    // Send the room information to the client
    client.emit(RoomGateway.EVENT_ROOM_INFO, room);
    // Add the user to the room
    await this.roomService.addUserToRoom(room_id, user);
  }
}
