import { MigrationInterface, QueryRunner } from "typeorm";

export class init1664536475416 implements MigrationInterface {
    name = 'init1664536475416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "Qunatity" TO "Quantity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "Quantity" TO "Qunatity"`);
    }

}
