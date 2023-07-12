const router = require("express").Router();
const Category = require("../modals/Category")



//CREATE POST
router.post("/", async (req, res) => {
    const newCat = new Category(req.body)
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (error) {
        res.status(500).json(error)
    }
})


//GET ALL CATEGORIES

router.get("/", async (req, res) => {
    try {
            cats = await Category.find()
        
        res.status(200).json(cats)
    } catch (error) {
        res.status(500).json(error)
    }

})

//UPDATE CATEGORY

router.put("/:id", async (req, res) => {
    try {
        const cat = await Category.findById(req.params.id)
        if (cat.username === req.body.username) {
            try {
                const updatedcat = await Category.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedcat)
            } catch (error) {
                res.status(500).json(error)
            }
        } else {
            res.status(401).json("You can't update this cat")
        }
    } catch (error) {
        res.status(500).json(error)
    }


})

//DELETE USER

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.username === req.body.username) {
            try {
                await Post.findById()
                res.status(200).json("Post has been deleted")
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



//GET USER

router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router