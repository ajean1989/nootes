export class ElementView{

    static form (){

        let middleSelector = document.querySelector(`.Private__content__middle`);

        let form = document.createElement('form'); 

        form.className = 'modifyForm'
        form.action = '';

        let textarea = document.createElement('textarea');
        textarea.className='modifyForm--textarea'
        textarea.name = 'content';
       

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
        typeOption[6].value = '<pre><code>';
        typeOption[6].textContent = 'code';


        typeOption[1].setAttribute('selected', "");
       
        form.appendChild(typeSelect);

        middleSelector.replaceChild(form, addContent);
    }
}