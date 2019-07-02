function responseStatusParser(res, result) {
    if (Object.keys(result).includes("error")) {
        res.status(404)
    } else {
        res.status(200)
    }
}

module.exports = { responseStatusParser }