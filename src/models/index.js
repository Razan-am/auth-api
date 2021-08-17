'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const clothesModel = require('./clothesModel');
const foodModel = require('./foodModel');
const Collection = require('../data-collection');
const userModel = require('./userModel');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL || 'postgres://localhost:5432/lab8';

// const sequelize = new Sequelize(DATABASE_URL);

let sequelizeOptions = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
};

let sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};
