const sqlite3 = require('sqlite3').verbose()

db = new sqlite3.Database('./saveData.db', err => {
    if(err){
        return console.error(err.message)
    }
    console.log(('Connected to Database'))
})

function openData(){

}

function closeData(){
    db.close(err => {
        if(err) {
            return console.error(err.message)
        }
        console.log('Closed connection to Database')
    })
}
    
module.exports = db