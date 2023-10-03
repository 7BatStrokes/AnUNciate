"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEYWORDS = exports.IMAGES = exports.COMMENTS = exports.PUBLICATION = exports.usuario = void 0;
const sequelize_1 = require("sequelize");
const Connection_1 = __importDefault(require("./Connection"));
exports.usuario = Connection_1.default.define("usuario", {
    USER_ID: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    USER_NAME: {
        type: sequelize_1.DataTypes.STRING,
    },
    USER_LASTNAME: {
        type: sequelize_1.DataTypes.STRING,
    },
    USER_MAIL: {
        type: sequelize_1.DataTypes.STRING,
    },
    USER_PASSWORD: {
        type: sequelize_1.DataTypes.TEXT,
    },
    USER_PHOTO: {
        type: sequelize_1.DataTypes.TEXT,
    },
    USER_FACULTY: {
        type: sequelize_1.DataTypes.STRING,
    },
    USER_CITY: {
        type: sequelize_1.DataTypes.STRING,
    },
    USER_CALIFICATION: {
        type: sequelize_1.DataTypes.FLOAT,
    },
    USER_CALIFICATORS: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    USER_SINCE: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'USER'
});
exports.PUBLICATION = Connection_1.default.define("PUBLICATION", {
    USER_ID: {
        type: sequelize_1.DataTypes.STRING,
    },
    PUBLICATION_TITLE: {
        type: sequelize_1.DataTypes.STRING,
    },
    PUBLICATION_DESCRIPTION: {
        type: sequelize_1.DataTypes.STRING,
    },
    PUBLICATION_PRICE: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    PUBLICATION_DATE: {
        type: sequelize_1.DataTypes.TIME,
    },
    PUBLICATION_STATE: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    PUBLICATION_QUANTITY: {
        type: sequelize_1.DataTypes.INTEGER,
    },
});
exports.COMMENTS = Connection_1.default.define("COMMENTS", {
    USER_ID: {
        type: sequelize_1.DataTypes.STRING,
    },
    PUBLICATION_ID: {
        type: sequelize_1.DataTypes.STRING,
    },
    COMMENT_TEXT: {
        type: sequelize_1.DataTypes.TEXT,
    },
    COMMENT_DATE: {
        type: sequelize_1.DataTypes.TIME,
    }
});
exports.IMAGES = Connection_1.default.define("IMAGES", {
    IMAGE_STR: {
        type: sequelize_1.DataTypes.TEXT,
    }
});
exports.KEYWORDS = Connection_1.default.define("KEYWORDS", {
    KEYWORDS_WORD: {
        type: sequelize_1.DataTypes.STRING,
    }
});
//# sourceMappingURL=Models.js.map