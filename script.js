const addButton=document.getElementById('add');

const updateLSdata = () => {

    const textareaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textareaData);
    textareaData.forEach( (note) => {
        return notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = ( text = '') => {
    const note = document.createElement('div');
    note.classList.add('note')
    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea> `;
        
    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);
    document.body.appendChild(note);

    //getting the reference
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const textarea = note.querySelector('textarea');
    const mainDiv = note.querySelector('.main');

    delButton.addEventListener('click', () => {
        note.remove();
        updateLSdata();
    });


    textarea.value=text;
    mainDiv.innerHTML=text;

    editButton.addEventListener('click', ()=> {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    }); 

    textarea.addEventListener('change', (event)=>{
        const value = event.target.value;
        mainDiv.innerHTML=value;
        
        updateLSdata();

    })
}

const notes = JSON.parse(localStorage.getItem('notes')); // Key Name
if(notes){ 
    notes.forEach((note)=> addNewNote(note))
    };


addButton.addEventListener('click', () => addNewNote());