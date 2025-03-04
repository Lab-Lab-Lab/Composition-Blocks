// import { useEffect, useState } from 'react';
// import './App.css'
// import CompositionBlocks from './CompositionBlocks'
// // import exampleJson from './example';
// import exampleJson from './threeNotes';
// import FlatMelodyViewer from './flatMelodyViewer';


// function App() {
//   const [flatJSON, setFlatJSON] = useState(exampleJson);

//   // 2-27
//   useEffect(() => {
//     console.log("App.jsx --> App Loaded");
//   }, []); // This makes sure it only logs once when the app mounts

//   return (
//     <div className='split-container'>
//       <div style={{ width: '100%', display: 'block' }}>
//         <FlatMelodyViewer
//           flatJSON={flatJSON}
//           onLoad={(json) =>
//             setFlatJSON(JSON.parse(json))
//           }
//         />
//       </div>
//       <CompositionBlocks flatJSON={flatJSON} onChange={setFlatJSON} />
//     </div>

//   )
// }

// export default App

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
      <div style={{ width: '100%', display: 'block' }}>
        <FlatEditor flatJSON={flatJSON} onScoreUpdate={setFlatJSON} />
      </div>
      <CompositionBlocks flatJSON={flatJSON} onChange={setFlatJSON} />
    </div>

  )
}

export default App

