import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Exchange from "./Exchange";

@Entity('historic_transactionals')
class HistoricTransactional{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  operation: string;

  @Column('numeric', {
    precision: 9,
    scale: 2,
  })
  price: number;
    
  @Column()
  quantity: number;

  @Column()
  exchange_id: string;

  @ManyToOne(() => Exchange)
  @JoinColumn({ name: 'exchange_id' })
  exchange: Exchange;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default HistoricTransactional;