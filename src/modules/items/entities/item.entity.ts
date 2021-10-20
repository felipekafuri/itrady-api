import { Prisma } from '@prisma/client';

export class Item implements Prisma.ItemUncheckedCreateInput {
  id?: string;
  title: string;
  description: string;
  thumbnail: string;
  purpose: string;
  owner_id: string;
  created_at: string | Date;
  updated_at: string | Date;
}
