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
