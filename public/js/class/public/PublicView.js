import  { Public } from '../../index.js';
import  { contentView } from '../contentView.js';


export class PublicView{

    constructor(step=1){
        this.step = step;
    }


    leftView(resultArray){
        const leftUlSelector = document.querySelector('.public__content__left ul');
        const leftTitleSelector = document.querySelector('.public__content__left h3');
        const rightSelector = document.querySelector('.public__content__right');
        rightSelector.textContent = '';

        let resultArray_length = 0;

        // On efface ce qui pré-éxistait

        while (leftUlSelector.firstChild) {
            leftUlSelector.removeChild(leftUlSelector.firstChild);
        }

        // Ajout li + listener

        if(this.step === 1) // resultArray = outsideContent
        {
            leftTitleSelector.textContent = '';

            for(let i in resultArray)
            {
                const leftLi = document.createElement('li');
                leftLi.id = 'public__noteName__' + [i];
                leftLi.textContent = resultArray[i].username + ' ' + resultArray[i].note_name;
                leftUlSelector.appendChild(leftLi);
                resultArray_length++;
            }
            for (let i=0; i < resultArray_length; i++)
            {
            let selectedResulteLine = resultArray[i]; // {user_id, username, note_id, note_name, share}
            let elt = document.querySelector('#public__noteName__' + [i]);
            elt.addEventListener('click', ()=>{this.step++; Public.publicStep2(selectedResulteLine)})
            }

            this.middleView();
        }
        else if(this.step === 2)    // resultArray = insideContent
        {
            leftTitleSelector.textContent = Public.username + ' - ' + Public.note_name;
            leftTitleSelector.addEventListener('click', Public.publicStep1);

            for(let i in resultArray)
            {
                const leftLi = document.createElement('li');
                leftLi.id = 'public__pageName__' + [i];
                leftLi.textContent = resultArray[i].page_name;
                leftUlSelector.appendChild(leftLi);
                resultArray_length++;
            }

            for (let i=0; i < resultArray_length; i++)
            {
                let selectedResulteLine = resultArray[i]; // {user_id, username, note_id, note_name, share}
                let elt = document.querySelector('#public__pageName__' + [i]);
                elt.addEventListener('click', ()=>{this.step++;this.middleView(selectedResulteLine, resultArray)})
            }

            this.middleView();
        }
    }


    
        
    middleView(selectedResulteLine, insideContent){ // {}, [{},{},{}]

        const middleSelector = document.querySelector('.public__content__middle');
        const rightSelector = document.querySelector('.public__content__right');
        rightSelector.textContent = '';


        if(this.step === 1)         // resultArray = outsideContent
        {
            middleSelector.textContent = 'Veuillez Sélectionner une note'
        }
        else if(this.step === 2)    // resultArray = insideContent
        {
            middleSelector.textContent = 'Veuillez Sélectionner une page'
        }
        else if(this.step === 3)    // resultArray = insideContent
        {
            let selectedContent = insideContent.filter(el => el.page_id = selectedResulteLine.page_id)

            let i=0;
            middleSelector.textContent = '';

            while(i < selectedContent.length)       //Parcours tout le tableau insideContent
            {

                for(let j=1; j<=selectedContent.length; j++)    //Recherhce la position 1, l'affiche
                {                                               //Position 2, l'affiche  ... 
                    if(selectedContent[j-1].position === j)
                    {
                        let k = j-1;
                        middleSelector.innerHTML += '<' + selectedContent[j-1].type + ' id="' + k + '">' + selectedContent[j-1].content + '</' + selectedContent[j-1].type + '>';
                    }
                }
                i++;
            }

            contentView.summary();
        }
    }
}

