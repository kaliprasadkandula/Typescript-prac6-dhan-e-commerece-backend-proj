import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Order } from "./OrderEntity";
import { Product } from "./productEntity";

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Quantity: number;

  @Column()
  UnitPrice: number;

  @ManyToOne(() => Product, (product) => product)
  ProductId: Product;

  @ManyToOne(() => Order, (order) => order.OrderItems,{onDelete:"CASCADE"})
  OrderId: Order;
 
}
