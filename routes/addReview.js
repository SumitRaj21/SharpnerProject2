const path=require('path');
const express=require("express");
const { createCompany, searchCompany } = require('../controller/reviewController');
const router=express.Router();

router.use('/add-review', (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'views','addReview.html'));
});
router.use('/get-review',(req,res)=>{
    res.sendFile(path.join(__dirname,'../', 'views','reviews.html'));
});
router.post('/create',createCompany);

router.post('/search',searchCompany);

module.exports=router;

