export function parseHrtimeToSeconds(hrtime: [number, number]) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9));
    return seconds;
}