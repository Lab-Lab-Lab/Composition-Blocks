import './App.css'
import CompositionBlocks from './CompositionBlocks'
import exampleJson from './example';

function App() {
  return (
    <CompositionBlocks flatJSON={exampleJson}></CompositionBlocks>
  )
}

export default App
