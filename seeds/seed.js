const sequelize = require('../config/connection');
const { User, Profloss } = require('../models');

const userData = require('./userData.json');
const proflossData = require('./proflossData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const profloss of proflossData){
      await Profloss.create({
          ...profloss
      })
  }
  process.exit(0);
};

seedDatabase();
