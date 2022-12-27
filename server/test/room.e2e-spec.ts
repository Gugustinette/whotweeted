import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
// Socket.io for testing WebSockets connections
import * as io from 'socket.io-client';
import { IoAdapter } from '@nestjs/platform-socket.io';

// Room module
import { RoomModule } from '../src/rooms/room.module';
import { RoomGateway } from '../src/rooms/room.gateway';

// Models
import { RoomSchema } from '../src/schemas/room.schema';
import { UserSchema } from '../src/schemas/user.schema';

describe('Rooms', () => {
  let app: INestApplication;

  // Intialize the app
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        RoomModule,
        MongooseModule.forRoot('mongodb://localhost:27017/whotweeted'),
        MongooseModule.forFeature([
          { name: 'Room', schema: RoomSchema },
          { name: 'User', schema: UserSchema },
        ]),
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useWebSocketAdapter(new IoAdapter(app));
    app.listen(8999);
    await app.init();
  });

  // Test the creation of a room
  it(`/POST create room`, () => {
    const response = request(app.getHttpServer())
      .post('/room/create')
      .send({ username: 'test' })
      .expect(201);

    return response.then((res) => {
      // Check if the response has the correct properties
      expect(res.body).toHaveProperty('room_id');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('_id');
      expect(res.body.user).toHaveProperty('username');
      expect(res.body.user).toHaveProperty('url_pp');

      // User properties
      expect(res.body.user.username).toBe('test');
      expect(res.body.user.url_pp).toBe(''); // Default value

      // Room ID
      expect(res.body.room_id).toHaveLength(24);
      expect(res.body.room_id).toMatch(/^[0-9a-fA-F]{24}$/);
    });
  });

  // Test the join of a room via WebSockets
  it(`/WS join room`, (done) => {
    const response = request(app.getHttpServer())
      .post('/room/create')
      .send({ username: 'test' })
      .expect(201);

    response.then((res) => {
      // Connect to the room via WebSockets
      const socket = io.connect(`ws://localhost:8999`, {
        transports: ['websocket'],
        forceNew: true,
      });

      // Check if the connection is successful
      socket.on('connect', () => {
        // Join the room
        socket.emit(RoomGateway.EVENT_JOIN_ROOM, {
          room_id: res.body.room_id,
          user_id: res.body.user._id,
        });
      });

      // Receive the list of players in the room
      socket.on(RoomGateway.EVENT_PLAYERS_LIST, (data) => {
        // Check if the response has the correct properties
        expect(data).toHaveProperty('user_id');
        expect(data.user_id).toHaveLength(24);
        expect(data.user_id).toMatch(/^[0-9a-fA-F]{24}$/);
        // Disconnect the socket
        socket.disconnect();
      });

      // Disconnect the socket
      socket.on('disconnect', () => {
        done();
      });

      socket.connect();
    });
  });

  // Close the app
  afterAll(async () => {
    await app.close();
  });
});
