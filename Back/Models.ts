import { DataTypes } from "sequelize";
import db from "./Connection";

export const USER= db.define("USER", {
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
        type: DataTypes.TEXT,
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
})

export const PUBLICATION= db.define("PUBLICATION", {
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
        type: DataTypes.TIME,
    },
    PUBLICATION_STATE: {
        type: DataTypes.BOOLEAN,
    },
    PUBLICATION_QUANTITY: {
        type: DataTypes.INTEGER,
    },
})

export const COMMENTS= db.define("COMMENTS", {
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
})

export const IMAGES= db.define("IMAGES", {
    IMAGE_STR: {
        type: DataTypes.TEXT,
    }
})

export const KEYWORDS= db.define("KEYWORDS", {
    KEYWORDS_WORD: {
        type: DataTypes.STRING,
    }
})