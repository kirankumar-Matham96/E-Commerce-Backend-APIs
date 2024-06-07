import { ApplicationError } from "../../errorHandler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

const users = [
  {
    id: "1",
    name: "Seller 1",
    email: "seller1@gmail.com",
    password: "Seller_1",
    type: "seller",
  },
  {
    id: "2",
    name: "Seller 2",
    email: "seller2@gmail.com",
    password: "Seller_2",
    type: "seller",
  },
  {
    id: "3",
    name: "Buyer 1",
    email: "buyer1@gmail.com",
    password: "Buyer_1",
    type: "customer",
  },
  {
    id: "4",
    name: "Buyer 2",
    email: "buyer2@gmail.com",
    password: "Buyer_2",
    type: "customer",
  },
];

class UserModel {
  constructor(name, email, password, type) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  static getAll() {
    return users;
  }

  static get(id) {
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
      throw new ApplicationError("user not found", 404);
    }
    return foundUser;
  }

  // static async create(data) {
  //   try {
  //     // get the data base
  //     const db = getDB("e-com-db");
  //     // get the collection
  //     const usersCollection = db.collection("users");

  //     const { name, email, password, type } = data;
  //     const newUser = new UserModel(name, email, password, type);

  //     // insert the document
  //     await usersCollection.insertOne(newUser);
  //     return newUser;

  //     // users.push(newUser);
  //   } catch (error) {
  //     throw new ApplicationError("Something went wrong", 500);
  //   }
  // }

  static update(id, data) {
    const index = users.findIndex((user) => user.id === id);

    if (users[index]) {
      users[index].name = data.name;
      users[index].email = data.email;
      users[index].password = data.password;
      users[index].type = data.type;
    }

    if (index == -1) {
      throw new ApplicationError("user not found", 404);
    }
  }

  // static login(data) {
  //   const { email, password } = data;
  //   const userFound = users.find((user) => user.email === email);
  //   if (!userFound) {
  //     throw new ApplicationError("user not found", 404);
  //   } else if (userFound.password !== password) {
  //     throw new ApplicationError("invalid credentials", 403);
  //   }

  //   return userFound;
  // }
}
export default UserModel;
