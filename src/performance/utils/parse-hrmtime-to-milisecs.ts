export function parseHrtimeToMiliseconds(hrtime: [number, number]) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e6));
    return seconds;
}