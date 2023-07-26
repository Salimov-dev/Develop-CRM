function getRandomInt(min, max) {
  return Math.round(Math.random() * (99 - 1) + 1);
}

function generateUserData() {
  return {
    image: `https://randomuser.me/api/portraits/women/${getRandomInt()}.jpg`,
  };
}

module.exports = {
  generateUserData,
};
