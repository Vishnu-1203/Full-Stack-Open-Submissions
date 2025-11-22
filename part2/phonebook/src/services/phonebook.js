import axios from 'axios'
const baseUrl="http://localhost:3001/persons"

const getAll=()=>{
    const request=axios.get(baseUrl)
    return request.then(response=>response.data)
    }

const addPerson=(person)=>{
    const request=axios.post(baseUrl,person)
    return request.then(response=>response.data)
}

const deletePersonWithId=(id)=>{
    const request=axios.delete(`${baseUrl}/${parseInt(id)}`)
    return request.then(res=>res.data)
}

const updatePersonNumber=(id,newObject)=>{
    const request=axios.put(`${baseUrl}/${parseInt(id)}`,newObject)
    return request.then(res=>res.data)
}


export default {getAll,addPerson,deletePersonWithId,updatePersonNumber}

