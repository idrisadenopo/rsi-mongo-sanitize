"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
const sanitize = (input, allow) => {
    const rsiQueryList = ['$fields', '$expand', '$sortby', '$offset', '$limit', '$accessrights', '$id', '$spec'];
    const allowed = rsiQueryList.concat(allow ? allow : []);
    if (input instanceof Object) {
        for (const key in input) {
            if (/^\$/.test(key) && !allowed.includes(key)) {
                delete input[key];
            }
            else {
                exports.sanitize(input[key], allowed);
            }
        }
    }
    return input;
};
exports.sanitize = sanitize;
//# sourceMappingURL=index.js.map