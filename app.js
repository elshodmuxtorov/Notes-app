const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".inputBox");

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes") || ""; // Use a fallback to avoid null content
    attachEventsToNotes(); // Ensure events are attached after loading notes
}
showNotes();

createBtn.addEventListener("click", () => {
    createNote();
});

function createNote(content = "") {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "inputBox";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerHTML = content; // Set initial content if provided
    img.src = "images/delete.png";
    img.className = "delete-btn";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    attachEventsToNotes(); // Ensure the new note has events attached
    updateStorage(); // Save the new note immediately
}

function attachEventsToNotes() {
    notes = document.querySelectorAll(".inputBox");
    notes.forEach(note => {
        note.oninput = function () {
            ensureDeleteButton(note); // Re-add delete button if removed
            updateStorage();
        };
    });
}

function ensureDeleteButton(note) {
    if (!note.querySelector(".delete-btn")) {
        let img = document.createElement("img");
        img.src = "images/delete.png";
        img.className = "delete-btn";
        note.appendChild(img);
    }
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentNode.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
