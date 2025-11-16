const myLibrary = [];
const libraryContainer = document.querySelector(".container");

function Book(title, author, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
  this.ID = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}

function createBookElement(el, content) {
  const element = document.createElement(el);
  element.textContent = content;
  return element;
}

function createBookCard() {
  libraryContainer.textContent = ""; // clear container

  myLibrary.forEach((book) => {
    // Create Card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Add Title to Card
    const titleEl = createBookElement("h3", `Book Title: ${book.title}`);
    bookCard.appendChild(titleEl);

    // Add Details to Card
    const bookDetails = document.createElement("div");
    bookDetails.classList.add("book-details");

    bookDetails.appendChild(createBookElement("p", `Book ID: ${book.ID}`));
    bookDetails.appendChild(
      createBookElement("p", `Book Author: ${book.author}`)
    );
    bookDetails.appendChild(
      createBookElement("p", `Book Pages: ${book.pages}`)
    );

    bookCard.appendChild(bookDetails);

    // Create buttons
    const bookButtons = document.createElement("div");
    bookButtons.classList.add("book-btn");

    const readBtn = createBookElement(
      "button",
      book.isRead ? "Read" : "Unread"
    );
    readBtn.classList.add(
      book.isRead ? "book-read-btn" : "book-unread-btn",
      "toggle"
    );

    const deleteBtn = createBookElement("button", "Delete Book");
    deleteBtn.classList.add("book-delete-btn");

    // Add button functionality
    readBtn.addEventListener("click", (e) => {
      book.toggleReadStatus();
      e.target.textContent = book.isRead ? "Read" : "Unread";
      e.target.classList.toggle("book-read-btn", book.isRead);
      e.target.classList.toggle("book-unread-btn", !book.isRead);
    });

    deleteBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.ID === book.ID);
      myLibrary.splice(index, 1);
      displayBooks(); // refresh UI
    });

    bookButtons.appendChild(readBtn);
    bookButtons.appendChild(deleteBtn);

    bookCard.appendChild(bookButtons);

    // Append finished card to container
    libraryContainer.appendChild(bookCard);
  });
}

const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".book-new-btn");
const submitBookBtn = document.querySelector(".form-submit-btn");
const cancelBookBtn = document.querySelector(".form-cancel-btn");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBookBtn.addEventListener("click", () => {
  dialog.close();
});

submitBookBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let title = document.querySelector("#book-title-input").value;
  let author = document.querySelector("#book-author-input").value;
  let pages = document.querySelector("#book-pages-input").value;

  addBookToLibrary(title, author, pages);
  dialog.close();
  document.querySelector("#book-form").reset();
  displayBooks();
});

function displayBooks() {
  if (myLibrary.length === 0) {
    libraryContainer.textContent = "";
    const emptyMessage = createBookElement(
      "h2",
      "Your library is currently empty"
    );
    emptyMessage.classList.add("empty-message");
    libraryContainer.appendChild(emptyMessage);
  } else {
    createBookCard();
  }
}

displayBooks();

let count = 0;
const color = document.querySelector(".color-btn");
const root = document.documentElement;

color.addEventListener("click", () => {
  count += 1;
  if (count % 2 == 0) {
    color.textContent = "Light Mode";
    root.style.setProperty("--text-color", "black");
    root.style.setProperty("--background-color", "white");
    root.style.setProperty("--new-btn-hover-color", "rgb(247, 235, 235)");
    root.style.setProperty("--del-btn-hover-color", "rgb(48, 47, 47)");
    root.style.setProperty(
      "--background-header",
      "url(images/light-mode-header.jpg)"
    );
    root.style.setProperty(
      "--background-container",
      "url(images/light-mode-library.jpg)"
    );
    root.style.setProperty(
      "--message-background-color",
      "rgba(255, 255, 255, 0.5)"
    );
  } else {
    color.textContent = "Dark Mode";
    root.style.setProperty("--text-color", "white");
    root.style.setProperty("--background-color", "black");
    root.style.setProperty("--new-btn-hover-color", "rgb(48, 47, 47)");
    root.style.setProperty("--del-btn-hover-color", "rgb(247, 235, 235)");
    root.style.setProperty(
      "--background-header",
      "url(images/dark-mode-header.jpg)"
    );
    root.style.setProperty(
      "--background-container",
      "url(images/dark-mode-library.jpg)"
    );
    root.style.setProperty("--message-background-color", "rgba(0, 0, 0, 0.5)");
  }
});
