let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
}

function addBookToLibrary() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');
    const newBook = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(newBook);
}

const container = document.querySelector('#container');

function displayBooks() {
    for(let i = 0; i < myLibrary.length; i++) {
        if(container.childElementCount === i) {
            const bookCard = document.createElement('div');
            bookCard.setAttribute('style', 'display:inline-block; margin: 20px; height: 200px; width: 200px; background-color: red');
            const bookTitle = document.createElement('h2');
            bookTitle.textContent = myLibrary[i].title;
            const bookDetails = document.createElement('ul');
            const bookAuthor = document.createElement('li');
            bookAuthor.textContent = `By ${myLibrary[i].author}`;
            const bookPages = document.createElement('li');
            bookPages.textContent = `${myLibrary[i].pages} pages`;
            const bookRead = document.createElement('li');
            bookRead.textContent = myLibrary[i].read;
            bookDetails.appendChild(bookAuthor);
            bookDetails.appendChild(bookPages);
            bookDetails.appendChild(bookRead);
            bookCard.appendChild(bookTitle);
            bookCard.appendChild(bookDetails);
            container.appendChild(bookCard);
        }
    };
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet');
const harryPotter = new Book('Harry Potter', 'J.K. Rowling', 500, 'read');
const percyJackson = new Book('Percy Jackson', 'Rick Riordan', 400, 'read');

myLibrary.push(theHobbit);
myLibrary.push(harryPotter);
myLibrary.push(percyJackson);

// displayBooks();

const addBook = document.querySelector('#addBook');

addBook.addEventListener('click', () => {
    const addTitle = document.createElement('input');
    addTitle.id = 'title';
    addTitle.name = 'title';
    addTitle.placeholder = 'Title';
    const addAuthor = document.createElement('input');
    addAuthor.id = 'author';
    addAuthor.name = 'author';
    addAuthor.placeholder = 'Author';
    const addPages = document.createElement('input');
    addPages.id = 'pages';
    addPages.name = 'pages';
    addPages.placeholder = 'Pages';
    const addRead = document.createElement('input');
    addRead.id = 'read';
    addRead.name = 'read';
    addRead.placeholder = 'Read';
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.textContent = 'Submit';
    submit.addEventListener('click', () => {
        addBookToLibrary();
        container.removeChild(addTitle);
        container.removeChild(addAuthor);
        container.removeChild(addPages);
        container.removeChild(addRead);
        container.removeChild(submit);
        displayBooks();
    });
    container.appendChild(addTitle);
    container.appendChild(addAuthor);
    container.appendChild(addPages);
    container.appendChild(addRead);
    container.appendChild(submit);
});

displayBooks();
