function buildNum() {
  const str = String;

  const dateObj = new Date();
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  const hour = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();

  const stringVersion =
    str(year) + str(month) + str(day) + str(hour) + str(minutes) + str(seconds);
  const buildNum = Number(stringVersion);

  return buildNum;
}

module.exports = buildNum;
