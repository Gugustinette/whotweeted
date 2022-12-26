import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Import all modules
 */
// Rooms
import { RoomModule } from './rooms/room.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://db/nest'), RoomModule],
})
export class AppModule {}
