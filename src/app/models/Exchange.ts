import { Column, CreateDateColumn, Double, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Stock from "./Stock";


@Entity('exchanges')
class Exchange{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  operation: String;

  @Column('numeric', {
    precision: 9,
    scale: 2,
  })
  price: Double;
    
  @Column()
  quantity: number;

  @Column()
  stock_id: string;

  @ManyToOne(() => Stock, stock => stock.exchanges)
  stock: Stock;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Exchange;