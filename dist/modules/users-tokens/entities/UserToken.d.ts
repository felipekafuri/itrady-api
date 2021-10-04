import { Prisma } from '@prisma/client';
export declare class UserToken implements Prisma.UserTokenUncheckedCreateInput {
    id?: string;
    userId: string;
    token?: string;
    expires: string | Date;
    created_at: string | Date;
}
