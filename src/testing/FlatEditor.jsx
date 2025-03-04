import React, { useEffect, useState, useRef, useMemo } from 'react';
import Embed from 'flat-embed';

function FlatEditor({
  height = 400,
  width = '100%',
  flatJSON,
  onScoreUpdate,
}) {
  const [embed, setEmbed] = useState(null);
  const editorRef = useRef(null);
  // const [lastJSON, setLastJSON] = useState(null);
  console.log("FlatEditor: flatJSON:", flatJSON);

  const embedParams = useMemo(() => ({
    appId: '60a51c906bcde01fc75a3ad0',
    mode: 'edit',
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
  }), []);

  useEffect(() => {
    if (!editorRef.current) {
      console.error("Editor reference is null! Flat.IO can't attach.");
      return;
    }
    if (!embed) {
      const embedObject = new Embed(editorRef.current, {
        height: `${height}`,
        width,
        embedParams,
      });
      embedObject.ready().then(() => setEmbed(embedObject));
    } else {
      embed
        .ready()
        .then(() => {
          embed.off('cursorPosition');
          embed.on('cursorPosition', (ev) => {
            console.log('Cursor Position:', ev);
            embed.getJSON().then((json) => {
              console.log('JSON:', json);
              if (onScoreUpdate && JSON.stringify(json) !== JSON.stringify(flatJSON)) {
                console.log('would update')
                onScoreUpdate(json);
              }
            });
          });
          // embed.off('noteDetails');
          // embed.on('noteDetails', (ev) => {
          //   console.log('noteDetails:', ev);
          // });
          embed.loadJSON(flatJSON);
        })
        .catch((e) => {
          console.error("Flat.io Initialization Error:", e);
        });
    }
  }, [editorRef, embed, embedParams, flatJSON, height, width]);



  // useEffect(() => {
  //   if (flatJSON) {
  //     console.log("Incoming flatJSON (size):", flatJSON, "Size:", JSON.stringify(flatJSON).length);

  //     // Check if the flatJSON has changed before attempting a reload
  //     if (embed && JSON.stringify(flatJSON) !== JSON.stringify(lastJSON)) {
  //       setLastJSON(flatJSON);
  //       console.log("flatJSON has changed, attempting to load into Flat.IO...");

  //       // // Check if editorRef is valid and perform re-initialization only if needed
  //       // if (editorRef.current) {
  //       //   const parent = editorRef.current.parentNode;
  //       //   const newDiv = document.createElement('div');
  //       //   newDiv.style.width = width;
  //       //   newDiv.style.height = `${height}px`;
  //       //   parent.replaceChild(newDiv, editorRef.current);
  //       //   editorRef.current = newDiv;
  //       // }

  //       // Initialize Flat.io Embed with the new JSON
  //       const newEmbed = new Embed(editorRef.current, { height, width, embedParams });
  //       setEmbed(newEmbed);

  //       // Attempt to load the JSON into Flat.IO
  //       newEmbed.ready()
  //         .then(() => newEmbed.loadJSON(flatJSON))
  //         .then(() => {
  //           console.log("Flat.io successfully reloaded with updated JSON.");
  //         })
  //         .catch((e) => {
  //           console.error("Flat.io failed to reload:", e);
  //           console.log("Current JSON Payload:", flatJSON);
  //         });
  //     }
  //   }
  // }, [flatJSON, embed, lastJSON, height, width, embedParams]);

  return (
    <div
      ref={editorRef}
    />
  );
}

export default React.memo(FlatEditor);