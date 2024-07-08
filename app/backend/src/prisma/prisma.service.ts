/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class PrismaService extends PrismaClient {

    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.ENVIRONMENT === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
                },
            },
        });
    }

    // async onModuleInit() {
    //     await this.$connect();
    // }


}