import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";

export enum TransactionTypes {
  DEPOSITS = "deposit",
  WITHDRAW = "withdraw",
}

@Entity("transaction")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: TransactionTypes,
  })
  type: string;

  @Column({
    type: "numeric",
  })
  amount: number;

  @ManyToOne(() => Client, (clinet) => clinet.transactions)
  // we have the forin key here
  // forin key is on the many side !!
  @JoinColumn({
    name: "client_id",
  })
  client: Client;
}
