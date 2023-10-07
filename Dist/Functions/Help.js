"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Help(str) {
    let list_of_Funcs = ["str2hsh"];
    let func;
    if (str == "all") {
        return (console.log(list_of_Funcs));
    }
    else if (str == "str2hsh") {
        func = "Turns String into Hash";
        return (console.log(func));
    }
}
exports.default = Help;
//# sourceMappingURL=Help.js.map