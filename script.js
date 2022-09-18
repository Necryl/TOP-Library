// elements
const libraryElement = document.querySelector('.library');
const sampleBookElement = document.querySelector('.sample > .book');
const newBtnElement = document.querySelector('.newBtn');

// variables
let library = []

// events
newBtnElement.addEventListener('click', event => {
    doIt();
});

// constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        return [this.title, this.author, this.pages, this.read?'read':'not read yet'].join(', ');
    }
}

// functions
function addBookToLibrary() {
    let params = [];
    let prompts = ['Book title:', 'Book author:', 'Number of pages']
    for (let i = 0; i < 3; i++) {
        params.push(prompt(prompts[i]));
    }
    params.push(confirm('If you have finished reading this book then press OK, otherwise press Cancel'));
    library.push(new Book(...params));
}

function doIt(num=1) {
    for (let i = 0; i < num; i++) {
        libraryElement.appendChild(sampleBookElement.cloneNode(true));
    }
}