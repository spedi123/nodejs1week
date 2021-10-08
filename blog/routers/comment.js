const express = require("express")
const router = express.Router()
const Comments = require("../schemas/comment")
const authMiddleware = require("../middlewares/auth-middleware")
const e = require("cors")

router.post('/comment', authMiddleware, async (req, res) => {
    const { postingId } = req.body;
    const { user } = res.locals
    const userId = user["nickname"]
    const recentComment = await Comments.find().sort("-commentId").limit(1)

    let commentId = 1
    if(recentComment.length != 0){ 
        commentId = recentComment[0]['commentId'] + 1 
    }
  
    const { description } = req.body
    const date = new Date()
    await Comments.create({ commentId, postingId, userId, description, date }) 
    res.send({ result: "success" })
  }) 


router.get("/comment/:postingId", async (req, res, next) => {

    const { postingId } = req.params
    console.log(postingId)

    const comment = await Comments.find({ postingId }).sort("-commentId")
    res.json({ comment: comment })
});


router.delete("/comment", authMiddleware, async (req, res) => {
    const { user } = res.locals
    const { commentId } = req.body

    const postingNickname = user["nickname"]
    const userComment = await Comments.findOne({ commentId })
    const commentNickname = userComment["userId"]

    if ( postingNickname === commentNickname ) {
        await Comments.deleteOne({ commentId })
        res.send({ result: "success" }) 
      } 
      else {
        res.send({ result: "로그인후 이용하세요!" }) 
      }
  })


router.put("/comment", authMiddleware, async (req, res) => {
    const { user } = res.locals
    const { commentId, description } = req.body

    const postingNickname = user["nickname"] 
    const userComment1 = await Comments.findOne({ commentId }) 
    const commentNickname = userComment1["userId"]

    if ( postingNickname === commentNickname ) {
        await Comments.updateOne({ commentId }, { $set: { description } })
        res.send({ result: "success" })
      } else {
        res.send({ result: "로그인후 이용하세요!"})
      }
})

  module.exports = router