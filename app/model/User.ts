import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users", // 指定表名
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "用户名",
  })
  user_name!: string;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4, // 自动生成 UUID
    comment: "用户id",
  })
  user_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "加密后的密码",
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: "会员类型",
  })
  membership_type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    comment: "电子邮件",
  })
  email!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: "会员到期日",
  })
  membership_expiry!: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    comment: "注册时间",
  })
  registration_date!: Date;
}

export default User;
