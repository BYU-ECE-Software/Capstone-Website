const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
require("./auth/samlStrategy"); // why isn't this assigned to a variable?

const app = express();

const frontendURL = "http://localhost:3000"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: frontendURL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(
  session({
    secret: "what-is-the-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // this is one day (ms). Shorter?
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// register auth routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);
// register user routes
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);
// register team routes
const teamRoutes = require("./routes/teams");
app.use("/teams", teamRoutes);
// register order routes
const orderRoutes = require("./routes/orders");
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  // find how to connect this to React. But for now this barebones will work for testing. We will need to make sure to use cookies on the frontend
  if (req.isAuthenticated()) {
    res.send(`Welcome ${req.user.nameID}! <a href="/auth/logout">Logout</a>`);
  } else {
    res.send(`<a href="/auth/login">Login with CAS</a>`);
  }
});

module.exports = app;
