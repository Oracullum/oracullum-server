import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExchange1604542341779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "exchanges",
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
            name: "quantity",
            type: "numeric",
            isNullable: false,
          },
          {
            name: "operation",
            type: "varchar",
          },
          {
            name: "stock_id",
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
            name: "stock_FK",
            columnNames: ["stock_id"],
            referencedTableName: "stocks",
            referencedColumnNames: ["id"],
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("exchanges");
  }
}
