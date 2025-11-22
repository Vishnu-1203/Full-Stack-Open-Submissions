import React from "react"
import Header from "./components/header"
import Footer from "./components/footer"
import Content from "./components/content"


const Course=({course})=>{
    const {name}=course
    const content=course.parts
    const total=content.reduce((s,a)=>s+a.exercises,0)
    return (
        <>
        <Header title={name}/>
        <Content content={content} />
        <Footer total={total}/>
        </>
    )


}


export default Course