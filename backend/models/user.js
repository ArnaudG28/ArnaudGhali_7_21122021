// Version 2.0 creation du backend de l'application Groupomania

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', { 
    userID:{ 
        type:Sequelize.INTEGER.UNSIGNED, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    }, 
    pseudo: { 
      type: Sequelize.STRING, 
      allowNull:false,
      unique: true
    }, 
    email: { 
      type: Sequelize.STRING, 
      allowNull:false,
      unique: true
    }, 
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    picture: { 
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "admin",
    },
    dateCreation: Sequelize.DATE, 
    dateModification: Sequelize.DATE, 
}) 
  
    return User;
};