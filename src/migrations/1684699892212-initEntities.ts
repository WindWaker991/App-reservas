import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntities1684699892212 implements MigrationInterface {
    name = 'InitEntities1684699892212'

    public async up(queryRunner: QueryRunner): Promise<void> {

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sector" DROP CONSTRAINT "FK_fb88277f5f60369dc64b568e568"`);
        await queryRunner.query(`ALTER TABLE "object" DROP CONSTRAINT "FK_de2300a2917dca8ed859035253e"`);
        await queryRunner.query(`DROP TABLE "institution"`);
        await queryRunner.query(`DROP TABLE "sector"`);
        await queryRunner.query(`DROP TABLE "object"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
