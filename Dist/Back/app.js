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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Server_1 = __importDefault(require("./Server"));
const Help_1 = __importDefault(require("../Functions/Help"));
const Funcs = __importStar(require("../Functions/Funcs"));
dotenv_1.default.config();
const serv = new Server_1.default();
serv.listen();
console.log("Check");
(0, Help_1.default)("str2hsh");
try {
    Funcs.createUser("David", "Garcia", "davidgar@outlook.com", "12345678", "none", "Ingenieria", "Bogota");
    Funcs.updateUser("e67a6b85-ce46-49ef-a8da-57a2bb3ff1e2", "I-am-the-Knight08", "Bruno", "Diaz", undefined, undefined, "Palmira");
}
catch (error) {
    console.log(error);
}
//# sourceMappingURL=app.js.map