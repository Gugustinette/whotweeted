import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

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
  @WebSocketServer()
  server: Server;

  // Events Constants
  static readonly EVENT_JOIN_ROOM = 'join_room';
  static readonly EVENT_PLAYER_JOINED = 'player_joined';
  static readonly EVENT_PLAYERS_LIST = 'players_list';

  /**
   * Let a user join a room
   * @param {string} room_id - The room ID
   * @param {string} user_id - The user's ID
   * Return every players in the room
   * @returns {User[]} - The list of players in the room
   */
  @SubscribeMessage('join_room')
  joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const room_id = data.room_id;
    const user_id = data.user_id;

    // Join the room
    this.server.to(room_id).emit(RoomGateway.EVENT_PLAYER_JOINED, {
      user_id,
    });

    // Add the user to the room
    client.join(room_id);

    // Return the list of players in the room
    client.emit(RoomGateway.EVENT_PLAYERS_LIST, {
      user_id,
    });
  }
}
