global <<< require \prelude-ls
require! express
require! fs

app = express.createServer express.logger()

console.log('/static',  __dirname + '/public')

app.use('/static', express.static(__dirname + '/public'))

renderFile = (file) -> (.toString!) fs.readFileSync file 

app.get '/', (req, res) -> renderFile "index.html" |> res.send _

port = process.env.PORT || 8080

app.listen port, -> "Listening on port " + port