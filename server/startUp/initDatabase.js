// models
const User = require("../models/User");
const Object = require("../models/Object");
const ObjectStatus = require("../models/Object-status");
const Company = require("../models/Company");
const Metro = require("../models/Metro");
const District = require("../models/District");
const WorkingPosition = require("../models/Working-position");
// mock
const usersMock = require("../mock/users.json");
const objectsMock = require("../mock/objects.json");
const workingPositionsMock = require("../mock/working-positions.json");
const objectStatusMock = require("../mock/objects-status.json");
const companiesMock = require("../mock/companies.json");
const metrosMock = require("../mock/metro.json");
const districtsMock = require("../mock/districts.json");

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

  const companies = await Company.find();
  if (companies.length !== companiesMock.length) {
    await createInitialEntity(Company, companiesMock);
  }

  const metros = await Metro.find();
  if (metros.length !== metrosMock.length) {
    await createInitialEntity(Metro, metrosMock);
  }

  const districts = await District.find();
  if (districts.length !== districtsMock.length) {
    await createInitialEntity(District, districtsMock);
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
