//import dependencies
const mongoose = require('./connection.js')
const Materia = require('./materia.js')
const User = require('./user.js')

const db = mongoose.connection

//id for the initial seed user
const seedId = mongoose.Types.ObjectId("633e09114d073453ecd2a4d2")


db.on('open', () => {
    //grab 
    //starting materia for testing purposes
        const startMaterias = [
            {name: "Fire", color: "green", maxAP: 55000, common: true},
            {name: "Restore", color: "green", maxAP: 85000, common: true},
            {name: "Knights of the Round", color: "red", maxAP: 1000000, common: false},
            {name: "All", color: "blue", maxAP: 60000, common: true}
        ]
        //add seed user as owner
        startMaterias.forEach(materia => materia.owner = seedId)
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
