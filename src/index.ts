export const sanitize = (input: any, allow?: string[]): any => {
    const rsiQueryList = ['$fields', '$expand', '$sortby', '$offset', '$limit', '$accessrights', '$id', '$spec'];
    const allowed = rsiQueryList.concat(allow? allow : []);
    if (input instanceof Object) {
        for (const key in input) {
            if (/^\$/.test(key) && !allowed.includes(key)) {
                delete input[key];                
            } else {
                sanitize(input[key], allowed);
            }
        }
    }
    return input;
}
