import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

// Room
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

// Models
import { Room, RoomSchema } from '../schemas/room.schema';
import { User, UserSchema } from '../schemas/user.schema';

describe('RoomController', () => {
  let roomController: RoomController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://db/whotweeted'),
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [RoomController],
      providers: [RoomService],
    }).compile();

    roomController = app.get<RoomController>(RoomController);
  });

  describe('root', () => {
    it('should return "Hello Room!"', () => {
      expect(roomController.getHello()).toBe('Hello Room!');
    });
  });
});
