const { v4: uuidv4 } = require("uuid");

function generateShortUUID(length = 6) {
  const uuid = uuidv4().replace(/[^0-9]/g, "");
  const shortUUID = uuid.slice(0, length);
  return shortUUID;
}

module.exports = generateShortUUID;
