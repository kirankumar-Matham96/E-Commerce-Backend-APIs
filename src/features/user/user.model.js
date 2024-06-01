import { v4 as uuidv4 } from "uuid";

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
    this.id = uuidv4();
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
      throw new Error("user not found");
    }
    return foundUser;
  }

  static create(data) {
    const { name, email, password, type } = data;
    const newUser = new UserModel(name, email, password, type);
    users.push(newUser);
  }

  static update(id, data) {
    const index = users.findIndex((user) => user.id === id);

    if (users[index]) {
      users[index].name = data.name;
      users[index].email = data.email;
      users[index].password = data.password;
      users[index].type = data.type;
    }

    if (index == -1) {
      throw new Error("user not found");
    }
  }

  static login(data) {
    const { email, password } = data;
    const userFound = users.find((user) => user.email === email);
    if (!userFound) {
      throw new Error("user not found");
    } else if (userFound.password !== password) {
      throw new Error("invalid credentials");
    }

    return userFound;
  }
}
export default UserModel;
