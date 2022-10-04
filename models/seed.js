//import dependencies
const mongoose = require('./connection.js')
const Materia = require('./materia.js')

const db = mongoose.connection

db.on('open', () => {
    //starting materia for testing purposes
        const startMaterias = [
            {name: "Fire", color: "green", maxAP: 55000, common: true},
            {name: "Restore", color: "green", maxAP: 85000, common: true},
            {name: "Knights of the Round", color: "red", maxAP: 1000000, common: false},
            {name: "All", color: "blue", maxAP: 60000, common: true}
        ]
        //delete all materias
        Materia.deleteMany({})
            .then((deleted) => {
            console.log("all were deleted", deleted)
            //seed
            Materia.create(startMaterias)
                .then((Materias) => {
                    console.log(Materias)
                    db.close()
                })
                .catch(err => {
                    console.log(err)
                    db.close()
                })
             })
            .catch(err => {
                console.log(err)
                db.close()
            })
})
