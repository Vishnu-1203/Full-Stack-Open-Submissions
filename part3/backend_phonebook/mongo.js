const mongoose=require("mongoose")

if(process.argv.length<3){
    console.log("Forgot to give Password")
    process.exit(1)
}

mongoose.set('strictQuery', false)

const password=process.argv[2]
const url=`mongodb+srv://vishnuda333_db_user:${password}@cluster0.w1jfo4p.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url,{family:4})

const phonebookSchema=mongoose.Schema({
        name:String,
        number:Number
    })
const Person=mongoose.model("Person",phonebookSchema)

if(process.argv.length===3){
    Person.find({}).then(result=>{
        result.forEach(person=>console.log(person))
        mongoose.connection.close()
    }).catch(e=>{
        console.log("error fetching->",e)
    })

}
else if(process.argv.length===5){
    const name=process.argv[3]
    const number=process.argv[4]

    const newPerson=new Person({
        name:name,
        number:number
    })

    newPerson.save().then(result=>{
        console.log("Saved! ",result)
        mongoose.connection.close()
    })

}
