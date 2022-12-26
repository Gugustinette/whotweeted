import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';

// Room module
import { RoomModule } from '../src/rooms/room.module';

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

  // Close the app
  afterAll(async () => {
    await app.close();
  });
});
