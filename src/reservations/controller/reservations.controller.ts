import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReservationsService } from '../service/reservations.service';
import { ReservationDto, UpdateReservationDto } from '../dto/reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Create reservation
  @Post('create-reservation')
  async createReservation(@Body() reservationDto: ReservationDto) {
    return await this.reservationsService.createReservation(reservationDto);
  }

  // Get all reservations
  @Get('get-reservations')
  async getReservations() {
    return await this.reservationsService.getReservations();
  }

  // Get reservation
  @Get('get-reservation/:reservationUUID')
  async getReservation(@Param('reservationUUID') reservationUUID: string) {
    return await this.reservationsService.getReservation(reservationUUID);
  }

  // Update reservation
  @Patch('update-reservation/:reservationUUID')
  async updateReservation(
    @Body() updateReservationDto: UpdateReservationDto,
    @Param('reservationUUID') reservationUUID: string,
  ) {
    return await this.reservationsService.updateReservation(
      reservationUUID,
      updateReservationDto,
    );
  }

  // Delete reservation
  @Delete('delete-reservation/:reservationUUID')
  async deleteReservation(@Param('reservationUUID') reservationUUID: string) {
    return await this.reservationsService.deleteReservation(reservationUUID);
  }
}
