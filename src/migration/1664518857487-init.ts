import { MigrationInterface, QueryRunner } from "typeorm";

export class init1664518857487 implements MigrationInterface {
    name = 'init1664518857487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "OrderDate" TIMESTAMP NOT NULL, "TotalAmount" integer NOT NULL, "customerIdId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "Qunatity" integer NOT NULL, "UnitPrice" integer NOT NULL, "productIdId" integer, "orderIdId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_92bb963a31edbbc5fc5e53ce87f" FOREIGN KEY ("customerIdId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_73056175b1a451dabc71361f737" FOREIGN KEY ("productIdId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517" FOREIGN KEY ("orderIdId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_06de9b4d54cfcc0a046e7542517"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_73056175b1a451dabc71361f737"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_92bb963a31edbbc5fc5e53ce87f"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
