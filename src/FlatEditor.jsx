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
                console.log('would update', json);
                onScoreUpdate(json);
              }
            });
          });
          console.log("FlatEditor attempting to load: flatJSON:", flatJSON);
          embed.loadJSON(flatJSON);
          console.log("FlatEditor loaded: flatJSON", flatJSON);
        })
        .catch((e) => {
          console.error("Flat.io Initialization Error:", e);
        });
    }
  }, [editorRef, embed, embedParams, flatJSON, height, width]);

  return (
    <div
      ref={editorRef}
    />
  );
}

export default React.memo(FlatEditor);