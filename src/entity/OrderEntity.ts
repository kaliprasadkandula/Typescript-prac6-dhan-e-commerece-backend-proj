import { OrderItem } from './OrderItemEntity';
import { Entity, PrimaryGeneratedColumn, Column ,BaseEntity, ManyToOne, JoinColumn, OneToOne, OneToMany} from "typeorm";
import { Customer } from "./customerEntity";
// import { Supplier } from "./supplierEntity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  OrderDate: Date;

  @Column()
  TotalAmount: number;

  @ManyToOne(()=>Customer,(customer)=>customer.orders)        
  CustomerId: Customer;

  @OneToMany(()=>OrderItem,(OrderItem)=>OrderItem.OrderId)
  OrderItems: OrderItem[]

  
 
}
 