"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CAT_MOD = exports.CHT_MOD = exports.KYW_MOD = exports.IMG_MOD = exports.COM_MOD = exports.PUB_MOD = exports.USR_MOD = void 0;
const sequelize_1 = require("sequelize");
const Connection_1 = __importDefault(require("./Connection"));
exports.USR_MOD = Connection_1.default.define("USR_MOD", {
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
        type: sequelize_1.DataTypes.STRING,
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
exports.PUB_MOD = Connection_1.default.define("PUB_MOD", {
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
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'PUBLICATION'
});
exports.COM_MOD = Connection_1.default.define("COM_MOD", {
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
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'COMMENTS'
});
exports.IMG_MOD = Connection_1.default.define("IMG_MOD", {
    IMAGE_STR: {
        type: sequelize_1.DataTypes.TEXT,
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'IMAGES'
});
exports.KYW_MOD = Connection_1.default.define("KYW_MOD", {
    KEYWORDS_WORD: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'KEYWORDS'
});
exports.CHT_MOD = Connection_1.default.define("CHT_MOD", {
    CHAT_ID: {
        type: sequelize_1.DataTypes.STRING
    },
    PUBLICATION_ID: {
        type: sequelize_1.DataTypes.STRING
    },
    USER_1: {
        type: sequelize_1.DataTypes.STRING
    },
    USER_2: {
        type: sequelize_1.DataTypes.STRING
    },
    CHATS_SENDER: {
        type: sequelize_1.DataTypes.STRING
    },
    CHATS_MESSAGE: {
        type: sequelize_1.DataTypes.TEXT
    },
    CHAT_TIME: {
        type: sequelize_1.DataTypes.TIME
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'CHATS'
});
exports.CAT_MOD = Connection_1.default.define("CAT_MOD", {
    CATEGORY_ID: {
        type: sequelize_1.DataTypes.STRING
    },
    CATEGORY_NAME: {
        type: sequelize_1.DataTypes.STRING
    },
    CATEGORY_DESCRIPTION: {
        type: sequelize_1.DataTypes.TEXT
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'CATEGORY'
});
//# sourceMappingURL=Models.js.map