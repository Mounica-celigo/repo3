function add(b) {
    if (b)
        return b;
function add(a, b) {
    if (a && b)
        return a + b;
    return 0;
}

exports.add = add