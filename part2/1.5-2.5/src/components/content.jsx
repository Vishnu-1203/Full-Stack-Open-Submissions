import React from "react";
import Part from "./part"
const Content=({content})=>{

    return <> {content.map(part=><Part key={part.id} text={part.name} number={part.exercises} />)}</>

}

export default Content;