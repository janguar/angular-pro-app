const sequelize = require('./src/config/database');
const User = require('./src/user/User');
const Article = require('./src/article/Article');
const Role = require('./src/roles/Role');
const app = require('./src/app');


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



app.listen(4000,() => {
  console.log("App is running on http://localhost:4000");
});


