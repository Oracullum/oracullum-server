import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import ExchangeEnterprise from "./ExchangeEnterprise";
import HistoricTransactional from "./HistoricTransactional";

@Entity('exchanges')
class Exchange{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  exchange_enterprise_id: string;

  @ManyToOne(() => ExchangeEnterprise)
  @JoinColumn({ name: 'exchange_enterprise_id'})
  exchange: ExchangeEnterprise;

  @OneToMany(() => HistoricTransactional, historics => historics.exchange)
  historic_transactional: HistoricTransactional[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Exchange;