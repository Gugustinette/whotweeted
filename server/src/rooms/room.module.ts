import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controller
import { RoomController } from './room.controller';

// Services
import { RoomService } from './room.service';
import { UserService } from '../users/user.service';
import { RoundService } from '../rounds/round.service';
import { TwitterService } from '../twitter/twitter.service';

// Models
import { Room, RoomSchema } from '../schemas/room.schema';
import { User, UserSchema } from '../schemas/user.schema';
import { Round, RoundSchema } from '../schemas/round.schema';

// Gateway
import { RoomGateway } from './room.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Round.name, schema: RoundSchema }]),
  ],
  controllers: [RoomController],
  providers: [
    RoomGateway,
    RoomService,
    UserService,
    RoundService,
    TwitterService,
  ],
})
export class RoomModule {}
