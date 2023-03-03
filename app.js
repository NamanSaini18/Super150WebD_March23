const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose');
const Article = require("./models/Article")


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({ extended:false }));
app.use(methodOverride('_method'));


mongoose.connect("mongodb://127.0.0.1:27017/blog")
.then(() => console.log("DB CONNECTED !!"))
.catch((err)=> console.log(err))



app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
  })
  
app.use('/articles', articleRouter)
// app.get('/articles',(req,res)=>{
//     res.render('index', {articles})
// })


// app.get('/articles/new',(req,res)=>{
//     res.render('new');
// });







app.listen(5000,()=>{
    console.log("Server listening at Port No 5000")
})