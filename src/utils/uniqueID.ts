// https://gist.github.com/gordonbrander/2230317#gistcomment-1618310
export default function uniqueID() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return (
    chr4() +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    '-' +
    chr4() +
    chr4() +
    chr4()
  );
}
