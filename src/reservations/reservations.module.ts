import { Module } from '@nestjs/common';
import { ReservationsService } from './service/reservations.service';
import { ReservationsController } from './controller/reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ReservationsEntity,
  ReservationsSchema,
} from './schema/reservations.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ReservationsEntity.name,
        useFactory: () => {
          return ReservationsSchema;
        },
      },
    ]),
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
