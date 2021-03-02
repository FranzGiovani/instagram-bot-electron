const calculation = function  (size) {

    let base = 1000;

    let pageSize = size;
    let division = size / base;
    let round = Math.round(division)
    let rest = pageSize % base;
    let roundTotal = pageSize - rest;

    let calculation = [pageSize, division, round, rest, roundTotal]

    return calculation

}

module.exports = calculation;