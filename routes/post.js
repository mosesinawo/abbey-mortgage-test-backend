const router = require("express").Router();
const User = require("../modals/User")
const Post = require("../modals/Post")



//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE POST

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("You can't update this post")
        }
    } catch (error) {
        res.status(500).json(error)
    }


})
//update username
// router.patch("/:id", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id)
//         if (post.username === req.body.username) {
//             try {
//                 const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
//                     $set: req.body.username
//                 }, { new: true })
//                 res.status(200).json(updatedPost)
//             } catch (error) {
//                 res.status(500).json(error)
//             }
//         } else {
//             res.status(401).json("You can't update this post")
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }


// })

//DELETE POST

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json("Post has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("You can't delete this post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})



//GET USER

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})


//GET ALL POSTS

router.get("/", async (req, res) => {
    const username = req.query.user
    const catname = req.query.cat
    try {
        let posts
        if (username) {
            posts = await Post.find({ username })
        } else if (catname) {
            posts = await Post.find({
                categories: {  
                    $in: [catname],
                },
            })     
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }

})


module.exports = router