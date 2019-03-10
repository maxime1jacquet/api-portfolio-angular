const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const data = require("./projects.js");
const port = process.env.PORT || 8081;
const router = express.Router();
// const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./assets'));
/*
  LIST ALL PROJECT
*/
router.get("/project", (req, res) => {
  res
  .header("Access-Control-Allow-Origin", "*")
  .json({ data: data.projects });
});


/*
  SERCH BY TITLE
*/
router.get("/project/search/:keyword", (req, res) => {
  let isExist = false;
  let result = [];

  for (let i = 0; i < data.projects.length; i++) {
    const title = data.projects[i].title.toLowerCase();
    const keyword = req.params.keyword.toLowerCase();
    if (title.indexOf(keyword) !== -1) {
      isExist = true;
      result.push(data.projects[i]);
    }
  }

  if (!isExist) {
    res
      .header("Access-Control-Allow-Origin", "*")
      .status(404)
      .send({ status: 404, message: "project not found" });
  } else {
    res.header("Access-Control-Allow-Origin", "*").json({ data: result });
  }
});

/*
  SERCH BY SLUG
*/
router.get("/project/slug/:keyword", (req, res) => {
  let isExist = false;
  let result = [];

  for (let i = 0; i < data.projects.length; i++) {
    const slug = data.projects[i].slug.toLowerCase();
    const keyword = req.params.keyword.toLowerCase();
    if (slug.indexOf(keyword) !== -1) {
      isExist = true;
      result.push(data.projects[i]);
    }
  }

  if (!isExist) {
    res
      .header("Access-Control-Allow-Origin", "*")
      .status(404)
      .send({ status: 404, message: "project not found" });
  } else {
    res.header("Access-Control-Allow-Origin", "*").json({ data: result });
  }
});

/*
  TAGS
*/
router.get("/project/tag", (req, res) => {
  let tags = [];

  for (let i = 0; i < data.projects.length; i++) {
    const slug = data.projects[i].tag.toLowerCase().split(",");
    tags.push(...slug);
  }

  tags = tags.reduce(function(a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);

  res.header("Access-Control-Allow-Origin", "*").json({ tags: tags });
});

/*
  SERCH BY ID
router.get("/project/:id", (req, res) => {
  let isExist = false;
  for (let i = 0; i < data.projects.length; i++) {
    if (data.projects[i].id == req.params.id) {
      isExist = true;
      res
      .header('Access-Control-Allow-Origin', "*")
      .json({ data: data.projects[i] });
    }
  }

  if (!isExist) {
    res
    .header('Access-Control-Allow-Origin', "*")
    .status(404)
    .send({ status: 404, message: "project not found" });
  }
});
*/

/*
  TAGS
*/
// router.get("/mail", (req, res) => {

// // async..await is not allowed in global scope, must use a wrapper
// async function main(){

//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let account = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'maxime1jacquet@gmail.com', // generated ethereal user
//       pass: '' // generated ethereal password
//     }
//   });

//   let mailOptions = {
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "maxime1jacquet@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
//   };

//   let info = await transporter.sendMail(mailOptions)

//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

// }

// main().catch(console.error);
// });

app.use("/", router);
app.listen(port);
console.log("Listening " + port);
