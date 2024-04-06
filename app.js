import exp from "express";
import qr from "qr-image";
import body from "body-parser";

const app = exp();
const port = process.env.PORT || 3000;

app.use(body.urlencoded({ extended: true }))
app.use(exp.static("public"));

app.get("/",(req,res)=>{
  res.render('index.ejs')
})

app.post("/qr",(req,res)=>{
    const url= req.body.text;
    var qr_svg = qr.imageSync(url,{type : 'png'});
    // console.log(qr_svg);
    const buffer = qr_svg // your Buffer
    // Convert the Buffer to a base64 string
    const base64 = buffer.toString('base64');
    res.render('index.ejs',{image : base64})
})

app.listen(port,()=>{
    console.log(`App listen on: http://localhost:${port}`);
})