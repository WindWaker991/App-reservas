import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1685927477653 implements MigrationInterface {
    name = 'UpdateUser1685927477653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`);
    }

}
