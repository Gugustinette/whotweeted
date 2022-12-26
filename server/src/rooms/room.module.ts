import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { RoomController } from './room.controller';

// Services
import { RoomService } from './room.service';
import { UserService } from '../users/user.service';

// Models
import { Room, RoomSchema } from '../schemas/room.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RoomController],
  providers: [RoomService, UserService],
})
export class RoomModule {}
