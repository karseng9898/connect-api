import {
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { SocketService } from './events.service';

// Client connect url: ws://localhost:3001 { transport = websocket }
@WebSocketGateway(3001)
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');

  afterInit(server: Server) {
    this.socketService.socket = server;
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(
      `Client disconnected (${
        Object.keys(this.server.sockets.sockets).length
      }): ${client.id}`,
    );
  }

  handleConnection(client: Socket) {
    this.logger.log(
      `Client connected (${Object.keys(this.server.sockets.sockets).length}): ${
        client.id
      }`,
    );
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} join to room (${room})`);
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    this.logger.log(`Client ${client.id} leave room (${room})`);
    client.leave(room);
  }
}
