const express = require("express")
const Postings = require("../schemas/posting")
const router = express.Router()
const authMiddleware = require('../middlewares/auth-middleware')

// 게시글 작성
router.post('/posting', authMiddleware, async (req, res) => {
    console.log(req.body)
    const { title, name, password, content, date } = req.body;
    let postingId = await Postings.find({}).sort("-postingId").limit(1);
    if (postingId.length == 0) { postingId = 1 }
    else { postingId = postingId[0]['postingId'] + 1; }
    await Postings.create({ postingId, title, name, password, content, date })
    res.send({ result: "success" })
})

// 게시글 조회
router.get('/posting', async (req, res) => {
    try {
        const postings = await Postings.find({}).sort("-date");
        console.log(postings)
        res.json({ postings: postings })
    } catch (err) {
        console.error(err);
        next(err);
    }
})

// 게시글 자세히 보기
router.get('/posting/:postingId', async (req, res) => {
    try {
        const { postingId } = req.params;
        const posting = await Postings.findOne({ postingId: postingId });
        console.log(posting)
        res.json({ detail: posting })
    } catch (err) {
    }
})

// router.get('/posting/:postingId', authMiddleware, async (req, res) => {
//     try {
//         const { postingId } = req.params;
//         const posting1 = await Postings.findOne({ postingId: postingId });
//         console.log(posting1)
//         res.json({ detail1: posting1 })
//     } catch (err) {
//     }
// })

// 게시글 수정
router.post("/posting/:postingId", authMiddleware, async (req, res) => {
    try {
        const { postingId } = req.params;
        const { title, name, content, password } = req.body;
        console.log(password)
        const isPostingInDetail = await Postings.find({ postingId, password });
        if (isPostingInDetail.length > 0) {
            await Postings.updateOne({ postingId }, { $set: { title, name, content } })
            res.send({ result: "수정이 완료 되었습니다." })
        }
        else {
            res.send({ result: "비밀번호가 틀렸습니다." })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
})

// 게시글 삭제
router.post("/posting/:postingId/delete", authMiddleware, async (req, res) => {
    try {
        const { postingId } = req.params;
        const { password } = req.body;
        const isPostingInDetail = await Postings.find({ postingId, password });
        if (isPostingInDetail.length > 0) {
            await Postings.deleteOne({ postingId })
            res.send({ result: "삭제되었습니다." })
        }
        else {
            res.send({ result: "비밀번호가 틀렸습니다." })
        }
    } catch (err) {
    }
})


module.exports = router;