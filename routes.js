const express = require("express");
const router = express.Router();
router.get("/", (req, res)=>{
    res.render("index.pug");
}
);

router.get("/about", (req, res)=>{
    res.render("about.pug");
})

module.exports = router;