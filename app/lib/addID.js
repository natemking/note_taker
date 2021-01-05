const addID = (data) => {
    for (let i = 0; i < data.length; i++) {
        data[i].id = i + 1;
    }
}

module.exports = addID;