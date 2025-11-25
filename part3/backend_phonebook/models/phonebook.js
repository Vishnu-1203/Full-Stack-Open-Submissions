const mongoose=require("mongoose")

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url,{family:4}).then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const hypenated=(num)=>{
  const newstr=num.substr(1,num.length-3)
  const hyp=newstr.indexOf("-")
  if(hyp==-1)return false;
  return true
}
const phonebookSchema=mongoose.Schema({
        name:{
          type:String,
          minLength:3,
          required:true
        },
        number:{
          type:String,
          minLength:8,
          required:true,
          validate: [hypenated,"Error: Not Hyphenated into two parts"]
        }
    })


phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports=mongoose.model("Person",phonebookSchema)
