// Function to hide all sections
function hideAllSections() {
    document.getElementById('about-section').style.display = 'none';
    document.getElementById('projects-section').style.display = 'none';
    document.getElementById('other-projects-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'none';
}

// Add event listeners for each link
document.getElementById('about-link').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('about-section').style.display = 'block';
});

document.getElementById('projects-link').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('projects-section').style.display = 'block';
});

document.getElementById('other-projects-link').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('other-projects-section').style.display = 'block';
});

document.getElementById('contact-link').addEventListener('click', function() {
    hideAllSections();
    document.getElementById('contact-section').style.display = 'block';
});

// Store the block's current grid position
let blockPositions = {
    'blockA': { row: 1, col: 1, rowSpan: 2, colSpan: 1 },
    'blockB': { row: 1, col: 2, rowSpan: 2, colSpan: 2 },
    'blockC': { row: 1, col: 4, rowSpan: 2, colSpan: 1 },
    'blockD': { row: 3, col: 1, rowSpan: 2, colSpan: 1 },
    'blockE': { row: 3, col: 2, rowSpan: 1, colSpan: 2 },
    'blockF': { row: 3, col: 4, rowSpan: 2, colSpan: 1 },
    'blockG': { row: 4, col: 2, rowSpan: 1, colSpan: 1 },
    'blockH': { row: 4, col: 3, rowSpan: 1, colSpan: 1 },
    'blockI': { row: 5, col: 1, rowSpan: 1, colSpan: 1 },
    'blockJ': { row: 5, col: 4, rowSpan: 1, colSpan: 1 }
};


let currentlyDragging = null;
let offsetX = 0;
let offsetY = 0;

document.querySelectorAll('.block').forEach(block => {
    block.addEventListener('mousedown', (event) => {
        console.log('Mouse down on block:', block.id);
        currentlyDragging = block.id;

        event.preventDefault();
        const rect = block.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
        


        console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`);
        console.log(`Initial Position: ${block.style.left}, ${block.style.top}`);
        

        block.style.position = 'absolute';
        
        block.style.zIndex = '10';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

function onMouseMove(event) {
    console.log('Mouse move detected');
    if (currentlyDragging) {
        const block = document.getElementById(currentlyDragging);
        block.style.left = `${(event.clientX - offsetX -285)}px`;
        block.style.top = `${(event.clientY - offsetY-235)}px`;
    }
}

function onMouseUp(event) {
    console.log('Mouse up detected');
    if (currentlyDragging) {
        const block = document.getElementById(currentlyDragging);
        const newRow = Math.ceil((event.clientY - 245) / 100);
        const newCol = Math.ceil((event.clientX - 285) / 100);
        console.log(`New Row: ${newRow}, New Col: ${newCol}`);
        // Determine the block's dimensions
        const blockPos = blockPositions[currentlyDragging];
        const rowSpan = blockPos.rowSpan;
        const colSpan = blockPos.colSpan;

        if (canMoveBlock(currentlyDragging, newRow, newCol)) {
            if (offsetY >100 && offsetX < 100) {
                blockPositions[currentlyDragging] = {
                    row: newRow - 1,
                    col: newCol,
                    rowSpan: rowSpan,
                    colSpan: colSpan // Ensure we keep the original dimensions
                };
                updateBlockPosition(block)}
            else if (offsetY < 100 && offsetX > 100 ) {
                blockPositions[currentlyDragging] = {
                    row: newRow,
                    col: newCol - 1,
                    rowSpan: rowSpan,
                    colSpan: colSpan // Ensure we keep the original dimensions
                };
                updateBlockPosition(block)
            }
            else if (offsetY > 100 && offsetX > 100 ) {
                blockPositions[currentlyDragging] = {
                    row: newRow - 1 ,
                    col: newCol - 1,
                    rowSpan: rowSpan,
                    colSpan: colSpan // Ensure we keep the original dimensions
                };
                updateBlockPosition(block)
            }
            else {
                console.log("lol")
                blockPositions[currentlyDragging] = {
                    row: newRow,
                    col: newCol,
                    rowSpan: rowSpan,
                    colSpan: colSpan // Ensure we keep the original dimensions
                };
                updateBlockPosition(block)
            };
            setStatusMessage("Moved Successfully");
        } else {
            setStatusMessage("Invalid Move"); // Show invalid message
        }

        block.style.position = 'static';
        block.style.zIndex = '1'; // Reset the zIndex
        currentlyDragging = null;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}

function updateBlockPosition(block) {
    const pos = blockPositions[block.id];

    // Set the grid starting position
    block.style.gridRowStart = pos.row;
    block.style.gridColumnStart = pos.col;

    // Set the row and column spans based on the block's dimensions
    block.style.gridRowEnd =pos.row +`span ${pos.rowSpan}`;
    block.style.gridColumnEnd = pos.col +`span ${pos.colSpan}`;
}

function setStatusMessage(message) {
    const statusBox = document.getElementById('status');
    statusBox.innerText = message;
    // Clear the message after 1 second
    setTimeout(() => {
        statusBox.innerText = 'Status: ';
    }, 1000);
}

function canMoveBlock(blockId, newRow, newCol) {
    let blockPos = blockPositions[blockId];

    // Check if the new position is within the grid boundaries
    if (newRow < 1 || newRow > 5 || newCol < 1 || newCol > 4) {
        return false; // Out of bounds
    }

    // Check if the new position would overlap with another block
    for (let otherBlockId in blockPositions) {
        if (otherBlockId !== blockId) {
            let otherPos = blockPositions[otherBlockId];
            if (!(newRow + blockPos.rowSpan - 1 < otherPos.row || newRow > otherPos.row + otherPos.rowSpan - 1 ||
                newCol + blockPos.colSpan - 1 < otherPos.col || newCol > otherPos.col + otherPos.colSpan - 1)) {
                return false; // Overlapping
            }
        }
    }

    return true; // No overlap, move is allowed
}
