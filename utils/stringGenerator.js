const stringGenerator = (legnth = 32) => {
  let text = "";
  let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < legnth; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
};

module.exports = {
  stringGenerator,
};
