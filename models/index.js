const Profloss = require('./Profloss');
const User = require('./User');
User.hasMany(Profloss);
Profloss.belongsTo(User,{foreignKey:'id'});


module.exports = {
Profloss,User
};