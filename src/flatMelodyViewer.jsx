// import React, { useEffect, useState } from 'react';
// // import Col from 'react-bootstrap/Col';
// // import Row from 'react-bootstrap/Row';
// import Embed from 'flat-embed';

// // https://flat.io/developers/docs/embed/javascript
// function FlatMelodyViewer({
//   height = 400,
//   width = '100%',
//   score,
//   onLoad,
//   debugMsg,
//   flatJSON
// }) {
//   const [embed, setEmbed] = useState(null);
//   const editorRef = React.createRef(null);

//   const [lastJSON, setLastJSON] = useState(null);

//   // 2-27
//   useEffect(() => {
//     if (flatJSON && embed && JSON.stringify(flatJSON) !== JSON.stringify(lastJSON)) {
//       setLastJSON(flatJSON); // Save last JSON to prevent loops
//       console.log("Reloading Flat.io from Blockly changes");
//       embed.loadJSON(flatJSON, { autoResize: true });
//     }
//   }, [flatJSON, embed]);


//   const embedParams = {
//     appId: '60a51c906bcde01fc75a3ad0',
//     layout: 'responsive',
//     branding: false,
//     themePrimary: '#450084',
//     controlsDisplay: false,
//     controlsPlay: false,
//     controlsFullscreen: false,
//     displayFirstLinePartsNames: false,
//     controlsZoom: false,
//     controlsPrint: false,
//     toolsetId: '64be80de738efff96cc27edd',
//   };

//   const allParams = {
//     height: `${height}`,
//     width,
//     embedParams,
//   };

//   // useEffect(() => {
//   //   console.log("Melody Viewer");
//   //   console.log(flatJSON);
//   //   console.log(embed) // TODO: embed is undefined on first 2 loads?
//   //   console.log(editorRef.current);
//   //   console.log('flatJSON && embed', flatJSON && embed && true)
//   //   if (flatJSON && embed) {
//   //     embed.loadJSON(flatJSON)
//   //       .then(()=>{
//   //         console.log('loadedJSON');
//   //       })
//   //       .catch((e) => {
//   //         console.error('error loading JSON', e);
//   //       });
//   //   } 
//   // }, [flatJSON, embed])

//   // 2-27
//   useEffect(() => {
//     if (flatJSON && embed) {
//       console.log("Reloading Flat.io from Blockly changes");
//       embed.loadJSON(flatJSON, { autoResize: true })
//         .then(() => console.log("Flat.io successfully reloaded"))
//         .catch((e) => console.error("Flat.io failed to reload", e));
//     }
//   }, [flatJSON]); // Only listen to flatJSON changes



//   useEffect(() => {
//     if (!editorRef.current || (!score && !flatJSON)) return;
//     if (score) {
//       const loadParams = {
//         score: score.scoreId,
//       };
//       if (score.sharingKey) {
//         loadParams.sharingKey = score.sharingKey;
//       }
//       const embedObject = new Embed(editorRef.current, allParams);
//       embedObject
//       .ready()
//       .then(() => setEmbed(embedObject))
//       .then(() => embedObject.loadFlatScore(loadParams))
//       .then(() => embedObject.getJSON())
//       .then((jsonData) => onLoad && onLoad(JSON.stringify(jsonData)))
//       .catch((e) => {
//         if (e && e.message) {
//           e.message = `flat error: ${e?.message}, not loaded from scoreId, score: ${JSON.stringify(score)}`;
//           if (debugMsg) {
//             e.message = `${e?.message}, debugMsg: ${debugMsg}`;
//           }
//         } else if (debugMsg) {
//           console.error('debugMsg', debugMsg);
//           if (score) {
//             console.error('score', score);
//           }
//         }
//         console.error('score not loaded from scoreId');
//         console.error('score', score);
//         throw e;
//       });
//     } else {
//       const embedObject = new Embed(editorRef.current);
//     }


//   }, [editorRef.current]);

//   return <div ref={editorRef} />;
// }

// export default React.memo(FlatMelodyViewer);

import React, { useEffect, useState, useRef } from 'react';
import Embed from 'flat-embed';

function FlatMelodyViewer({
  height = 400,
  width = '100%',
  score,
  onLoad,
  flatJSON,
}) {
  const [embed, setEmbed] = useState(null);
  const editorRef = useRef(null);
  const [lastJSON, setLastJSON] = useState(null);

  const [, forceUpdate] = useState(0); // Force re-render trick

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
    autoResize: true,
  };

  useEffect(() => {
    if (!editorRef.current) {
      console.error("Editor reference is null! Flat.IO can't attach.");
      return;
    }

    console.log("Initializing Flat.io Viewer");
    console.log("Flat.io Container Dimensions:", editorRef.current?.offsetWidth, editorRef.current?.offsetHeight);

    const embedObject = new Embed(editorRef.current, {
      height: `${height}`,
      width,
      embedParams,
    });
    setEmbed(embedObject);

    embedObject.ready()
      .then(() => {
        console.log("Flat.io is ready!");
        if (score) {
          const loadParams = { score: score.scoreId };
          if (score.sharingKey) {
            loadParams.sharingKey = score.sharingKey;
          }
          return embedObject.loadFlatScore(loadParams);
        }
      })
      .then(() => embedObject.getJSON())
      .then((jsonData) => {
        if (onLoad) {
          onLoad(jsonData);
        }
      })
      .catch((e) => {
        console.error("Flat.io Initialization Error:", e);
      });

    return () => {
      console.log("Unmounting Flat.io");
      if (editorRef.current) {
        const parent = editorRef.current.parentNode;
        parent.removeChild(editorRef.current);
        const newDiv = document.createElement('div');
        newDiv.style.width = width;
        newDiv.style.height = `${height}px`;
        parent.appendChild(newDiv);
        editorRef.current = newDiv;
      }
      setEmbed(null);
    };
  }, [score]);

  useEffect(() => {
    if (flatJSON) {
      console.log("Incoming flatJSON (size):", flatJSON, "Size:", JSON.stringify(flatJSON).length);

      // Check if the flatJSON has changed before attempting a reload
      if (embed && JSON.stringify(flatJSON) !== JSON.stringify(lastJSON)) {
        setLastJSON(flatJSON);
        console.log("flatJSON has changed, attempting to load into Flat.IO...");

        // Check if editorRef is valid and perform re-initialization only if needed
        if (editorRef.current) {
          const parent = editorRef.current.parentNode;
          const newDiv = document.createElement('div');
          newDiv.style.width = width;
          newDiv.style.height = `${height}px`;
          parent.replaceChild(newDiv, editorRef.current);
          editorRef.current = newDiv;
        }

        // Initialize Flat.io Embed with the new JSON
        const newEmbed = new Embed(editorRef.current, { height: `${height}`, width, embedParams });
        setEmbed(newEmbed);

        // Attempt to load the JSON into Flat.IO
        newEmbed.ready()
          .then(() => newEmbed.loadJSON(flatJSON))
          .then(() => {
            console.log("Flat.io successfully reloaded with updated JSON.");
          })
          .catch((e) => {
            console.error("Flat.io failed to reload:", e);
            console.log("Current JSON Payload:", flatJSON);
          });
      }
    }
  }, [flatJSON, embed]);

  return (
    <div
      ref={editorRef}
      style={{ width, height }}
    />
  );
}

export default React.memo(FlatMelodyViewer);
