import { useState } from 'react'

const Button=({text,onClick})=><button onClick={onClick}>{text}</button>;

const Statistics=({stats})=>{

  if(stats.reduce((a,c)=>a+c)==0){
      return (
      <>
      <h1>Statistics</h1>
      <h4>Nothing to display</h4>
      </>)
    }

  return(
    <>
    <h1>Statistics</h1>
    good:{stats[0]}
    <br/>
    neutral:{stats[1]}
    <br/>
    bad:{stats[2]}

    </>

  

  )
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral,setNeutral]=useState(0)
  const [bad,setBad]=useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={()=>setGood(good+1)}/>
      <Button text="neutral" onClick={()=>setNeutral(neutral+1)}/>
      <Button text="bad" onClick={()=>setBad(bad+1)}/>
      <Statistics stats={[good,neutral,bad]}/>
      
    </div>
  )
}

export default App
