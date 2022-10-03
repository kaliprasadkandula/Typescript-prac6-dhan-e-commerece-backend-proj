import { MigrationInterface, QueryRunner } from "typeorm";

export class migname1664770652531 implements MigrationInterface {
    name = 'migname1664770652531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517" FOREIGN KEY ("orderIdId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517" FOREIGN KEY ("orderIdId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
