const Server = require('./models/serve')
require('dotenv').config()

const server = new Server()


server.listen()