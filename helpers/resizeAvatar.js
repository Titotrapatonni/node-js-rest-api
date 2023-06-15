const jimp = require("jimp");

async function resizeAvatar(tempPath, resultPath) {
  const image = await jimp.read(tempPath);
  await image.resize(250, jimp.AUTO);
  await image.writeAsync(resultPath);
}

module.exports = resizeAvatar;
