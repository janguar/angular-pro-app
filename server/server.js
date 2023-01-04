const sequelize = require('./src/config/database');
const User = require('./src/user/User');
const Article = require('./src/article/article.model');
const Role = require('./src/roles/role.model');
const app = require('./src/app');
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000;



const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'tod18@ethereal.email',
    pass: 'urMvkJR1W1aySRY6cB'
  }
});


if (process.env.NODE_ENV === "Production") {
  sequelize.sync();
} else {
  sequelize.sync({force: true}).then(async () => {
    //create user
    for (let i = 1; i <= 15; i++) {
      await User.create({
        username: `user${i}`,
        email: `user${i}@mail.com`,
        password: 'P4ssword'
      });
      // create article
      await Article.create({content: `article content ${i}`});

      // create roles
      await Role.create({name: "admin"});
    }
  });
}

app.post("/mail",(req,res) => {
  const info = transporter.sendMail({
    to: "targetuser@mail.com",
    from: "fromuser@mail.com",
    subject: "Fake mail",
    text: "Hello fake mail"
  });

  res.send("Mail send !");
})

app.listen(PORT,() => {
  console.log(`App is running on http://localhost:${PORT}`,process.env.NODE_ENV);
});


