import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Exchange from "./Exchange";
import User from "./User";

@Entity('stocks')
class Stock{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  exchange_id: string;
   
  @OneToOne(() => Exchange)
  @JoinColumn({ name: 'exchange_id' })
  exchanges: Exchange;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Stock;