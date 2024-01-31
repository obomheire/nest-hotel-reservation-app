import { Body, Controller, Post } from '@nestjs/common';
import { ReservationsService } from '../service/reservations.service';
import { ReservationDto } from '../dto/reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Login user can ceate journal
  @Post('create-reservation')
  async createReservation(@Body() reservationDto: ReservationDto) {
    return await this.reservationsService.createReservation(reservationDto);
  }
}
