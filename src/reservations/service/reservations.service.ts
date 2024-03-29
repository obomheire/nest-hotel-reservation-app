import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ReservationsDocument,
  ReservationsEntity,
} from '../schema/reservations.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDto, UpdateReservationDto } from '../dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(ReservationsEntity.name)
    private readonly reservationModel: Model<ReservationsDocument>,
  ) {}

  // Create reservation
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

  // Get all reservations
  async getReservations(): Promise<ReservationsDocument[]> {
    try {
      const reservations = await this.reservationModel.find({});

      return reservations;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get reservation
  async getReservation(reservationUUID: string): Promise<ReservationsDocument> {
    try {
      const reservation = await this.reservationModel.findOne({
        reservationUUID,
      });

      if (!reservation) throw new NotFoundException('Reservation not found!');

      return reservation;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Update reservation
  async updateReservation(
    reservationUUID: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationsDocument> {
    try {
      const updateReservation = await this.reservationModel
        .findOneAndUpdate(
          {
            reservationUUID,
          },
          updateReservationDto,
          { new: true },
        )
        .exec();

      if (!updateReservation)
        throw new NotFoundException('Reservation not found');

      return updateReservation;
    } catch (error) {
      if (error.code === 11000)
        throw new ConflictException(
          'Duplicate entries are not allowed for email or room number!',
        );
      throw new BadRequestException(error.message);
    }
  }

  // Delete reservation
  async deleteReservation(
    reservationUUID: string,
  ): Promise<ReservationsDocument> {
    try {
      const reservation = await this.reservationModel.findOne({
        reservationUUID,
      });

      if (!reservation) throw new NotFoundException('Reservation not found!');

      await reservation.deleteOne();

      return reservation;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
