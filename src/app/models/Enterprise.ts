import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import ExchangeEnterprise from "./ExchangeEnterprise";

@Entity('enterprises')
class Enterprise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ExchangeEnterprise, exchange => exchange.enterprise )
  exchangeEnterprise: ExchangeEnterprise[];
  
  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Enterprise