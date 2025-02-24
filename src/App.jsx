import { useState } from 'react';
import './App.css'
import CompositionBlocks from './CompositionBlocks'
// import exampleJson from './example';
import exampleJson from './threeNotes';
import FlatMelodyViewer from './flatMelodyViewer';

function App() {
  const [flatJSON, setFlatJSON] = useState(exampleJson)
  return (
    <div className='split-container'>
      <FlatMelodyViewer
        flatJSON={
          flatJSON
        }
        onLoad={(json) =>
          setFlatJSON(JSON.parse(json))
        }></FlatMelodyViewer>
      <CompositionBlocks flatJSON={flatJSON} onChange={setFlatJSON}></CompositionBlocks>

      {/* short read  */}
      {/* {xml && <pre ref={renderedXMLRef} dangerouslySetInnerHTML={{ __html: xml }}></pre>} */}
    </div>
  )
}



export default App
