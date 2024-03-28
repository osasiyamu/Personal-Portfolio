const { Sequelize, DataTypes, Op } = require('sequelize');
const config = require('../../backend/config/config.json');

// Create a Sequelize instance using the configuration from config.json
const sequelize = new Sequelize('searchmeup', 'searchmeupAdmin', 'searchmeup', {
  host: 'searchmeup.c7q2q6o0q4j5.ca-central-1.rds.amazonaws.com',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
});

// Define the User model using sequelize.define
const User = sequelize.define('users', {
  userid: {
    type: DataTypes.INTEGER, // Assuming userid is an integer
    primaryKey: true, // Assuming userid is the primary key
    autoIncrement: true // Assuming userid is auto-incremented
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Assuming usernames are unique
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Assuming emails are unique
  }
}, {
  timestamps: false
});

const Profile = sequelize.define('profiles', {
  profileid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Assuming you have a 'User' model
      key: 'userid'
    }
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true // Set to true if occupation is optional
  }
});

module.exports = { sequelize, User: User, Profile: Profile, Op };
