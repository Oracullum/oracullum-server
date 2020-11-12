import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class UpdateExchangeCreateColumnPrice1605144343981 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'exchanges',
            new TableColumn({
              name: 'price',
              type: 'numeric (9, 2)',
              isNullable: false,
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('exchanges', 'price');
    }

}
