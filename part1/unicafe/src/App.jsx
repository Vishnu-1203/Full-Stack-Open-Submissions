import { useState } from 'react'

const Button=({text,onClick})=><button onClick={onClick}>{text}</button>;

const StatisticLine=({text,value})=><tr><td>{text}</td> <td>{value}</td></tr>

const Statistics=({stats})=>{

  const totalFeedback=stats.reduce((a,c)=>a+c)
  const average=(stats[0]-stats[2])/totalFeedback
  const positive=(stats[0])/totalFeedback*100

  if(totalFeedback==0){
      return (
      <>
      <h1>Statistics</h1>
      <h4>Nothing to display</h4>
      </>)
    }

  return(
    <>
    <h1>Statistics</h1>
    <table>
    <StatisticLine text="good" value={stats[0]}/>
    <StatisticLine text="neutral" value={stats[1]}/>
    <StatisticLine text="bad" value={stats[2]}/>
    <StatisticLine text="all" value={totalFeedback}/>
    <StatisticLine text="average" value={average}/>
    <StatisticLine text="positive" value={positive.toString()+"%"}/>
    </table>
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
