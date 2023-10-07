"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closePublication = exports.updatePublication = exports.createPublication = exports.updateUser = exports.createUser = exports.str2hsh = void 0;
const Models = __importStar(require("../Back/Models"));
const uuid_1 = require("uuid");
//String Handling
function str2hsh(str) {
    let hash = 0;
    if (str.length == 0)
        return hash;
    str;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
}
exports.str2hsh = str2hsh;
//Classes: USER
function createUser(name, lastname, mail, password, photo, faculty, city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let usuario = yield Models.USR_MOD.findOrCreate({
                where: { USER_MAIL: mail },
                defaults: {
                    USER_ID: (0, uuid_1.v4)(),
                    USER_NAME: name,
                    USER_LASTNAME: lastname,
                    USER_MAIL: mail,
                    USER_PASSWORD: str2hsh(password),
                    USER_PHOTO: photo,
                    USER_FACULTY: faculty,
                    USER_CITY: city,
                    USER_CALIFICATION: 0,
                    USER_CALIFICATORS: 0,
                    USER_TOKEN: "0",
                    USER_SINCE: Date.now()
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    });
} // createUser("David", "Garcia", "davidgar@outlook.com", "12345678", "none", "Ingenieria", "Bogota")
exports.createUser = createUser;
function updateUser(uuid, password, name, lastname, photo, faculty, city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let usuario = yield findUser(uuid);
            if (str2hsh(password) == (usuario === null || usuario === void 0 ? void 0 : usuario.getDataValue("USER_PASSWORD"))) {
                console.log(name, faculty);
                usuario.set({
                    USER_NAME: name ? name : usuario.getDataValue("USER_NAME"),
                    USER_LASTNAME: lastname ? lastname : usuario.getDataValue("USER_LASTNAME"),
                    USER_PASSWORD: str2hsh(password),
                    USER_PHOTO: photo ? photo : usuario.getDataValue("USER_PHOTO"),
                    USER_FACULTY: faculty ? faculty : usuario.getDataValue("USER_FACULTY"),
                    USER_CITY: city ? city : usuario.getDataValue("USER_CITY"),
                });
                usuario.save();
            }
        }
        catch (error) {
            console.log(error);
        }
    });
} //updateUser("e67a6b85-ce46-49ef-a8da-57a2bb3ff1e2", "I-am-the-Knight08", "Bruno", "Diaz", undefined, undefined, "Palmira")
exports.updateUser = updateUser;
let findUser = function (uuid, mail) {
    return __awaiter(this, void 0, void 0, function* () {
        if (uuid) {
            const usuario = yield Models.USR_MOD.findByPk(uuid);
            return usuario;
        }
        else if (mail) {
            const usuario = yield Models.USR_MOD.findOne({ where: { USER_MAIL: mail } });
            return usuario;
        }
    });
};
//Classe: PUBLICATION
function createPublication(user_id, publication_title, publication_description, publication_price, publication_date, publication_state, publication_quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let usuario = yield Models.PUB_MOD.build({
                PUBLICATION_ID: (0, uuid_1.v4)(),
                USER_ID: user_id,
                PUBLICATION_TITLE: publication_title,
                PUBLICATION_DESCRIPTION: publication_description,
                PUBLICATION_PRICE: publication_price,
                PUBLICATION_DATE: Date.now(),
                PUBLICATION_STATE: publication_state,
                PUBLICATION_QUANTITY: publication_quantity,
            });
            usuario.save();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createPublication = createPublication;
function updatePublication(uuid, publication_title, publication_description, publication_price, publication_quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let publication = yield findPublication(uuid);
            publication === null || publication === void 0 ? void 0 : publication.set({
                PUBLICATION_TITLE: publication_title ? publication_title : publication.getDataValue("PUBLICATION_TITLE"),
                PUBLICATION_DESCRIPTION: publication_description ? publication_description : publication.getDataValue("PUBLICATION_DESCRIPTION"),
                PUBLICATION_PRICE: publication_price ? publication_price : publication.getDataValue("PUBLICATION_PRICE"),
                PUBLICATION_QUANTITY: publication_quantity ? publication_quantity : publication.getDataValue("PUBLICATION_QUANTITY"),
            });
            publication === null || publication === void 0 ? void 0 : publication.save();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.updatePublication = updatePublication;
function closePublication(uuid, state) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let publication = yield findUser(uuid);
            publication === null || publication === void 0 ? void 0 : publication.set({
                PUBLICATION_STATE: state
            });
            publication === null || publication === void 0 ? void 0 : publication.save();
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.closePublication = closePublication;
let findPublication = function (uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const publication = yield Models.PUB_MOD.findByPk(uuid);
        return publication;
    });
};
//# sourceMappingURL=Funcs.js.map