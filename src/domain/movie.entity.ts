import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  releaseDate?: string;

  @Column({ nullable: true })
  rating?: string;

  @Column()
  notes: string;
}
