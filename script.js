const container = document.querySelector('#container');
const addBook = document.querySelector('#add-book');
const detailsContainer = document.querySelector('#details-container');
const input = document.getElementsByTagName('input');

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    toggleStatus() {
        if (this.read === 'Read') {
            this.read = 'Not read';
        } else {
            this.read = 'Read';
        }
    }
}


if(!localStorage.getItem('myLibrary')) {
    populateStorage();
} else {
    displayBooks();
}

function populateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function addBookToLibrary() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');
    if(read.checked) {
        read.value = 'Read';
    } else {
        read.value = 'Not read';
    }
    const newBook = new Book(title.value, author.value, pages.value, read.value);
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary.forEach(book => Object.setPrototypeOf(book, Book.prototype));
    myLibrary.push(newBook);
    populateStorage();
}

function displayBooks() {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    myLibrary.forEach(book => Object.setPrototypeOf(book, Book.prototype));
    for(let i = 0; i < myLibrary.length; i++) {
        if(container.childElementCount === i) {
            const bookCard = document.createElement('div');
            bookCard.setAttribute('style', 'margin: 20px; height: 220px; width: 200px;');
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
            const remove = document.createElement('button');
            remove.id = 'remove';
            remove.textContent = 'Remove';
            remove.addEventListener('click', () => {
                myLibrary.forEach(book => {
                    if(book.title === bookTitle.textContent) {
                        myLibrary.splice(myLibrary.indexOf(book), 1);
                        populateStorage();
                    }
                });
                container.removeChild(bookCard);
            });
            const status = document.createElement('button');
            status.id = 'status';
            if(bookRead.textContent === 'Read') {
                status.textContent = 'Not read';
            } else {
                status.textContent = 'Read';
            }
            status.addEventListener('click', () => {
                myLibrary[i].toggleStatus();
                populateStorage();
                bookRead.textContent = myLibrary[i].read;
                if(status.textContent === 'Read') {
                    status.textContent = 'Not read';
                } else {
                    status.textContent = 'Read';
                }
            });
            const buttonsContainer = document.createElement('div');
            buttonsContainer.id = 'buttons-container';
            buttonsContainer.appendChild(remove);
            buttonsContainer.appendChild(status);
            bookCard.appendChild(bookTitle);
            bookCard.appendChild(bookDetails);
            bookCard.appendChild(buttonsContainer)
            container.appendChild(bookCard);
        }
    };
}

function toggleRequired(detailsClass) {
    if(detailsClass === 'details active') {
        for(i = 0; i < input.length; i++){
            if(input[i].type !== 'checkbox') {
                input[i].required = true;
            }
        }
    } else {
        for(i = 0; i < input.length; i++){
            input[i].required = false;
        }
    }
}

function submitForm() {
    addBookToLibrary();
    displayBooks();
    detailsContainer.classList.toggle('active');
    toggleRequired(detailsContainer.className);
    if(detailsContainer.className === 'details') {
        for(i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    }
}

addBook.addEventListener('click', () => {
    detailsContainer.classList.toggle('active');
    toggleRequired(detailsContainer.className);
});
