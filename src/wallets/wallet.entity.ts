import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ unique: true })
  address: string;

  @AutoMap()
  @Column({ default: false })
  favorite: boolean;
}
