import { Fetch } from '../fetch.js';
import { Private } from '../../index.js';


import { PrivateData } from './PrivateData.js';

export class PrivateView{


    
    
    static connexionView =  async () => {
        const middle = document.querySelector('.private__content__middle');
        const leftSelector = document.querySelector('.private__content__left');
        const leftUlSelector = document.querySelector('.private__content__left ul');
        const lefth3Selector = document.querySelector('.private__content__left h3');
        const lefth4Selector = document.querySelector('.private__content__left h4');
        const rightSelector = document.querySelector('.private__content__right');


        // On efface le précédent formulaire (en cas d'inscription->Connexion) et autres

        while (middle.firstChild) {
            middle.removeChild(middle.firstChild);
        }

        while (leftUlSelector.firstChild) {
            leftUlSelector.removeChild(leftUlSelector.firstChild);
        }
        lefth3Selector.textContent = '';
        lefth4Selector.textContent = '';


        while (rightSelector.firstChild) {
            rightSelector.removeChild(rightSelector.firstChild);
        }


        // Création du formulaire de connexion

        let fewWords = document.createElement('h2');
        fewWords.textContent = 'Connectez-vous pour avoir accès à vos notes privées :'

        let form = document.createElement('form');
        form.id = 'form__connexion';

        let input1 = document.createElement('input');
        input1.value = 'username';
        input1.name = 'username';
        let input2 = document.createElement('input');
        input2.type = 'password';
        input2.value = 'password';
        input2.name = 'password';
        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.id = 'connexion_submit';
        let signIn = document.createElement('button');
        signIn.textContent = 'Inscription';

        middle.appendChild(fewWords);
        middle.appendChild(form);
        form.appendChild(input1);
        form.appendChild(input2);
        form.appendChild(submit);  
        middle.appendChild(signIn);


        // Soumission des données de connexion

        let selectedFormConnection = document.getElementById('form__connexion');

        let fetchConnexionData = async () => {
            let formConnexion = new FormData(selectedFormConnection);
            let fetchOptions = {method:'POST', body: formConnexion};
            let connexionData = await Fetch.jsonFetchPOST('private/connexion',fetchOptions);

            // Connexion réussie

            if(connexionData.error === 'none')
            {
                Private.connexion = connexionData.connexion;
                Private.username = connexionData.username;
                Private.mail = connexionData.mail;

                this.connnexionConfig();

                Private.outsideLoad();
            }

            // Erreur de connexion

            else
            {
                let error = document.createElement('p');
                middle.appendChild(error);
                error.textContent = connexionData.error;
            }
        }

        selectedFormConnection.addEventListener('submit', async (e) => {
            e.preventDefault();
            fetchConnexionData(selectedFormConnection)
            }); 



        // Fonction qui affiche le formulaire d'inscription

        let signInForm = () => {

            // On efface le formulaire précédent 

            while (middle.firstChild) {
                middle.removeChild(middle.firstChild);
            }


            //On créé le formulaire

            let form = document.createElement('form');
            form.id = 'form__signin';

            let input1 = document.createElement('input');
            input1.value = 'username';
            input1.name = 'username';
            let input2 = document.createElement('input');
            input2.type = 'mail';
            input2.value = 'e-mail';
            input2.name = 'mail';
            let input3 = document.createElement('input');
            input3.type = 'password';
            input3.value = 'password';
            input3.name = 'password';
            let submit = document.createElement('input');
            submit.type = 'submit';
            submit.id = 'connexion_submit';
            let connexion = document.createElement('button');
            connexion.textContent = 'Connexion';

            middle.appendChild(form);
            form.appendChild(input1);
            form.appendChild(input2);
            form.appendChild(input3);
            form.appendChild(submit);  
            form.appendChild(connexion); 


            // Retour au formulaire de connexion

            connexion.addEventListener('click', (e)=>{e.preventDefault();this.connexionView();});


            // Soumission des données d'inscription

            let selectedFormSignIn = document.getElementById('form__signin');

            async function fetchSignInData(){
                let formSignIn = new FormData(selectedFormSignIn);
                let fetchOptions = {method:'POST', body: formSignIn};
                let connexionData = await Fetch.jsonFetchPOST('private/signin',fetchOptions);
                console.log(connexionData);
            }

            selectedFormSignIn.addEventListener('submit', async (e) => {
                e.preventDefault();
                fetchSignInData(selectedFormSignIn)
                }); 
            }


        // Accès au formulaire d'inscription

        signIn.addEventListener('click', (e)=>{e.preventDefault();signInForm();});      
    } 






    static connnexionConfig(){
        let header = document.querySelector('header');
        let disconnectSelector = document.querySelector('.btn--disconnect')
        let profilSelector = document.querySelector('.btn--profil')
        
    
        if(Private.connexion === 1)
        {
            let disconnect = document.createElement('button')
            disconnect.className = 'btn--disconnect';
            disconnect.textContent = 'Déconnexion';
            header.appendChild(disconnect);
            disconnect.addEventListener('click',(e)=>{
                e.preventDefault();
                Fetch.jsonFetchGET('private/disconnect')
                Private.disconnect();
                this.connnexionConfig();});

            let profil = document.createElement('button')
            profil.className = 'btn--profil';
            profil.textContent = 'Profil';
            header.appendChild(profil);
            profil.addEventListener('click',(e)=>{
                    e.preventDefault();
                    this.profilView();
            })
        }
        else
        {
            header.removeChild(disconnectSelector);
            header.removeChild(profilSelector);
        }
    }








    static outsideView(outside){

        // Affiche h3 nom -> li notes
            //onclick h3 nom + note -> li pages
                // h3 onclick init - li loadInside

        //const leftSelector = document.querySelector('.private__content__left');
        const lefth3Selector = document.querySelector('.private__content__left h3');
        const lefth4Selector = document.querySelector('.private__content__left h4');
        const leftUlSelector = document.querySelector('.private__content__left ul');
        const rightSelector = document.querySelector('.private__content__right');

        // h3 + onclick

        lefth3Selector.textContent = Private.username;
        lefth3Selector.addEventListener('click', (e) => {e.preventDefault, this.outsideView(Private.outsideContent);})


        // On efface ce qui pré-éxistait

        while (leftUlSelector.firstChild) {
            leftUlSelector.removeChild(leftUlSelector.firstChild);
        }

        let firstClick = (oneNote) => {

        // On efface ce qui pré-éxistait

            while (leftUlSelector.firstChild) {
                leftUlSelector.removeChild(leftUlSelector.firstChild);
            }

            // h4 + onclick

            lefth4Selector.textContent = oneNote.note_name;
            lefth4Selector.addEventListener('click', (e) => {e.preventDefault; this.outsideView(Private.outsideContent);})

            //Affiche les pages

            let notes_length = 0;
            console.log(outside);

            for(let i in outside)
            {
                const leftLi = document.createElement('li');
                leftLi.id = 'private__noteName__' + [i];
                leftLi.textContent = outside[i].page_name;
                leftUlSelector.appendChild(leftLi);
                notes_length++;
            }

            for (let i=0; i < notes_length; i++)
            {
                let onePage = outside[i]; // {note_id, note_name, page_id, page_name}
                let elt = document.querySelector('#private__noteName__' + [i]);
                elt.addEventListener('click', async (e)=>{
                    e.preventDefault();
                    let fetchOptions = {method:'POST', header:{'Content-Type':'application/json'}, body : onePage.page_id}
                    let insideContent = await Fetch.jsonFetchPOST('private/inside', fetchOptions)
                    Private.insideContent = insideContent;
                    this.insideView(insideContent);})
            }
        }


        // Affiche les notes

        let outside_length = 0;

        for(let i in outside)
        {   
            if(i>0){
                if(outside[i-1].note_name !== outside[i].note_name)
                {
                    const leftLi = document.createElement('li');
                    leftLi.id = 'private__noteName__' + [i];
                    leftLi.textContent = outside[i].note_name;
                    leftUlSelector.appendChild(leftLi);
                    outside_length++;
                }
            }
            else        // Plusieurs lignes ont la même note_name
            {
                const leftLi = document.createElement('li');
                leftLi.id = 'private__noteName__' + [i];
                leftLi.textContent = outside[i].note_name;
                leftUlSelector.appendChild(leftLi);
                outside_length++;
            }
        }

        for (let i=0; i < outside_length; i++)
        {
            let oneNote = outside[i]; // {note_id, note_name, page_id, page_name}
            let elt = document.querySelector('#private__noteName__' + [i]);
            elt.addEventListener('click', (e)=>{e.preventDefault();firstClick(oneNote);})
        }
    }







    static insideView(insideContent){
        // Charge contenu = f(page)

        console.log(insideContent);

        const middleSelector = document.querySelector('.private__content__middle');

        while (middleSelector.firstChild) {
            middleSelector.removeChild(middleSelector.firstChild);
        }
 
        for(let j=1; j<=insideContent.length; j++)    //Recherhce la position 1, l'affiche
        {                                               //Position 2, l'affiche  ... 
            if(insideContent[j-1].position === j)
            {
                let k = j-1;
                middleSelector.innerHTML += '<' + insideContent[j-1].type + ' id="' + k + '">' + insideContent[j-1].content + '</' + insideContent[j-1].type + '>';
            }
        }

        contentView.summary('private');
    }
    

}