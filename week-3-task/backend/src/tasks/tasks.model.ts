import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model {
  @Column({ allowNull: false, type: 'string' })
  task: string;

  @Column({ defaultValue: false })
  completed: boolean;

  @Column('string')
  description?: string;

  @Column({ defaultValue: new Date() })
  createdAt?: Date;
}
