const sequelize = require('../config/connection');
const { User, Category, Profloss } = require('../models');

const userData = require('./userData.json');
const categoryData = require('./categoryData.json');
const proflossData = require('./proflossData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const category of categoryData) {
    await Category.create({
      ...category
    });
  }
  for (const profloss of proflossData){
      await Profloss.create({
          ...profloss
      })
  }
  process.exit(0);
};

seedDatabase();
