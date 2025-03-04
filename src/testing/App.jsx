import { useState } from 'react'
import ComponentA from './ComponentA'
import ComponentB from './ComponentB'
import FlatEditor from './FlatEditor'
import FlatText from './FlatText'
import flatExample from './basic-flatio-example.json'

function App() {
  const [dataA, setDataA] = useState(["Hello, world.", "what up?!"])
  const [flat, setFlat] = useState(flatExample)
  
  return (
    <>
      {/* <ComponentA data={dataA} setData={setDataA} />
      <ComponentB data={dataA} setData={setDataA} /> */}
      <FlatEditor flatJSON={flat} onScoreUpdate={setFlat} />
      <FlatText data={flat} setData={setFlat} />

    </>
  )
}

export default App
