import { MigrationInterface, QueryRunner } from "typeorm";

export class InstitutionRelationships1685073637946 implements MigrationInterface {
    name = 'InstitutionRelationships1685073637946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" ADD "cityId" uuid`);
        await queryRunner.query(`ALTER TABLE "institution" ADD CONSTRAINT "FK_e5a41c16e4f91031eead1c9ce02" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "institution" DROP CONSTRAINT "FK_e5a41c16e4f91031eead1c9ce02"`);
        await queryRunner.query(`ALTER TABLE "institution" DROP COLUMN "cityId"`);
    }

}
