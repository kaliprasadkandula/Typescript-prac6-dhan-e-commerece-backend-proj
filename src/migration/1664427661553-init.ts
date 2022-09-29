import { MigrationInterface, QueryRunner } from "typeorm";

export class init1664427661553 implements MigrationInterface {
    name = 'init1664427661553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "FirstName" character varying NOT NULL, "LastName" character varying NOT NULL, "City" character varying NOT NULL, "Country" character varying NOT NULL, "Phone" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplier" ("id" SERIAL NOT NULL, "CompanyName" character varying NOT NULL, "ContactName" character varying NOT NULL, "City" character varying NOT NULL, "Country" character varying NOT NULL, "Phone" character varying NOT NULL, "Fax" character varying NOT NULL, CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "ProductName" character varying NOT NULL, "UnitPrice" integer NOT NULL, "Package" character varying NOT NULL, "IsDiscontinued" character varying NOT NULL, "supplieridId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ed1113e1b120238499735df65e6" FOREIGN KEY ("supplieridId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ed1113e1b120238499735df65e6"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "supplier"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
