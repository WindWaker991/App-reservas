import { MigrationInterface, QueryRunner } from "typeorm";

export class CityRelationships1685073373303 implements MigrationInterface {
    name = 'CityRelationships1685073373303'

    public async up(queryRunner: QueryRunner): Promise<void> {

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_3785318df310caf8cb8e1e37d85"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cityId"`);
    }

}
