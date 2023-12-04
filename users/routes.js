import * as dao from "./dao.js";
import session from "express-session";

function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
   };
  const deleteUser = async (req, res) => { 
    const userId  = req.params.userId;
    const status = await dao.deleteUser(userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => { 
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => { 
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const findUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    res.json(user);
   };
   const findUserByCredentials = async (req, res) => {
    const { username, password } = req.params;
    const user = await dao.findUserByCredentials(username, password);
    res.json(user);
   };
  const findUserByRole = async (req, res) => { 
    const role = req.params.role;
    const user = await dao.findUserByRole(role);
    res.json(user);
  }; 
  const updateUser = async (req, res) => { 
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session['currentUser'] = currentUser;
    res.json(status);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(
      req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session['currentUser'] = currentUser;
    res.json(currentUser);
   };

   const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
app.use(
  session(sessionOptions)
);

  const account = async (req, res) => {
    res.json(req.session['currentUser']);
   };

  const updateFirstName = async (req, res) => {
    const id = req.params.id;
    const newFirstName = req.params.newFirstName;
    const status= await dao.updateUser(id, {firstName: newFirstName});
    res.json(status);
  }

 



  app.get("/api/users/role/:role", findUserByRole);
  app.get("/api/users/updateFirstName/:id/:newFirstName", updateFirstName); 

  app.post("/api/users", createUser);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/username/:username", findUserByUsername);
  app.get("/api/users/:username/:password", findUserByCredentials);
  app.get("/api/users/:userId", findUserById);

  app.put("/api/users/:userId", updateUser);

  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);

}
export default UserRoutes;