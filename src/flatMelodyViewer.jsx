import React, { useEffect, useState } from 'react';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
import Embed from 'flat-embed';
 
// https://flat.io/developers/docs/embed/javascript
function FlatMelodyViewer({
  height = 400,
  width = '100%',
  score,
  onLoad,
  debugMsg,
  flatJSON
}) {
  const [embed, setEmbed] = useState();
  const editorRef = React.createRef();

  const embedParams = {
    appId: '60a51c906bcde01fc75a3ad0',
    layout: 'responsive',
    branding: false,
    themePrimary: '#450084',
    controlsDisplay: false,
    controlsPlay: false,
    controlsFullscreen: false,
    displayFirstLinePartsNames: false,
    controlsZoom: false,
    controlsPrint: false,
    toolsetId: '64be80de738efff96cc27edd',
  };

  const allParams = {
    height: `${height}`,
    width,
    embedParams,
  };

  useEffect(() => {
    console.log("Melody Viewer");
    console.log(flatJSON);
    console.log(embed) // TODO: embed is undefined on first 2 loads?
    console.log(editorRef.current);
    console.log('flatJSON && embed', flatJSON && embed && true)
    if (flatJSON && embed) {
      embed.loadJSON(flatJSON)
        .then(()=>{
          console.log('loadedJSON');
        })
        .catch((e) => {
          console.error('error loading JSON', e);
        });
    } 
  }, [flatJSON, embed])

  useEffect(() => {
    if (!editorRef.current || (!score && !flatJSON)) return;
    if (score) {
      const loadParams = {
        score: score.scoreId,
      };
      if (score.sharingKey) {
        loadParams.sharingKey = score.sharingKey;
      }
      const embedObject = new Embed(editorRef.current, allParams);
      embedObject
      .ready()
      .then(() => setEmbed(embedObject))
      .then(() => embedObject.loadFlatScore(loadParams))
      .then(() => embedObject.getJSON())
      .then((jsonData) => onLoad && onLoad(JSON.stringify(jsonData)))
      .catch((e) => {
        if (e && e.message) {
          e.message = `flat error: ${e?.message}, not loaded from scoreId, score: ${JSON.stringify(score)}`;
          if (debugMsg) {
            e.message = `${e?.message}, debugMsg: ${debugMsg}`;
          }
        } else if (debugMsg) {
          console.error('debugMsg', debugMsg);
          if (score) {
            console.error('score', score);
          }
        }
        console.error('score not loaded from scoreId');
        console.error('score', score);
        throw e;
      });
    } else {
      const embedObject = new Embed(editorRef.current);
    }

    
  }, [editorRef.current]);

  return <div ref={editorRef} />;
}

export default React.memo(FlatMelodyViewer);
