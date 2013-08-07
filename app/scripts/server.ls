global <<< require \prelude-ls
require! express
require! fs
require! path
require! http

app = express!
app.use express.logger!

const DEVPATH = \../../app/
const TMPPATH = \../../.tmp/
const PRODPATH = \dist

renderFileFromPath = (rPath, file) --> (.toString!) fs.readFileSync (path.join rPath, file)
addStatic = (alias, resourceDir, relativePath) --> (app) ->
          path.join __dirname, relativePath, resourceDir
          |> express.static
          |> app.use alias, _

cssRoute = addStatic "/css", "styles"
jsRoute = addStatic "/js", "scripts"
imgRoute = addStatic "/img", "images"
componentRoute = addStatic "/components", "bower_components"
jsComponentRoute = addStatic "/components", "bower_components"

staticRoutes =
             cssRoute,
             jsRoute,
             imgRoute,
             componentRoute,
             jsComponentRoute

if 'production' == app.get 'env'
   console.log "In production!"
   renderFile = renderFileFromPath "app"
   #(addStatic 'dist') |> app.use
else
   console.log "Hacking mode ;)"
   renderFile = renderFileFromPath ".tmp"
   map (-> app |> it DEVPATH), staticRoutes # Map Static Routes
   map (-> app |> it TMPPATH), [cssRoute] # Map compiled sass files
   app.use express.errorHandler!

app.get '/', (req, res) -> renderFile "index.html" |> res.send _

port = process.env.PORT || 8080

console.log "Listening on port " + port + "!!!"
app.listen port, -> "Listening on port " + port
