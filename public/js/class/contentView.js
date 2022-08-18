import { Fetch } from './fetch.js';
import { Private } from '../index.js';


export class View{

        
    static connexionView =  async () => {
        const middle = document.querySelector('.Private__content__middle');
        const leftSelector = document.querySelector('.Private__content__left');
        const leftUlSelector = document.querySelector('.Private__content__left ul');
        const lefth3Selector = document.querySelector('.Private__content__left h3');
        const lefth4Selector = document.querySelector('.Private__content__left h4');
        const rightSelector = document.querySelector('.Private__content__right');


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
            let connexionData = await Fetch.jsonFetchPOST('Private/connexion',fetchOptions);

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
                let connexionData = await Fetch.jsonFetchPOST('Private/signin',fetchOptions);
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





    // Affiche le bouton de déconnexion et le bouton de profil dans le header

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
                Fetch.jsonFetchGET('Private/disconnect')
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








    static outsideView(outside,zone){

        // Affiche h3 nom -> li notes
            //onclick h3 nom + note -> li pages
                // h3 onclick init - li loadInside

        //const leftSelector = document.querySelector('.Private__content__left');
        let lefth3Selector = document.querySelector(`.${zone}__content__left h3`);
        let lefth4Selector = document.querySelector(`.${zone}__content__left h4`);
        let leftUlSelector = document.querySelector(`.${zone}__content__left ul`);
        let middleSelector = document.querySelector(`.${zone}__content__middle`);
        let rightSelector = document.querySelector(`.${zone}__content__right`);

        // h3 + onclick

        if(zone === 'Private')
        {
            lefth3Selector.textContent = Private.username;
            lefth3Selector.addEventListener('click', (e) => {
                e.preventDefault;
                lefth4Selector.textContent = '';
                this.outsideView(outside, zone);})
        }


        // On efface ce qui pré-éxistait

        while (leftUlSelector.firstChild) {
            leftUlSelector.removeChild(leftUlSelector.firstChild);
        }

        while (middleSelector.firstChild) {
            middleSelector.removeChild(middleSelector.firstChild);
        }
        middleSelector.textContent = 'Sélectionnez une note';

        while (rightSelector.firstChild) {
            rightSelector.removeChild(rightSelector.firstChild);
        }
     

        let firstClick = (oneNote, zone) => {

            // On efface ce qui pré-éxistait

            while (leftUlSelector.firstChild) {
                leftUlSelector.removeChild(leftUlSelector.firstChild);
            }

            while (middleSelector.firstChild) {
                middleSelector.removeChild(middleSelector.firstChild);
            }
            middleSelector.textContent = 'Sélectionnez une page';

         

            // h4 + onclick

            if(zone === 'Public'){ 
                //Sélectionne par note_name dans Public où tous les outsides sont mélangé entre user
                let oldOutside; 
                oldOutside = outside;
                outside = outside.filter((outside) => outside.note_name === oneNote.note_name)

                lefth4Selector.textContent = oneNote.note_name;
                lefth4Selector.addEventListener('click', (e) => {
                e.preventDefault; 
                lefth4Selector.textContent = '';
                this.outsideView(oldOutside, zone);})
            }
            else{
                lefth4Selector.textContent = oneNote.note_name;
                lefth4Selector.addEventListener('click', (e) => {
                e.preventDefault; 
                lefth4Selector.textContent = '';
                this.outsideView(outside, zone);})
            }




            //Affiche les pages

            let notes_length = 0;
     

            for(let i in outside)
            {
                let leftLi = document.createElement('li');
                leftLi.id = `${zone}__noteName__` + [i];
                leftLi.textContent = outside[i].page_name;
                leftUlSelector.appendChild(leftLi);
                notes_length++;
            }

            for (let i=0; i < notes_length; i++)
            {
                let onePage = outside[i]; // {note_id, note_name, page_id, page_name}
                let elt = document.querySelector(`#${zone}__noteName__` + [i]);
                elt.addEventListener('click', async (e)=>{
                    e.preventDefault();
                    let fetchOptions = {method:'POST', header:{'Content-Type':'application/json'}, body : onePage.page_id}
                    let insideContent = await Fetch.jsonFetchPOST(`${zone}/inside`, fetchOptions)
                    Private.insideContent = insideContent;
                    this.insideView(insideContent, zone);})
            }
        }


        // Affiche les notes

        let outside_length = 0;
        
        
        let existLi = [];
        for(let i in outside)
        {   
            if(zone === 'Private')
            {
                if(existLi.indexOf(outside[i].note_name) === -1){  
                    //si note_name n'est pas dans le tableau existLi

                    let leftLi = document.createElement('li');
                    leftLi.id = `${zone}__noteName__` + [i];
                    leftLi.textContent = outside[i].note_name;
                    leftUlSelector.appendChild(leftLi);

                    existLi.push(leftLi.textContent); 
                    outside_length++;
                }
            }
            else
            {
                if(existLi.indexOf(outside[i].note_name + ' (' + outside[i].username + ')') === -1){
                        let leftLi = document.createElement('li');
                        leftLi.id = `${zone}__noteName__` + [i];
                        leftLi.textContent = outside[i].note_name + ' (' + outside[i].username + ')';
                        leftUlSelector.appendChild(leftLi);

                        existLi.push(leftLi.textContent); 
                        outside_length++;
                    }        
            }  
        }

        for (let i=0; i < outside_length; i++)
        {
            let oneNote = outside[i]; // {note_id, note_name, page_id, page_name}
            let elt = document.querySelector(`#${zone}__noteName__` + [i]);
            elt.addEventListener('click', (e)=>{e.preventDefault();firstClick(oneNote, zone);})
        }
    }







    static insideView(insideContent,zone){
        // Charge contenu = f(page)

        console.log(insideContent);

        let middleSelector = document.querySelector(`.${zone}__content__middle`);

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

        this.summary(zone);
    }


    


    static summary(zone){

        let titres=[];  //Tableau récupération des titres

        let nb=document.querySelectorAll(`.${zone}__content__middle h1, .${zone}__content__middle h2, .${zone}__content__middle h3, .${zone}__content__middle h4, .${zone}__content__middle h5`);  		
        

        //nombre de titre avec nb.length
        for(let i=0; i<nb.length; i++){
                if(document.getElementById(i).firstChild.nodeName=='#text'){   
                    titres[i]=document.getElementById(i);  						// dans <h1>, affiché avec innerHTML
                }else{
                    titres[i]=document.getElementById(i).firstElementChild;  	//dans <a>, affiché avec innerHTML
                }      
        }


        let typetitre = [] ;	// récupère h1, h2, h3 ou h4 dans un tableau
        let titre1=1  ;			//niveaux de titre
        let titre2=['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
        let local2=0;
        let titre3=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t'];
        let local3=0;
        let titre4=['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv','xv','xvi','xvii','xviii','xix','xx'];
        let local4=0;
        let titre5=['u','v','w','x','y','z'];
        let local5=0;
        let string = '' ;  		


        for(let i=0; i<titres.length; i++){				// renvoi h1, ..., hn correspondant au titre
            if(titres[i].nodeName.toLowerCase()=='a'){
                typetitre[i]=titres[i].parentNode.nodeName.toLowerCase();
            }else{
                typetitre[i]=titres[i].nodeName.toLowerCase();
            }
        }


        function main_titres(i){			// return le titre peu import si il est dans h1 ou a
            if(titres[i].nodeName.toLowerCase()=='a'){
                return titres[i].parentNode.innerHTML;
            }else{
                return titres[i].innerHTML ;
            }
        }


        for(var i = 0; i<titres.length; i++){			// essayer avec switch  et créer une fonction string(n)
            if (typetitre[i]=='h1'){					// affiche titre1 (1, 2, ... ) devant + change le href
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre1 + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById(i).innerHTML = titre1 + '. ' + main_titres(i) ; 		//titres[i].parentNode.innerHTML ;
                titre1++;
            } else if (typetitre[i]=='h2'){				// affiche titre2 (I, II, ... ) devant + change le href	
                if(typetitre[i-1]=='h1'){				//permet de repartir à 0 si le chaptitre est clôt
                    local2=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre2[local2] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;	
                    document.getElementById(i).innerHTML = titre2[local2] + '. ' +main_titres(i) ;	
                    local2++;
                }else{									// incrémente titre2 et affiche les titres
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre2[local2] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById(i).innerHTML = titre2[local2] + '. ' + main_titres(i) ;		
                local2++;
                }
            } else if (typetitre[i]=='h3'){
                if(typetitre[i-1]=='h1'|| typetitre[i-1]=='h2' ){
                    local3=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre3[local3] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                    document.getElementById(i).innerHTML = titre3[local3] + '. ' + main_titres(i) ;	
                    local3++;
                }else{
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre3[local3] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById(i).innerHTML = titre3[local3] + '. ' + main_titres(i) ;	
                local3++;
                }
            } else if (typetitre[i]=='h4'){
                if(typetitre[i-1]=='h1'|| typetitre[i-1]=='h2'|| typetitre[i-1]=='h3'){
                    local4=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre4[local4] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                    document.getElementById(i).innerHTML = titre4[local4] + '. ' + main_titres(i) ;	
                    local4++;
                }else{
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre4[local4] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById(i).innerHTML = titre4[local4] + '. ' + main_titres(i) ;	
                local4++;
                }
            } else if (typetitre[i]=='h5'){
                if(typetitre[i-1]=='h1'|| typetitre[i-1]=='h2'|| typetitre[i-1]=='h3'|| typetitre[i-1]=='h4'){
                    local5=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre5[local5] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                    document.getElementById(i).innerHTML = titre5[local5] + '. ' + main_titres(i) ;
                    local5++;
                }else{
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre5[local5] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById(i).innerHTML = titre5[local5] + '. ' + main_titres(i) ;
                local5++;
                }
            }else {
            string += '<' + typetitre[i] + '><a href="#' + i + '">' + '?' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
            document.getElementById(i).innerHTML =  '?. ' + main_titres(i) ;
            }
        }


        document.querySelector(`.${zone}__content__right`).innerHTML = string; // Affiche le menu navright en HTML à l'emplacement id="navright"
    }
}