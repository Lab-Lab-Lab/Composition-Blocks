import { useState } from 'react';
import './App.css'
import CompositionBlocks from './CompositionBlocks';
// import exampleJson from './example';
import exampleJson from './threeNotes';
import FlatEditor from './FlatEditor'

function App() {
  const [flatJSON, setFlatJSON] = useState(exampleJson);

  return (
    <div className='split-container'>
      <FlatEditor flatJSON={flatJSON} onScoreUpdate={setFlatJSON} />
      <CompositionBlocks flatJSON={flatJSON} onChange={setFlatJSON} />
    </div>

  )
}

export default App

