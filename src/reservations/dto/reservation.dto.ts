import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsNumber,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
export class ReservationDto {
  @IsString()
  @IsNotEmpty()
  guestName: string;

  @IsEmail()
  @IsNotEmpty()
  guestEmail: string;

  @IsNumber()
  @IsNotEmpty()
  roomNumber: number;

  @IsDateString()
  @IsNotEmpty()
  checkInDate: Date;

  @IsDateString()
  @IsNotEmpty()
  checkOutDate: Date;
}

export class UpdateReservationDto extends PartialType(ReservationDto) {}
