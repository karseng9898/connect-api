import { Module, Global } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { SocketService } from './events.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from 'src/entities';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Message])],
  providers: [EventsGateway, SocketService],
  exports: [SocketService],
})
export class EventsModule {}
