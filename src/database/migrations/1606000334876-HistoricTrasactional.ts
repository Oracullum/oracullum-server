import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class HistoricTrasactional1606000334876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "historic_transactionals",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "date",
            type: "date",
            isNullable: false,
          },
          {
            name: "operation",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "price",
            type: "numeric(9,2)",
            isNullable: false,
          },
          {
            name: "quantity",
            type: "numeric",
            isNullable: false,
          },
          {
            name: "exchange_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "Exchange_FK",
            columnNames: ["exchange_id"],
            referencedTableName: "exchanges",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("historic_transactionals");
  }
}
