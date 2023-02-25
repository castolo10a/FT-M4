
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Character', {
      code: {
         type: DataTypes.STRING(5),
         primaryKey: true,
         allowNull: false,
         validate:{
            isnotHenry(value){
               if(value.toLowerCase() === 'henry'){
                  throw new Error('is henry')
               }
            }
         }
      },
      name:{
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate:{
            notIn: [['Henry', 'SoyHenry', 'Soy Henry']]
         }
      },
      age:{
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      race:{
         type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
         defaultValue: 'Other',
         allowNull: false,
      },
      hp:{
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      mana:{
         type: DataTypes.FLOAT,
         allowNull: false,
      },
      date_added:{
         type: DataTypes.DATEONLY,
         defaultValue: DataTypes.NOW
      }
   },{
      timestamps: false,
   });
};
