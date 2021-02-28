function stringToArray(string) {
    return string.split(',').map((item) => {
        return parseFloat(item) ? parseFloat(item.trim()) : item.trim();
    });
}
module.exports = stringToArray;
