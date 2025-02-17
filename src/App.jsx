import { useState } from 'react';
import './App.css'
import CompositionBlocks from './CompositionBlocks'
import exampleJson from './example';
import FlatMelodyViewer from './flatMelodyViewer';

function App() {
  const [flatJSON, setFlatJSON] = useState(exampleJson)
  return (
    <div className='split-container'>
      <FlatMelodyViewer 
      onLoad={(json)=>
        setFlatJSON(JSON.parse(json))
      }
      score={{
        scoreId: "67a26884ad9eb655c27e1bbe",
        sharingKey: "d61fc1be1b3df01d6c52162d81e4d58834ce3f30ad9eb9a49d3f642d0a822b04c929b2ee20aaa2af838b5e3fe39d6200f5d82895241a832fdbe7b01f2cbe7586"
      }}></FlatMelodyViewer>
      <CompositionBlocks flatJSON={flatJSON}></CompositionBlocks>

      {/* short read  */}
      {/* {xml && <pre ref={renderedXMLRef} dangerouslySetInnerHTML={{ __html: xml }}></pre>} */}
    </div>
  )
}



export default App
