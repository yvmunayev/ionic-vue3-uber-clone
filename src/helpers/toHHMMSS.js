export default function toHHMMSS(secs) {
    var sec_num = parseInt(secs, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;

    return `${hours > 0 ? `${hours} hr` :  ''} ${minutes} min`;
}
