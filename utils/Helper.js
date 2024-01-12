export function removeCurrency(arr) {
    return arr.map(s => s.slice(1))
}

export function getNumberArray(stringArray) {
    return stringArray.map(Number)
}

export function sortArrayAsc(array) {
    return array.toSorted(function (a, b) { return a - b })
}

export function sortArrayDesc(array) {
    return array.toSorted(function (a, b) { return b - a })
}