import { MigrationInterface, QueryRunner } from "typeorm";

export class InitEntities1684699892212 implements MigrationInterface {
    name = 'InitEntities1684699892212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "object" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" integer NOT NULL, "sectorId" uuid, CONSTRAINT "PK_663a4b1f68bb085286e638a38f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sector" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "institutionId" uuid, CONSTRAINT "PK_668b2ea8a2f534425407732f3ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "institution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_f60ee4ff0719b7df54830b39087" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "object" ADD CONSTRAINT "FK_de2300a2917dca8ed859035253e" FOREIGN KEY ("sectorId") REFERENCES "sector"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sector" ADD CONSTRAINT "FK_fb88277f5f60369dc64b568e568" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
