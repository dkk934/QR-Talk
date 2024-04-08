import exp from "express";
import qr from "qr-image";
import body from "body-parser";

const app = exp();
const port = process.env.PORT || 3000;

app.use(body.urlencoded({ extended: true }))
app.use(exp.static("public"));

function encodeToMorse(text) {
  var morseCodeMap = {
      ' ':'/','A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
      'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
      'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
      'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
      'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
      'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
      '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
      '9': '----.',
      '!': '!',
      '@': '@',
      '#': '#',
      '$': '$',
      '%': '%',
      '^': '^',
      '&': '&',
      '*': '*'
  };
  text = text.toUpperCase();
  var morseCode = '';
  for (var i = 0; i < text.length; i++) {
      var char = text[i];
      if (morseCodeMap[char]) {
          morseCode += morseCodeMap[char] + ' ';
      } else if (char === ' ') {
          morseCode += '  ';
      }
  }
  return morseCode.trim();
}

app.get("/",(req,res)=>{
  res.render('index.ejs')
})

app.post("/qr",(req,res)=>{
    const url= req.body.text;
    const url2 = encodeToMorse(url)
    var qr_svg = qr.imageSync(url2,{type : 'png'});
    const buffer = qr_svg
    const base64 = buffer.toString('base64');
    res.render('index.ejs',{image : base64})
})

app.listen(port,()=>{
    console.log(`App listen on: ${port}`);
})