function decamel(str) {
    return (
        (typeof str === "string" &&
            str.replace(/[A-Z0-9]/g, function(c, i) {
                return (i ? "-" : "") + c.toLowerCase();
            })) ||
        null
    );
}

export default function(obj) {
    var str = "";
    for (var key in obj) {
        if (!["cols"].includes(key)) {
            var val = typeof obj[key] === "number" && !["flex", "order", "zIndex", "fontWeight"].includes(key) ? obj[key] + "px" : obj[key];
            str += `${decamel(key)}: ${val};`;
        }
    }
    return str;
}