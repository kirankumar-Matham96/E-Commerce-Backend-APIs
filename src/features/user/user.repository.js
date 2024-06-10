import { ApplicationError } from "../../errorHandler/applicationError.js";
import { getDB } from "../../config/mongodb.js";

class UserRepository {
  getAll = async () => {
    const db = getDB("e-com-db");
    const usersCollection = db.collection("users");
    const users = await usersCollection.find().toArray();
    console.log({ users });
    return users;
  };

  get(id) {
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) {
      throw new ApplicationError("user not found", 404);
    }
    return foundUser;
  }

  async create(newUser) {
    try {
      // get the data base
      const db = getDB("e-com-db");
      // get the collection
      const usersCollection = db.collection("users");
      // insert the document
      await usersCollection.insertOne(newUser);
      const user = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        type: newUser.type,
      };
      return user;
    } catch (error) {
      console.log("db error: ", error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  update(id, data) {
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

  async login(email) {
    try {
      return await this.findUser(email);
    } catch (error) {
      console.log("db error: ", error);
    }
  }

  findUser = async (email) => {
    try {
      const db = getDB("e-com-db");
      const usersCollection = db.collection("users");
      return await usersCollection.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserRepository;
