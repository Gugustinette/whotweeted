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
// Round Service
import { RoundService } from '../rounds/round.service';

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
    private readonly roundService: RoundService,
  ) {}

  @WebSocketServer()
  server: Server;

  /**
   * Event Constants
   */
  // Setup
  static readonly EVENT_JOIN_ROOM = 'join_room';
  static readonly EVENT_PLAYER_JOINED = 'player_joined';
  static readonly EVENT_ROOM_INFO = 'room_info';
  // Game initialization
  static readonly EVENT_START_GAME = 'start_game';
  static readonly EVENT_GAME_STARTED = 'game_started';
  static readonly EVENT_NEW_ROUND = 'new_round';
  // Game
  static readonly EVENT_ANSWER_ROUND = 'answer_round';
  static readonly EVENT_ROUND_ENDED = 'round_ended';
  static readonly EVENT_GAME_ENDED = 'game_ended';

  /**
   * Let a user join a room
   * @param {string} room_id - The room ID
   * @param {string} user_id - The user's ID
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

  /**
   * Let a user start a game
   * @param {string} room_id - The room ID
   * @param {string} user_id - The user's ID
   */
  @SubscribeMessage('start_game')
  async startGame(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const room_id = data.room_id;
    const user_id = data.user_id;

    // Get the room
    const room = await this.roomService.getRoomPopulatedById(room_id);
    // Check if the user is the master
    if (room.master._id != user_id) {
      // If the user is not the master, return an error
      client.emit('error', {
        message: 'You are not the master',
      });
      return;
    }

    // Start the game
    await this.roomService.launchGame(room_id);
    // Get the room
    const updatedRoom = await this.roomService.getRoomPopulatedById(room_id);
    // Send the room information to the client
    client.emit(RoomGateway.EVENT_GAME_STARTED, updatedRoom);

    // Generate the rounds
    const rounds = await this.roundService.generateRounds(
      updatedRoom.id_twitter_users,
      updatedRoom.nb_max_round,
    );
    // Associate the rounds to the room
    updatedRoom.rounds = rounds;
    updatedRoom.actual_round = rounds[0];
    // Save the room
    await updatedRoom.save();

    // Send the first round to the players
    this.server.to(room_id).emit(RoomGateway.EVENT_NEW_ROUND, {
      round: {
        _id: updatedRoom.actual_round._id,
        tweet: {
          text: updatedRoom.actual_round.tweet.text,
        },
      },
    });
  }

  /**
   * Let a user answer a round
   * @param {string} room_id - The room ID
   * @param {string} user_id - The user's ID
   * @param {string} answer - The answer
   */
  @SubscribeMessage('answer_round')
  async answerRound(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    const room_id = data.room_id;
    const user_id = data.user_id;
    const answer = data.answer;

    // Get the room
    const room = await this.roomService.getRoomPopulatedById(room_id);
    // Check if the user is in the room
    if (!room.players.find((user) => user._id == user_id)) {
      // If the user is not in the room, return an error
      client.emit('error', {
        message: 'You are not in the room',
      });
      return;
    }

    // Check if the user already answered the round
    if (room.actual_round.player_responses[user_id]) {
      // If the user already answered the round, return an error
      client.emit('error', {
        message: 'You already answered the round',
      });
      return;
    }

    // Answer the round
    const updatedRoom = await this.roomService.answerRound(
      room_id,
      user_id,
      answer,
    );

    // Check if the round is finished
    if (updatedRoom.actual_round == null) {
      // If the round is finished, send the round ended event
      this.server.to(room_id).emit(RoomGateway.EVENT_ROUND_ENDED, {
        room: updatedRoom,
      });
      return;
    }

    // Check if the game is finished
    if (updatedRoom.status == 'finished') {
      // If the game is finished, send the game ended event
      this.server.to(room_id).emit(RoomGateway.EVENT_GAME_ENDED, {
        room: updatedRoom,
      });
      return;
    }
  }
}
