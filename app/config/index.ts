const config = {
  server: {
    port: process.env.SERVER_PORT,
  },
  db: {
    // 数据库相关
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_user: process.env.DB_USER,
    db_port: process.env.DB_PORT,
    db_password: process.env.DB_PWD,
    db_debug: process.env.DB_DEBUG,
  },
};

export default config;
