import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { mongooseSchemaConfig } from 'src/utils/schema.config';
import { v4 as uuidv4 } from 'uuid';

@Schema(mongooseSchemaConfig)
export class ReservationsEntity {
  @Prop({ type: String, default: uuidv4 })
  reservationUUID: string;

  @Prop()
  questName: string;

  @Prop()
  questEmail: string;

  @Prop()
  roomNumber: number;

  @Prop()
  checkOutDate: Date;

  @Prop()
  checkInDate: Date;
}

export const ReservationsSchema =
  SchemaFactory.createForClass(ReservationsEntity);
export type ReservationsDocument = ReservationsEntity & Document;
