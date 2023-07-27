// models
const User = require("../models/User");
const Object = require("../models/Object");
const WorkingPosition = require("../models/Working-position");
const ObjectStatus = require("../models/Object-status");
const Company = require("../models/Company");
// mock
const usersMock = require("../mock/users.json");
const objectsMock = require("../mock/objects.json");
const workingPositionsMock = require("../mock/working-positions.json");
const objectStatusMock = require("../mock/objects-status.json");
const companiesMock = require("../mock/companies.json");

module.exports = async () => {
  const objects = await Object.find();
  if (objects.length !== objectsMock.length) {
    await createInitialEntity(Object, objectsMock);
  }

  const users = await User.find();
  if (users.length !== usersMock.length) {
    await createInitialEntity(User, usersMock);
  }

  const workingPositions = await WorkingPosition.find();
  if (workingPositions.length !== workingPositionsMock.length) {
    await createInitialEntity(WorkingPosition, workingPositionsMock);
  }

  const objectStatus = await ObjectStatus.find();
  if (objectStatus.length !== objectStatusMock.length) {
    await createInitialEntity(ObjectStatus, objectStatusMock);
  }

  const company = await Company.find();
  if (company.length !== companiesMock.length) {
    await createInitialEntity(Company, companiesMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
