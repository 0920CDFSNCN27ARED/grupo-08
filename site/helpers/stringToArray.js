function stringToArray(string) {
    if (string.length == 0) {
        return [];
    }
    return string.split(',').map((item) => {
        return parseFloat(item) ? parseFloat(item.trim()) : item.trim();
    });
}
module.exports = stringToArray;
