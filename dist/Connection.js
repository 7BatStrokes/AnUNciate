"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("anunciate", "admin", "password123", {
    host: "database-anunciate.cxb0q5syzehq.us-east-2.rds.amazonaws.com",
    dialect: "mysql",
});
exports.default = db;
//# sourceMappingURL=Connection.js.map