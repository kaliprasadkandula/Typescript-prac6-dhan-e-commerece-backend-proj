import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from "typeorm";
import { Order } from "./OrderEntity";

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  City: string;

  @Column()
  Country: string;

  @Column()
  Phone: string;

  @OneToMany(()=>Order,(order)=>order.CustomerId,{cascade: true,onDelete:"CASCADE"})
  @JoinColumn()
  orders:Order[]
}
