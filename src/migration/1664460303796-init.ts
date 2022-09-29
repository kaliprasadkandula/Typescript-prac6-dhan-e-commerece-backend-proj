import { MigrationInterface, QueryRunner } from "typeorm";

export class init1664460303796 implements MigrationInterface {
    name = 'init1664460303796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ed1113e1b120238499735df65e6"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ed1113e1b120238499735df65e6" FOREIGN KEY ("supplieridId") REFERENCES "supplier"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ed1113e1b120238499735df65e6"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ed1113e1b120238499735df65e6" FOREIGN KEY ("supplieridId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
