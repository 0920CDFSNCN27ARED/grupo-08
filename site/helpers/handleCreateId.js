const handleCreateId = (arr) => {
    if (arr.length === 0) return 1;

    let lastIdNo = arr[arr.length - 1].id;
    return lastIdNo + 1;
};

module.exports = handleCreateId;