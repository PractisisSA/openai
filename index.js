import { Configuration, OpenAIApi } from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import https from "https";

const app = express()
app.use(cors())
const port = 3000

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const configuration = new Configuration({
    organization: "org-qbU9aWklU84ES3ENXushMesk",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.all('/', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});


app.get('/', (req, res) => {
})

// app.get('/login', (req, res) => {
    
//     const apiKey = req.get('PRACTISIS-API-KEY')
//     const postData = JSON.stringify({
//         key : apiKey
//     });
    
//     const options = {
//       hostname: 'http://localhost/apis/practipos/api.php',
//       port: 443,
//       path: '/validate-api-key',
//       method: 'POST',
//       headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//            'Content-Length': postData.length
//          }
//     };
    
//     const req = https.request(options, (res) => {
//       console.log('statusCode:', res.statusCode);
//       console.log('headers:', res.headers);
    
//       res.on('data', (d) => {
//         process.stdout.write(d);
//       });
//     });
    
//     req.on('error', (e) => {
//       console.error(e);
//     });
    
//     req.write(postData);
//     req.end();

// })

app.post('/images/generate', urlencodedParser,(req, res) => {
    
    const prompt = req.body.prompt;
    const numberOfImages = 3;

    const imageSize = "1024x1024";
    
    openai.createImage({
        prompt: prompt,
        n: numberOfImages,
        size: imageSize,
    })

    .then((data) => {
        res.status(200).send(data.data.data);
    });

    
})

app.post('/chat/completions', urlencodedParser,(req, res) => {

    const message = req.body.message;

    openai.createChatCompletion({
        model: "gpt-3.5-turbo-0301",
        messages: [{"role": "user", "content": message}],
        n: 2
    })
    .then((data) => {
        res.status(200).send(data.data.choices);
    });

    
})


app.post('/edits', urlencodedParser,(req, res) => {

    const input = req.body.input;
    const instruction = req.body.instruction;

    openai.createEdit({
        model: "text-davinci-edit-001",
        input: input,
        instruction: instruction,
    })
    .then((data) => {
        res.status(200).send(data.data.choices);
    });

    
})


app.post('/images/variations', urlencodedParser,(req, res) => {

    const image = req.body.image;
    const instruction = req.body.instruction;

    openai.createImageVariation({
        model: "text-davinci-edit-001",
        input: input,
        instruction: instruction,
    })
    .then((data) => {
        res.status(200).send(data.data.choices);
    });

    
})

app.listen(port, () => {
  console.log(`OpenAI app listening on port ${port}`)
})
