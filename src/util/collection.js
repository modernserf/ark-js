export function updateIn (obj, pth, fn) {
    const [head, ...tail] = pth
    if (tail.length) {
        return { ...obj, [head]: updateIn(obj[head], tail, fn) }
    }
    return { ...obj, [head]: fn(obj[head]) }
}
