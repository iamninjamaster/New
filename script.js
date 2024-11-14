let currentPosition = "living room"; // Tracks which room players are in
let items = []; // Player's inventory
let puzzlesSolved = {}; // Tracks puzzles the player has solved
let locationHistory = ["Living Room"]; // Start of location history

function move() {
    const direction = prompt("Which direction would you like to move in? (Options: right, left, forward, back)").toLowerCase();

    if (currentPosition === "living room") {
        if (direction === "right") {
            alert("You entered the Kitchen.");
            currentPosition = "kitchen";
        } else if (direction === "forward") {
            alert("You entered the Hallway.");
            currentPosition = "hallway";
        } else {
            alert("There is nothing that way.");
        }
    } else if (currentPosition === "kitchen") {
        if (direction === "left") {
            currentPosition = "living room";
            alert("You are back in the living room.");
        } else {
            alert("There is nothing that way.");
        }
    } else if (currentPosition === "hallway") {
        if (direction === "back") {
            currentPosition = "living room";
            alert("You come back to the living room.");
        } else if (direction === "forward") {
            alert("You see a door at the end of the hallway. Upon closer inspection, you see it is locked.");
            currentPosition = "locked door";
        } else {
            alert("There is nothing that way.");
        }
    } else if (currentPosition === "locked door") {
        if (direction === "back") {
            currentPosition = "hallway";
            alert("You go back to the Hallway.");
        } else {
            alert("The door is locked; you cannot open it.");
        }
    }

    updatePosition();
}

function checkPosition() {
    let description = "";

    switch (currentPosition) {
        case "living room":
            description = "You are in the Living Room. There's a strange painting on the wall.";
            break;
        case "kitchen":
            description = "You are in the Kitchen. You notice a locked drawer.";
            break;
        case "hallway":
            description = "You are in the Hallway. There's a small table with a note.";
            break;
        case "locked door":
            description = "You stand before a locked door. It has a code panel.";
            break;
    }

    document.getElementById("status").innerText = description;
}

function inspect() {
    let itemToInspect = prompt("What would you like to inspect? (Options: painting, drawer, table, door)").toLowerCase();

    if (currentPosition === "living room" && itemToInspect === "painting") {
        alert("The painting has a riddle below it. Try solving the riddle.");
    } else if (currentPosition === "kitchen" && itemToInspect === "drawer") {
        alert("The drawer is locked. You will need a key to open it.");
    } else if (currentPosition === "hallway" && itemToInspect === "table") {
        alert("There's a note on the table. You read it and see it is a clue for finding a key.");
        items.push("note");
    } else if (currentPosition === "locked door" && itemToInspect === "door") {
        alert("After close inspection, you peel away a panel revealing a hidden code pad that requires a code to unlock.");
    } else {
        alert("That item is not in this room. Maybe check a different room.");
    }
}

function useItem() {
    if (currentPosition === "kitchen" && items.includes("drawer key")) {
        alert("You use the drawer key and find a piece of paper with a code.");
        items.push("code paper");
    } else if (currentPosition === "locked door" && items.includes("code paper")) {
        alert("You use the code on the panel, and the door unlocks. You've escaped!");
        endGame();
    } else if (currentPosition === "hallway" && items.includes("note")) {
        alert("The note reads: 'Look for a key under the table in the Living Room.'");
    } else if (currentPosition === "living room" && items.includes("drawer key")) {
        alert("You found the drawer key under the table.");
        items.push("drawer key");
    } else {
        alert("There's nothing to use here.");
    }
}

function inventory() {
    if (items.length === 0) {
        alert("Your inventory is empty.");
    } else {
        alert("Inventory: " + items.join(", "));
    }
}

function solvePuzzle() {
    if (currentPosition === "living room" && !puzzlesSolved["painting"]) {
        const answer = prompt("There’s a riddle by the painting: 'What runs but never walks?'").toLowerCase();
        if (answer === "water" || answer === "river") {
            alert("Correct! A key falls out from behind the painting.");
            puzzlesSolved["painting"] = true;
            items.push("drawer key");
        } else {
            alert("Incorrect answer.");
        }
    } else {
        alert("No puzzles to solve here.");
    }
}

function getHint() {
    let hint = "";

    switch (currentPosition) {
        case "living room":
            hint = puzzlesSolved["painting"]
                ? "Maybe there’s something hidden under the table."
                : "The painting might have a hidden message. Try solving its riddle.";
            break;
        case "kitchen":
            hint = items.includes("drawer key")
                ? "Use the key on the drawer to see what's inside."
                : "You might need a key to open the drawer.";
            break;
        case "hallway":
            hint = items.includes("note")
                ? "The note has instructions for where to find the key."
                : "There might be something useful on the table.";
            break;
        case "locked door":
            hint = items.includes("code paper")
                ? "Try using the code on the door’s panel."
                : "You'll need a code to unlock this door. Search other areas.";
            break;
        default:
            hint = "No hints available here.";
    }

    alert(hint);
}

function updatePosition() {
    locationHistory.push(currentPosition);
    document.getElementById("locationHistory").innerText = `Location History: ${locationHistory.map(pos => pos.charAt(0).toUpperCase() + pos.slice(1)).join(", ")}`;
}

function clearHistory() {
    locationHistory = [currentPosition];
    document.getElementById("locationHistory").innerText = `Location History: ${currentPosition.charAt(0).toUpperCase() + currentPosition.slice(1)}`;
}

function endGame() {
    alert("Congratulations! You've escaped the complex room.");
    document.getElementById("position").innerText = "Game Over";
    document.getElementById("status").innerText = "Thank you for playing!";
    locationHistory = [];
    document.getElementById("locationHistory").innerText = "";
}
