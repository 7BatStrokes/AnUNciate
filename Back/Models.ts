import { DataTypes } from "sequelize";
import Multer from "multer";
import db from "./Connection";
import { Storage } from "@google-cloud/storage";

export const USR_MOD= db.define("USR_MOD", {
    USER_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    USER_NAME: {
        type: DataTypes.STRING,
    },
    USER_LASTNAME: {
        type: DataTypes.STRING,
    },
    USER_MAIL: {
        type: DataTypes.STRING,
    },
    USER_PASSWORD: {
        type: DataTypes.STRING,
    },
    USER_PHOTO: {
        type: DataTypes.TEXT,
    },
    USER_FACULTY: {
        type: DataTypes.STRING,
    },
    USER_CITY: {
        type: DataTypes.STRING,
    },
    USER_CALIFICATION: {
        type: DataTypes.FLOAT,
    },
    USER_CALIFICATORS: {
        type: DataTypes.INTEGER,
    },
    USER_SINCE: {
        type: DataTypes.DATE,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'USERS'
  })

export const PUB_MOD= db.define("PUB_MOD", {
    PUBLICATION_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    USER_ID: {
        type: DataTypes.STRING,
    },
    PUBLICATION_TITLE: {
        type: DataTypes.STRING,
    },
    PUBLICATION_DESCRIPTION: {
        type: DataTypes.STRING,
    },
    PUBLICATION_PRICE: {
        type: DataTypes.INTEGER,
    },
    PUBLICATION_DATE: {
        type: DataTypes.DATE,
    },
    PUBLICATION_STATE: {
        type: DataTypes.TINYINT,
    },
    PUBLICATION_QUANTITY: {
        type: DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'PUBLICATIONS'
  })

export const COM_MOD= db.define("COM_MOD", {
    COMMENT_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    USER_ID: {
        type: DataTypes.STRING,
    },
    PUBLICATION_ID: {
        type: DataTypes.STRING,
    },
    COMMENT_TEXT: {
        type: DataTypes.TEXT,
    },
    COMMENT_DATE: {
        type: DataTypes.TIME,
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'COMMENTS'
  })

export const IMG_MOD= db.define("IMG_MOD", {
    IMAGE_ID: {
        type: DataTypes.TEXT,
        primaryKey: true
    },
    IMAGE_STR: {
        type: DataTypes.TEXT,
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'IMAGES'
  })

export const KYW_MOD= db.define("KYW_MOD", {
    KEYWORDS_WORD: {
        type: DataTypes.STRING,
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'KEYWORDS'
  })

export const CHT_MOD= db.define("CHT_MOD", {
    CHAT_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    PUBLICATION_ID: {
        type: DataTypes.STRING
    },
    USER_1: {
        type: DataTypes.STRING
    },
    USER_2: {
        type: DataTypes.STRING
    },
    CHATS_SENDER: {
        type: DataTypes.STRING
    },
    CHATS_MESSAGE: {
        type: DataTypes.TEXT
    },
    CHAT_TIME: {
        type: DataTypes.TIME
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'CHATS'
  });

export const CAT_MOD= db.define("CAT_MOD", {
    CATEGORY_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    CATEGORY_NAME: {
        type: DataTypes.STRING
    },
    CATEGORY_DESCRIPTION: {
        type: DataTypes.TEXT
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'CATEGORY'
  })

//Relations
export const RPI_MOD= db.define("RPI_MOD", {
    PUBLICATION_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    IMAGE_ID: {
        type: DataTypes.STRING,
        primaryKey: true
    }
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    tableName: 'REL_PUBLICATION_IMAGES'
  })


const projectId = "spatial-cargo-324302"; // Get this from Google Cloud
const keyFilename = "spatial-cargo-324302-594267ec6279.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
    projectId,
    keyFilename,
  });
export const bucket = storage.bucket("img-anunciate");

export const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 2000 * 2000
    },
  });