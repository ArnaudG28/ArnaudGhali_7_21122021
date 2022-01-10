// Version 2.0 creation du backend de l'application Groupomania

module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', { 
    postID:{ 
        type:Sequelize.INTEGER.UNSIGNED, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    }, 
    content: { 
      type: Sequelize.TEXT, 
      allowNull:false
    }, 
    picture: { 
      type: Sequelize.STRING
    }, 

    likes: {
      type:Sequelize.INTEGER,
      defaultValue: 0,
    },
    userID: {
      type:Sequelize.INTEGER,
    },
    dateCreation: Sequelize.DATE, 
    dateModification: Sequelize.DATE, 
}) 
    return Post;
};
