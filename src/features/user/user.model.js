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
    type: "buyer",
  },
  {
    id: "4",
    name: "Buyer 2",
    email: "buyer2@gmail.com",
    password: "Buyer_2",
    type: "buyer",
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
    return foundUser;
  }
  static create(data) {
    const { name, email, password, type } = data;
    const newUser = new UserModel(name, email, password, type);
    users.push(newUser);
  }
  static update(id, data) {
    const index = users.find((user) => user.id === id);

    if (users[index]) {
      users[index].name = data.name;
      users[index].email = data.email;
      users[index].password = data.password;
      users[index].type = data.type;
    }
  }

  static login(data) {
    const { email } = data;
    const userFound = users.find((user) => user.email === email);
    return userFound;
  }
}
export default UserModel;
