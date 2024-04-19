import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1713494402229 implements MigrationInterface {
    name = 'Default1713494402229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subjects" ADD "description" text`);
    }

}
