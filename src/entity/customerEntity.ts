import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class customer extends BaseEntity {
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
}
