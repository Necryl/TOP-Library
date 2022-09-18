// elements
const libraryElement = document.querySelector('.library');
const sampleBookElement = document.querySelector('.sample > .book');
const newBtnElement = document.querySelector('.newBtn');
const statsElements = [...document.querySelectorAll('.stats>*')];
const formInputElements = [...document.querySelectorAll('form input')];
const formBtnElement = document.querySelector('.formBtn');
const promptWrapperElement = document.querySelector('.prompt-wrapper');
const cancelFormBtn = document.querySelector('.cancelBtn');

// variables
let library = []

// events
newBtnElement.addEventListener('click', event => {
    promptWrapperElement.setAttribute('style', 'display: grid');
});
formBtnElement.addEventListener('click', event => {
    promptWrapperElement.setAttribute('style', 'display: none')
    let data = [];
    formInputElements.forEach((element, index) => {
        if (index === 3) {
            data.push(element.checked);
        } else {
            data.push(element.value);
        }
    })
    clearInputs();
    addBookToLibrary(...data);
})

cancelFormBtn.addEventListener('click', event => {
    cancelForm();
})



// constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.element = createBookElem(title, author, pages, read);

    libraryElement.appendChild(this.element);

    this.info = () => {
        return [this.title, this.author, this.pages, this.read?'read':'not read yet'].join(', ');
    }
}

// functions
function addBookToLibrary() {
    let params = [...arguments];
    if (params.length === 0) {
        params = askBookDetails();
    }
    library.push(new Book(...params));
    updateStats();
}

function addSampleBook(num=1) {
    for (let i = 0; i < num; i++) {
        addBookToLibrary('Sample Title', 'Author Name', 'x', false);
    }
}

function createBookElem(title, author, pages, read) {
    let result = sampleBookElement.cloneNode(true);

    result.childNodes[1].setAttribute('libIndex', `${library.length}`);
    result.childNodes[1].addEventListener('click', event => {
        removeBook(event.target.getAttribute('libIndex'));
    })
    result.childNodes[3].textContent = title;
    result.childNodes[5].textContent = author;
    result.childNodes[7].textContent = `Pages: ${pages}`;
    let readSpan = result.childNodes[9].childNodes[1];
    readSpan.setAttribute('libIndex', `${library.length}`);
    toggleRead(readSpan, read);
    readSpan.addEventListener('click', event => {
        toggleRead(event.target);
    })

    return result;
}

function toggleRead(elem, read=null, newElem=false) {
    if (read === null) {
        read = elem.textContent === 'Yes' ? false:true;
    } else {
        newElem = true;
    }
    if (!newElem) {
        library[elem.getAttribute('libIndex')].read = read;
    }
    if (read) {
        elem.classList.add('read');
        read = 'Yes';
    } else {
        elem.classList.remove('read');
        read = 'Not yet';
    }
    elem.textContent = read;
    updateStats();
}

function askBookDetails() {
    let params = [];
    let prompts = ['Book title:', 'Book author:', 'Number of pages']
    for (let i = 0; i < 3; i++) {
        params.push(prompt(prompts[i]));
    }
    params.push(confirm('If you have finished reading this book then press OK, otherwise press Cancel'));
    
    return params;
}

function removeBook(index) {
    library[index].element.remove();
    library.splice(index, 1);
    library.forEach((book, index) => {
        book.element.childNodes[1].setAttribute('libIndex', index);
        book.element.childNodes[9].childNodes[1].setAttribute('libIndex', index);
    });
    updateStats();
}

function updateStats() {
    let stats = [library.length, 0, 0];

    library.forEach(book => {
        if (book.read) {
            stats[1]++;
        } else {
            stats[2]++;
        }
    })

    statsElements.forEach((element, index) => {
        element.textContent = element.textContent.slice(0, element.textContent.length-1) + stats[index];
    });
}

function clearInputs() {
    formInputElements.forEach((element, index) => {
        if (index === 3) {
            element.checked = false;
        } else {
            element.value = '';
        }
    })
}

function cancelForm() {
    promptWrapperElement.setAttribute('style', 'display: none');
    clearInputs();
}

//on start
addSampleBook();