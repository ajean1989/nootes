import { Private } from "../index.js";

export class ElementView{

    static form (firstLi, toReplace, insideContentLine, type, pageClicked){
        //()


        let middleSelector = document.querySelector(`.Private__content__middle`);


        let form = document.createElement('form'); 
        form.id = 'contentForm'
        form.action = '';
        

        let textarea = document.createElement('textarea');
        textarea.id='contentForm--textarea'
        textarea.name = 'content';
        if(type === 'modify'){
            textarea.value = insideContentLine.content;
        }
        
     
       

        form.appendChild(textarea);
       
        let typeSelect = document.createElement('select');
        typeSelect.name = 'type';

        let typeOption =[];

        typeOption[0] = document.createElement('option');
        typeOption[0].value = 'h1';
        typeOption[0].textContent = 'Titre1';

        typeOption[1] = document.createElement('option');
        typeOption[1].value = 'h2';
        typeOption[1].textContent = 'Titre2';

        typeOption[2] = document.createElement('option');
        typeOption[2].value = 'h3';
        typeOption[2].textContent = 'Titre3';

        typeOption[3] = document.createElement('option');
        typeOption[3].value = 'h4';
        typeOption[3].textContent = 'Titre4';

        typeOption[4] = document.createElement('option');
        typeOption[4].value = 'h5';
        typeOption[4].textContent = 'Titre5';

        typeOption[5] = document.createElement('option');
        typeOption[5].value = 'p';
        typeOption[5].textContent = 'Paragraphe';

        typeOption[6] = document.createElement('option');
        typeOption[6].value = 'code';
        typeOption[6].textContent = 'code';

        for(let l=0; l<7; l++){
            typeSelect.appendChild(typeOption[l]);
            if(type === 'modify')
            {
                if(insideContentLine.type === typeOption[l].value){
                    typeOption[l].setAttribute('selected', "");
                }
            }
            else 
            {
                typeOption[0].setAttribute('selected', "");
            }
        }
       
        form.appendChild(typeSelect);


        // Bouton delete

        let deleteButton = document.createElement('button');
        deleteButton.id='btn--delete';
        deleteButton.textContent = '-';
        form.appendChild(deleteButton);



        // Bouton img

        let image = document.createElement('input');
        image.type = 'file';
        //image.value = 'img';
        form.appendChild(image);

        if(type ==='modify'){
            firstLi.replaceChild(form, toReplace);
            textarea.focus();
        }
        else{
            middleSelector.replaceChild(form, toReplace);
            textarea.focus();
        }
    }


    static notePageForm(type, what, outside, elt){
        let leftUlSelector = document.querySelector(`.Private__content__left ul`);
        let btnAdd = document.querySelector('#btn--left--add');
    


        let notePageForm = document.createElement('form');
        notePageForm.id = 'form--NotePage';

        let input = document.createElement('input');
        input.name = 'input';
        input.id = 'input--add--NotePage';



        if(type === 'modify'){
            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = '-';
            deleteBtn.id = 'btn--outside--delete';
            notePageForm.appendChild(deleteBtn);
            if(what === 'note'){ 
                input.value = outside.note_name;
            }
            else if(what === 'page'){
                input.value = outside.page_name;
            }
        }

        notePageForm.appendChild(input);

        
        if(type === 'add'){
            leftUlSelector.replaceChild(notePageForm, btnAdd);
            input.focus();
        }
        else if(type === 'modify' && what === 'note'){
            leftUlSelector.replaceChild(notePageForm, elt);
            input.focus();
        }
        else if(type === 'modify' && what === 'page'){
            leftUlSelector.replaceChild(notePageForm, elt);
            input.focus();
        }



    }


    static closeModalInfo(){
        let closeBtn = document.getElementById('btn--close_infomodal');
        let infoModal = document.getElementById('dialog__info');
        closeBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            infoModal.close();
        })
    }
}