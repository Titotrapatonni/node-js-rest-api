const jimp = require("jimp");

async function resizeAvatar(tempPath, resultPath) {
  const image = await jimp.read(tempPath);
  await image.cover(250, 250);
  await image.writeAsync(resultPath);
}

module.exports = resizeAvatar;
