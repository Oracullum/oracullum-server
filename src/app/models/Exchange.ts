import { Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Stock from "./Stock";


@Entity('exchanges')
class Exchange{
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
  stock_id: string;

  @ManyToOne(() => Stock)
  @JoinColumn({ name: 'stock_id' })
  stock: Stock;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Exchange;