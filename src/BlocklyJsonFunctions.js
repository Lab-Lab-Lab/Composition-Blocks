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
    const part = flatJson["score-partwise"].part[0]; // FIXME probably never fix this but maybe one day there are multiple parts
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
    console.log("Updating flatJson with newMeasures", flatJson, newMeasures);

    const updatedFlatJson = JSON.parse(JSON.stringify(flatJson));
    const part = updatedFlatJson["score-partwise"].part[0];
    const measureList = updatedFlatJson["score-partwise"]["measure-list"];
    const originalMeasures = part.measure;
    
    const durationMapping = {
        "whole": "4",
        "half": "3",
        "quarter": "2",
        "eighth": "1"
    };

    // Handle case where newMeasures is longer than original measures
    if (newMeasures.length > originalMeasures.length) {
        // Add new measures to the part
        for (let i = originalMeasures.length; i < newMeasures.length; i++) {
            const newMeasure = {
                number: (i + 1).toString(),
                note: []
            };
            
            // Generate UUID for the new measure
            const newUuid = generateUUID();
            
            // Add the UUID to the measure
            newMeasure.uuid = newUuid;
            
            // Add the measure to the part
            originalMeasures.push(newMeasure);
            
            // Add corresponding entry to measure-list if it exists
            if (measureList && measureList["score-measure"]) {
                measureList["score-measure"].push({
                    uuid: newUuid
                });
            }
        }
    } 
    // Handle case where newMeasures is shorter than original measures
    else if (newMeasures.length < originalMeasures.length) {
        // Remove excess measures from the part
        originalMeasures.splice(newMeasures.length);
        
        // Remove corresponding entries from measure-list if it exists
        if (measureList && measureList["score-measure"]) {
            measureList["score-measure"].splice(newMeasures.length);
        }
    }

    // Update notes in each measure
    newMeasures.forEach((measureNotes, index) => {
        // Clear existing notes
        originalMeasures[index].note = [];
        
        if (Array.isArray(measureNotes)) {
            measureNotes.forEach(noteData => {
                const newNote = {};

                if (noteData.step === "rest") {
                    newNote.rest = {};
                    newNote.voice = "1";
                    newNote.staff = "1";
                    newNote.duration = durationMapping[noteData.duration];
                    newNote["$adagio-location"] = { timePos: 0 };
                    newNote.type = noteData.duration;
                } else {
                    newNote.pitch = {
                        step: noteData.step,
                        octave: noteData.octave
                    };
                    newNote.voice = "1";
                    newNote.staff = "1";
                    newNote.duration = durationMapping[noteData.duration];
                    newNote["$adagio-location"] = { timePos: 0 };
                    newNote.type = noteData.duration;
                }

                originalMeasures[index].note.push(newNote);
            });
        }
        
        // Ensure measure number is correct
        originalMeasures[index].number = (index + 1).toString();
    });

    console.log("Updated JSON measures check: ", convertFlatJsonToMeasures(updatedFlatJson));
    return updatedFlatJson;
}

// Helper function to generate UUID v4
function generateUUID() {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
        const r = Math.random() * 16 | 0;
        return r.toString(16);
    });
}

function parseBlocklyJSON(blocklyJSON) {
    const measures = [];

    let currentBlock = blocklyJSON.blocks.blocks[0]; // Start from the first measure

    while (currentBlock) {
        if (currentBlock.type === "measure" && currentBlock.inputs && currentBlock.inputs.NOTES) {
            const notes = [];
            let noteBlock = currentBlock.inputs.NOTES.block;

            // Traverse all play_sound blocks in this measure
            while (noteBlock && noteBlock.type === "play_sound") {
                notes.push({
                    "duration": noteBlock.fields.DURATION,
                    "step": noteBlock.fields.STEP,
                    "octave": noteBlock.fields.OCTAVE
                });

                noteBlock = noteBlock.next ? noteBlock.next.block : null;
            }

            measures.push(notes);
        }

        currentBlock = currentBlock.next ? currentBlock.next.block : null;
    }

    return measures;
}


function validFlatJSON(flatJSON) {
    const measures = flatJSON['score-partwise']['part'][0]['measure']; // Extract measures from JSON

    return measures.every((measure, measureIndex) => {
        return measure['note'].every(note => {
            // check that the rest property is not on the note
            return isValidNote(note) || isValidRest(note)

        })
    })
}

function isValidNote(note){
    console.log('isValidNote', note, !note.rest && note.pitch && note.pitch.step && note.pitch.step !== "rest" && note.pitch.octave !== "rest")
    return !note.rest && note.pitch && note.pitch.step && note.pitch.step !== "rest" && note.pitch.octave;
}
function isValidRest(note){
    console.log('isValidRest', note, note.rest && !note.pitch)
    return note.rest && !note.pitch;
}


export { generateBlocklyJson, convertFlatJsonToMeasures, updateFlatJsonNotes, parseBlocklyJSON, validFlatJSON};
