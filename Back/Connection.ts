import {Sequelize} from "sequelize";

const db= new Sequelize("anunciate", "admin", "password123", {
    host: "database-anunciate.cxb0q5syzehq.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
});
export default db;