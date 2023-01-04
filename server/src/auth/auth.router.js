const router = require('express').Router();
const jwt = require("jsonwebtoken");


router.post("/auth",(req,res) => {
  const credentials = req.body;
  const user = users.find(user => user.email === credentials.email);
  if (!user) {
    return res.status(401).send({message: "Unauthorized"});
  }
  if (user.password !== credentials.password) {
    return res.status(401).send({message: "Unauthorized"});
  }
  const token = jwt.sign({id: user.id},'this-is-our-secret')
  res.send({
    token: token
  })
})




module.exports = router;
