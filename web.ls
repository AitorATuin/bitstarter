global <<< require \prelude-ls
require! express
require! fs

app = express.createServer express.logger()

renderFile = (file) -> (.toString!) fs.readFileSync file 

app.get '/', (req, res) -> renderFile "index.html" |> res.send _

port = process.env.PORT || 8080

app.listen port, -> "Listening on port " + port