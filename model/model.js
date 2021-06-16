import { Sequelize } from "sequelize";

//connecting to seqeulize
export const db = new Sequelize("sequalize", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});

//creating a model
const dataTypes = Sequelize.DataTypes
export const User = db.define("user", {
  name: dataTypes.STRING,
  email : dataTypes.STRING,
  password : dataTypes.STRING

});

export const Product = db.define("product", {
  name: { type: dataTypes.STRING, allowNull: false },
  description: { type: dataTypes.STRING, allowNull: false },
  imageUrl: { type: dataTypes.STRING, allowNull: false },
  price: { type: dataTypes.INTEGER, allowNull: false },
});


db.authenticate({})
  .then(() => console.log("db connected sucessfully"))
  .catch((err) => console.log(err));
