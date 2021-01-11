function replaceAllPolyfill(string) {
    const replaceAll = (str, oldStr, newStr) => str.split(oldStr).join(newStr);
    let str = replaceAll(string, ' ', '_').toLowerCase();

    return str;
}

function formatString(str) {
    return replaceAllPolyfill(
        str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
    );
}

module.exports = formatString;
