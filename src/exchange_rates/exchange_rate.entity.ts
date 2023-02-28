import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ExchangeRate {
  @AutoMap()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @AutoMap()
  @Column({ unique: true })
  source: string;

  @AutoMap()
  @Column({
    type: 'float',
  })
  rate: number;
}
