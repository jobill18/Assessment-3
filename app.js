import express from "express";
import session from "express-session";
import lodash from "lodash";
import morgan from "morgan";
import nunjucks from "nunjucks";
import ViteExpress from "vite-express";

const app = express();
const port = "8000";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  session({ secret: "ssshhhhh", saveUninitialized: true, resave: false })
);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

const MOST_LIKED_FOSSILS = {
  aust: {
    img: "/img/australopith.png",
    name: "Australopithecus",
    num_likes: 584,
  },
  quetz: {
    img: "/img/quetzal_torso.png",
    name: "Quetzal",
    num_likes: 587,
  },
  steg: {
    img: "/img/stego_skull.png",
    name: "Stegosaurus",
    num_likes: 598,
  },
  trex: {
    img: "/img/trex_skull.png",
    name: "Tyrannosaurus Rex",
    num_likes: 601,
  },
};

const OTHER_FOSSILS = [
  {
    img: "/img/ammonite.png",
    name: "Ammonite",
  },
  {
    img: "/img/mammoth_skull.png",
    name: "Mammoth",
  },
  {
    img: "/img/ophthalmo_skull.png",
    name: "Opthalmosaurus",
  },
  {
    img: "/img/tricera_skull.png",
    name: "Triceratops",
  },
];

// TODO: Replace this comment with your code

app.get("/random-fossil.json", (req, res) => {
  const randomFossil = lodash.sample(OTHER_FOSSILS);
  res.json(randomFossil);
  console.log(randomFossil);
});

ViteExpress.listen(app, port, () => {
  console.log(`Server running on http://localhost:${port}...`);
});

app.get("/top-fossils", (req, res) => {
  if (!req.session.name) {
    res.redirect("/");
  } else {
    const fossils = MOST_LIKED_FOSSILS;
    const aust = fossils.aust;
    const quetz = fossils.quetz;
    const steg = fossils.steg;
    const trex = fossils.trex;
    const name = req.session.name;

    console.log(fossils[req.session.fossil]);
    res.render("top-fossils.html.njk", {
      fossils,
      aust,
      quetz,
      steg,
      trex,
      name,
    });
  }
});

app.get("/", (req, res) => {
  if (req.session.name) {
    res.redirect("/top-fossils");
  } else {
    res.render("homepage.html.njk");
  }
});

app.get("/get-name", (req, res) => {
  const name = req.query.name;
  req.session.name = name;
  res.redirect("/top-fossils");
});

app.get("/like-fossil", (req, res) => {
  req.session.fossil = req.query.fossil;
  const fossil = req.session.fossil;
  MOST_LIKED_FOSSILS[fossil].num_likes += 1;
  const name = req.session.name;
  console.log(MOST_LIKED_FOSSILS);
  res.render("thank-you.html.njk", { name: req.session.name });
});
