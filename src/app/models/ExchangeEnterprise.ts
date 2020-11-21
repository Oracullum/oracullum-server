import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Enterprise from "./Enterprise";

@Entity('exchanges_enterprises')
class ExchangeEnterprise{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  enterprise_id: string;

  @OneToOne(() => Enterprise)
  @JoinColumn({ name: 'enterprise_id'})
  enterprise: Enterprise;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default ExchangeEnterprise;