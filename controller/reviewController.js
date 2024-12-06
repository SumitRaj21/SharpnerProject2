const db = require("../config/db");



//Entry of company

const createCompany=async(req,res)=>{
    try {
        const {cname,pros,cons,rating}=req.body;
        if(!cname || !pros || !cons || !rating){
            return res.status(505).send({
                success:false,
                message:"Please Provide all fields"
            })   
        }
        const data=await db.query(`INSERT INTO companies (company_name,pros,cons,rating) VALUES(?,?,?,?);`,
        [cname,pros,cons,rating]);
    if(!data){
        return res.status(404).send({
            success:false,
            message:"Error in insert Querry"
        })
    } 
    res.redirect('/admin/add-review');
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Company  API',
            error
        })
    }   
}

//getting company details
const searchCompany=async(req,res)=>{
    try {
        const cname=req.body.cname;
        if(!cname){
            return res.status(505).send({
                success:false,
                message:"Please Enter company name"
            })   
        }
        const data=await db.query(`SELECT pros,cons,rating FROM companies WHERE company_name=?`,[cname]);
        if(data[0].length==0){
            return res.status(404).send(`<h1>No Record Found</h1>`);
        }
        const avg=await db.query(`SELECT AVG(rating) FROM companies WHERE company_name=? `,[cname]);
        function getAverageRating(data) {
            if (!Array.isArray(data) || data.length === 0) {
                console.error("Input must be a non-empty array.");
                return null;
            }
        
            const firstItem = data[0]; // Get the first object in the array
        
            if (firstItem && typeof firstItem['AVG(rating)'] !== 'undefined') {
                const rating = parseFloat(firstItem['AVG(rating)']);
                return isNaN(rating) ? null : rating;
            }
        
            console.error("'AVG(rating)' key not found in the first object.");
            return null;
        }
        const averageRating = getAverageRating(avg[0]);
        function generate(array){
            const temp="AVG(rating)";
            var html=`<h1>Company Name:${cname}</h1>
            <h2>Company Rating: ${averageRating}</h2>`;
            array.forEach(element => {
               html +=`<p>Pro:</p>${element.pros}<p>Cons:</p>${element.cons}<p>Rating:</p>${element.rating}<hr style="width:50%;text-align:left;margin-left:0">`
            });
            res.send(html);
        }
        generate(data[0]);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Create Company  API',
            error
        })
    }
    
};


module.exports={
    createCompany,
    searchCompany
}