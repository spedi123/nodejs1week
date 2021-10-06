const express = require("express");
const Users = require("../schemas/user");
const Joi = require("joi");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/auth-middleware')

const postUsersSchema = Joi.object({
  nickname: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,20}$")),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().required(),
});

router.post("/user", async (req, res) => {
  try {
    const { email, nickname, password, confirmPassword } =
      await postUsersSchema.validateAsync(req.body);

    if (password !== confirmPassword) {
      res.status(400).send({
        errorMessage: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
      });
    } else if (password.includes(nickname)) {
        res.status(400).send({
            errorMessage: "비밀번호에 닉네임값을 입력하지 말아주세요.",
        });
        return;
    }

    const existsUsers = await Users.findOne({
      $or: [{ email }, { nickname }],
    });
    if (existsUsers) {
      res.status(400).send({
        errorMessage: "이메일 또는 닉네임이 이미 사용중입니다.",
      });
      return;
    }

    const user = new Users({ email, nickname, password });
    await user.save();

    res.status(201).send({});
  } catch (error) {
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});

const postAuthSchema = Joi.object({
  nickname: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  password: Joi.string().required().min(4),
});

router.post("/auth", async (req, res) => {
  try {
    const { nickname, password } = await postAuthSchema.validateAsync(req.body);
    const user = await Users.findOne({ nickname, password }).exec();
    if (!user) {
      res.status(400).send({ errorMessage: "닉네임 또는 패스워드가 잘못됐습니다." });
      return;
    }
    const token = jwt.sign({ userId: user.userId }, "peter-secret-key");
    console.log(token)
    res.send({ token });
    
  } catch (error) {
    res.status(400).send({
      errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
    });
  }
});
// router.post("/auth", async (req, res) => {
//   const { nickname, password } = req.body;
//   const users = await Users.findOne({ nickname, password }).exec();
//   if (!users) {
//     res
//       .status(400)
//       .send({ errorMessage: "닉네임 또는 패스워드가 잘못됐습니다." });
//     return;
//   }
//   const token = jwt.sign({ userId: nickname }, "jason-secret-key");
//   res.send({ token });
// });

router.get("/user/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
      user,
    });
  });

module.exports = router;
