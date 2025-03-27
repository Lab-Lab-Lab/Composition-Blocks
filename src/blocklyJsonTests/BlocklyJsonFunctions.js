function generateBlocklyJson(measures) {
    function createMeasureBlock(notes, isLast = false) {
        let measure = {
            type: "measure",
            id: crypto.randomUUID(),
            inputs: {}
        };

        if (notes.length > 0) {
            let previousNote = null;
            for (let i = 0; i < notes.length; i++) {
                let noteBlock = {
                    type: "play_sound",
                    id: crypto.randomUUID(),
                    fields: {
                        DURATION: notes[i].duration,
                        STEP: notes[i].step,
                        OCTAVE: notes[i].octave
                    }
                };
                
                if (i === 0) {
                    measure.inputs.NOTES = { block: noteBlock };
                } else {
                    previousNote.next = { block: noteBlock };
                }
                previousNote = noteBlock;
            }
        }
        
        if (!isLast) {
            measure.next = { block: null };
        }
        return measure;
    }

    let blocks = [];
    for (let i = 0; i < measures.length; i++) {
        let measure = createMeasureBlock(measures[i], i === measures.length - 1);
        if (i > 0) {
            blocks[i - 1].next.block = measure;
        }
        blocks.push(measure);
    }

    // return JSON.stringify({ blocks: { languageVersion: 0, blocks: [blocks[0]] } }, null, 4);
    return { blocks: { languageVersion: 0, blocks: [blocks[0]] } };
}

function convertFlatJsonToMeasures(flatJson) {
    const measures = [];
    
    // Navigate to the measures array
    const part = flatJson["score-partwise"].part[0];
    const measureList = part.measure;
    
    measureList.forEach(measure => {
        const notesArray = [];
        
        measure.note.forEach(note => {
            if (note.rest) {
                // Handle rests
                notesArray.push({ duration: note.type, step: "rest", octave: "rest" });
            } else {
                // Handle pitched notes
                notesArray.push({
                    duration: note.type,
                    step: note.pitch.step,
                    octave: note.pitch.octave
                });
            }
        });
        
        measures.push(notesArray);
    });
    
    return measures;
}

function updateFlatJsonNotes(flatJson, newMeasures) {
    // Clone the flatJson object to avoid mutating the original
    const updatedFlatJson = JSON.parse(JSON.stringify(flatJson));

    // Navigate to the first part (assumes there's only one part)
    const part = updatedFlatJson["score-partwise"].part[0];

    // Get the list of measures for this part
    const measures = part.measure;

    // Duration-to-type mapping
    const durationMapping = {
        "whole": "4",
        "half": "3",
        "quarter": "2",
        "eighth": "1"
    };

    // Iterate through each measure in the flatJson
    measures.forEach((measure, index) => {
        // If there is corresponding new measure data in the `newMeasures` array
        if (newMeasures[index]) {
            // Update each note in the measure
            measure.note.forEach((note, noteIndex) => {
                // Get the corresponding new note data from `newMeasures`
                const newNoteData = newMeasures[index][noteIndex];

                // Update the note with the new duration, step, and octave values
                if (newNoteData) {
                    if (newNoteData.step === "rest") {
                        // Handle rest note - no pitch, only rest, duration, and type
                        note["rest"] = {};
                        note["voice"] = "1";
                        note["staff"] = "1";
                        // Duration is number, type is word
                        note["duration"] = durationMapping[newNoteData.duration];
                        note["$adagio-location"] = {
                            "timePos": 0
                        };
                        note["type"] = newNoteData.duration;  // Match the type to the duration
                    } else {
                        // Handle regular notes with pitch
                        note["pitch"] = {
                            octave: newNoteData.octave,
                            step: newNoteData.step
                        };
                        // Duration is number, type is word
                        note["duration"] = durationMapping[newNoteData.duration];
                        note["voice"] = "1";
                        note["staff"] = "1";
                        note["$adagio-location"] = {
                            "timePos": 0
                        };
                        note["type"] = newNoteData.duration;  // Match the type to the duration
                    }
                }
            });
        }
    });

    return updatedFlatJson;
}

function parseBlocklyJSON(blocklyJSON) {
    const measures = [];

    let currentBlock = blocklyJSON.blocks.blocks[0]; // Start from the first measure

    while (currentBlock) {
        if (currentBlock.type === "measure" && currentBlock.inputs && currentBlock.inputs.NOTES) {
            const noteBlock = currentBlock.inputs.NOTES.block;
            if (noteBlock && noteBlock.type === "play_sound") {
                measures.push([
                    {
                        "duration": noteBlock.fields.DURATION,
                        "step": noteBlock.fields.STEP,
                        "octave": noteBlock.fields.OCTAVE
                    }
                ]);
            }
        }
        currentBlock = currentBlock.next ? currentBlock.next.block : null;
    }

    return measures;
}


export { generateBlocklyJson, convertFlatJsonToMeasures, updateFlatJsonNotes, parseBlocklyJSON};
