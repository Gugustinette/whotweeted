import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Import all modules
 */
// Rooms
import { RoomModule } from './rooms/room.module';
// Users
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://db/whotweeted'),
    RoomModule,
    UserModule,
  ],
})
export class AppModule {}
