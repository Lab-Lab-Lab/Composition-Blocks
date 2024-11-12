import { useEffect, useState } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import { buildToolBox, newBlocklyBlockForNote, notesFromJSON } from './blockly-setup';


export default function CompositionBlocks({flatJSON}) {
  const [xml, setXml] = useState('');

  const [toolbox, setToolbox] = useState({});
  useEffect(() => {
    setToolbox(buildToolBox())
  }, []);


  return (
    <div className='split-container'>
      {toolbox.contents && <BlocklyWorkspace
        toolboxConfiguration={toolbox} // this must be a JSON toolbox definition
        initialXml={xml}
        onXmlChange={setXml}
        className="fill-height"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
        }}
        onInject={(workspace) => {
          const xmlNotes = notesFromJSON(flatJSON);
          const allNotesFromScore = xmlNotes.map(note => newBlocklyBlockForNote(workspace, note)).filter(n => n !== undefined);
          allNotesFromScore.forEach((note, i) => {
            if (i > 0) {
              const prevNote = allNotesFromScore[i - 1];
              prevNote.nextConnection.connect(note.previousConnection);
              prevNote.initSvg();
            }
          })
        }}
      />}
      {xml && <pre>{xml}</pre>}
    </div>
  )
}