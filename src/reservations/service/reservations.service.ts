import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import {
  ReservationsDocument,
  ReservationsEntity,
} from '../schema/reservations.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto } from '../dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(ReservationsEntity.name)
    private readonly reservationModel: Model<ReservationsDocument>,
  ) {}

  // Login user can ceate journal
  async createReservation(
    reservationDto: ReservationDto,
  ): Promise<ReservationsDocument> {
    try {
      const reservation = new this.reservationModel(reservationDto);

      await reservation.save();

      return reservation;
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException(
          'Duplicate entries are not allowed for email or room number!',
        );
      throw new BadRequestException(error.message);
    }
  }
}
