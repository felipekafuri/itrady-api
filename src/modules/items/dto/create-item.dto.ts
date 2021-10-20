import { Contains, IsEnum, IsString } from 'class-validator';

export enum PurposeTypes {
  DONATION = 'DONATION',
  TRADE = 'TRADE',
}

export class CreateItemDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  thumbnail: string;

  @IsEnum(PurposeTypes, {
    message: `purpose value should be a ${PurposeTypes.DONATION} or ${PurposeTypes.TRADE}`,
  })
  purpose: PurposeTypes;

  owner_id: string;
}
