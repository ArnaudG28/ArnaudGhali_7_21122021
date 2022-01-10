// Version 2.0 creation du backend de l'application Groupomania

module.exports = (sequelize, Sequelize) => {
    const comment = sequelize.define('comment', { 
    commentID:{ 
          type:Sequelize.INTEGER, 
          autoIncrement:true, 
          allowNull:false, 
          primaryKey:true
      }, 
      comment: { 
        type: Sequelize.TEXT, 
        allowNull:false
      }, 
      likes: {
        type:Sequelize.BOOLEAN,
        defaultValue: false,
      },
      userID: {
        type:Sequelize.INTEGER,
      },
      postID: {
        type:Sequelize.INTEGER,
      },
      dateCreation: Sequelize.DATE, 
      dateModification: Sequelize.DATE, 
  }) 
    
      return comment;
  };