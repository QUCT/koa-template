import { Sequelize } from "sequelize-typescript";
import config from "../config";
import path from "path";

const sequelize = new Sequelize(
  config.db.db_name as string,
  config.db.db_user as string,
  config.db.db_password as string,
  {
    host: config.db.db_host,
    port: config.db.db_port as unknown as number,
    dialect: "mysql",
    define: {
      timestamps: true,
      createdAt: "create_at",
      updatedAt: "update_at",
      deletedAt: "delete_at",
    },
    models: [
      path.join(__dirname, "..", "model/**/*.ts"),
      path.join(__dirname, "..", "model/**/*.js"),
    ],
  }
);

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully."); // 数据库链接测试
    sequelize.sync({ force: false });
    console.log("All models were synchronized successfully."); // 生成对应的表
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize };

export default db;
