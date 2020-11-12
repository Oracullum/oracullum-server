import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Exchange from "./Exchange";

@Entity('stocks')
class Stock{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;
   
  @OneToMany(() => Exchange, exchanges => exchanges.stock)
  exchanges: Exchange[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Stock;