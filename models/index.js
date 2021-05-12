const Profloss = require('./Profloss');
const User = require('./User');
User.hasMany(Profloss);
Profloss.belongsTo(User,{foreignKey:'id'});
// Profloss.belongsTo(Category,{foreignKey:'id'});
// Category.hasMany(Profloss);

module.exports = {
Profloss,User
};