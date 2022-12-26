import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://db/nest')],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
