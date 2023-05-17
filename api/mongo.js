const mongo = require("mongodb");
const MongoClient = mongo.MongoClient
let client = MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
let database = undefined

client.connect(err => {
    if (err) throw err
    database = client.db("positivity")
})
function db() {
    return database
}

module.exports = {
    db: db
}