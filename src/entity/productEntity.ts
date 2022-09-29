import { Entity, PrimaryGeneratedColumn, Column ,BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { Supplier } from "./supplierEntity";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ProductName: string;

  @Column()
  UnitPrice: number;

  @Column()        
  Package: string;

  @Column()
  IsDiscontinued: string;

  @ManyToOne(()=>Supplier,(supplier)=>supplier.products,{onDelete:"CASCADE"})
  @JoinColumn()  //because you want a column to be created
  Supplierid:Supplier
 
}
 