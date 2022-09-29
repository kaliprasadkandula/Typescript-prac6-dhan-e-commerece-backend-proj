import { Entity, PrimaryGeneratedColumn, Column ,BaseEntity, OneToMany} from "typeorm";
import { Product } from "./productEntity";

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  CompanyName: string;

  @Column()
  ContactName: string;

  @Column()
  City: string;

  @Column()
  Country: string;

  @Column()
  Phone: string;

  @Column()
  Fax: string;
  
  @OneToMany(()=>Product,(product)=>product,{cascade: true})
  products: Product[] 
}
