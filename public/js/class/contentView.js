import { Fetch } from './fetch.js';
import { Private } from '../index.js';
import { ElementView } from './elementView.js';


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








    static async outsideView(outside,zone){

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
     

        let firstClick = async (oneNote, zone) => {

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
                leftLi.id = `${zone}__pageName__` + [i];
                leftLi.textContent = outside[i].page_name;
                leftUlSelector.appendChild(leftLi);
                notes_length++;
            }

            let pageClicked=[];

            for (let i=0; i < notes_length; i++)
            {
                let onePage = outside[i]; // {note_id, note_name, page_id, page_name}
                pageClicked[i] = outside[i].page_id;
                let elt = document.querySelector(`#${zone}__pageName__` + [i]);
                

                elt.addEventListener('click', async (e)=>{
                    e.preventDefault();
                    let fetchOptions = {method:'POST', header:{'Content-Type':'application/json'}, body : onePage.page_id}
                    let insideContent = await Fetch.jsonFetchPOST(`${zone}/inside`, fetchOptions)
                    Private.insideContent = await insideContent;
                    this.insideView(insideContent, pageClicked[i], zone);
                });
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

        // Au clic sur la note

        for (let i=0; i < outside_length; i++)
        {
            let oneNote = outside[i]; // {note_id, note_name, page_id, page_name}
            let elt = document.querySelector(`#${zone}__noteName__` + [i]);
            elt.addEventListener('click', (e)=>{e.preventDefault();firstClick(oneNote, zone);})
        }
    }






    static insideView(insideContent, pageClicked, zone){ // insideContent = [{},{},...]
        // Charge contenu = f(page)

        console.log('appel de insideView');

   
        let entireForm;
        let returnObject = {};
        let newData;
        let toModify = [];


        // Ajoute le bouton +, permet de le refermer grâce à type dans les fonction sendEvent
        function addPlus(type){
            let createPlus = document.createElement('button');
            createPlus.id = 'addContent';
            createPlus.textContent = '+';

            if(type === 'return'){
                let form = document.getElementById('contentForm')
                middleSelector.replaceChild(createPlus, form);
            }
            else{
                middleSelector.appendChild(createPlus);
            }


            let addContentSelect = document.getElementById('addContent'); 


            // Au clic sur +
            function clickEvent(e){
                e.preventDefault();
                e.stopPropagation();
                ElementView.form(addContentSelect,createPlus);
                
                let entireForm = document.getElementById('contentForm');

                addContentSelect.removeEventListener('click',clickEvent);

                //Validation avec enter

                document.addEventListener('keydown', handleAdd); 

                
                // Validation avec un clic outside 

                document.addEventListener('click', handleAdd, {once: true}); 
              

                

                entireForm.addEventListener('click', (e) => {
                    e.stopPropagation();
                });   
            }
    
            addContentSelect.addEventListener('click',clickEvent);

        }

        // handle de +
        function handleAdd(e){
            if(e.type === 'click'){
                e.preventDefault();
                document.removeEventListener('click', handleAdd, {once: true}); 
                document.removeEventListener('keydown', handleAdd); 
                sendAddEvent(e)
            }
            else{
                if(e.key === 'Enter' && e.shiftKey === false) {  
                    e.preventDefault();    
                    document.removeEventListener('keydown', handleAdd); 
                    document.removeEventListener('click', handleAdd, {once: true});            
                    sendAddEvent(e)
                }
            }
        }

        function sendAddEvent(e){  // Fonction d'envoi du form lors de l'évenment
                                    
            returnObject = {}
            entireForm = document.getElementById('contentForm');
  
            newData = new FormData(entireForm);
            for(var pair of newData.entries()) {
                returnObject[pair[0]] = pair[1];
            }
   

                   
            if(returnObject !== 'undefined' && returnObject['content'] !== ''){
                
                    Private.addContent(returnObject, pageClicked); 
            
                    returnObject = undefined;
            }
            else{
                // Traiter si content = ''
                addPlus('return');
            }
        }
    


        //On filtre insideContent pour qu'il ne contienne que la page cliquée
        
        insideContent = insideContent.filter(insideContent => insideContent.page_id === pageClicked);
        
    
        // On efface ce qui pré éxistait

        let middleSelector = document.querySelector(`.${zone}__content__middle`);
        let rightSelector = document.querySelector(`.${zone}__content__right`);

      
            while (middleSelector.firstChild) {
                middleSelector.removeChild(middleSelector.firstChild);
            }
        
            while (rightSelector.firstChild) {
                rightSelector.removeChild(rightSelector.firstChild);
            }
 

        // Charge la page et tous ses évenements

        let posIndex = 1;
        

        for(let i = 0; i <insideContent.length*2; i++){

            let createLi = document.createElement('div');
            createLi.id = 'li_' + i;
            

            

            if(i % 2 !== 0) // Si i impaire
            {
                for(let k=1; k<=insideContent.length; k++)    //Recherhce la position 1, l'affiche
                {                                               //Position 2, l'affiche  ... 
                    if(insideContent[k-1].position === posIndex)
                    {
                    
                        

                        //Affichage de la page

                        let createMove = document.createElement('div');
                        createMove.className = 'move';
                        

                        let createPos = document.createElement('div');
                        createPos.id = 'pos_' + posIndex ;
                        createPos.setAttribute('draggable', 'true');

                        let createContent = document.createElement(insideContent[k-1].type);
                        createContent.id = 'content_' + posIndex ;
                        createContent.textContent = insideContent[k-1].content;


                        
                        middleSelector.appendChild(createLi);
                        //createLi.appendChild(createMove);
                        createLi.appendChild(createPos);
                        createPos.appendChild(createContent);


                        let posId = document.getElementById('pos_' + posIndex);
                        let firstLi = document.getElementById('li_' + i);

                      
                        if(zone ==='Private'){

                           
                        

                            // Event au dblclick qui ouvre le form pour modif

                    

                            // Ces deux fonctions sont spécialement pour les events modify ( dans la boucle car sinon il faut insideContent[k-1] n'est pas récupéré)

                            function handleModifyLine(e){
                                console.log(e);
                                if(e.type === 'click'){
                                    e.preventDefault();
                                    document.removeEventListener('keydown', handleModifyLine);  
                                    document.removeEventListener('click', handleModifyLine, {once: true}); 
                                    sendEventLine(e)
                                }
                                else{
                                    if(e.key === 'Enter' && e.shiftKey === false) {  
                                        e.preventDefault();     
                                        document.removeEventListener('keydown', handleModifyLine); 
                                        document.removeEventListener('click', handleModifyLine, {once: true});             
                                        sendEventLine(e)
                                    }
                                }
                            }

                            function sendEventLine(e){  // Fonction d'envoi du form lors de l'évenment
                                    
                                returnObject = {}
                                entireForm = document.getElementById('contentForm');
            
                                
                                newData = new FormData(entireForm);
                                for(var pair of newData.entries()) {
                                    returnObject[pair[0]] = pair[1];
                                }
                               
                    
                                if(returnObject !== 'undefined' && returnObject['content'] !== ''){
                                    Private.modification(returnObject, insideContent[k-1].content_id,pageClicked);
                                }
                                else{
                                    // Traiter si content = ''
                                    //firstLi.replaceChild(toReplace, form);
                                }
                            }

                            function dblclickEvent(e){
                                e.preventDefault;
                                
                                ElementView.form(firstLi, posId, insideContent[k-1], 'modify', pageClicked);

                                
    


                                function deleteHandle(e){
                                    e.preventDefault();
                                    deleteButton.removeEventListener('click', deleteHandle);
                                    document.removeEventListener('keydown', handleModifyLine); 
                                    document.removeEventListener('click', handleModifyLine, {once: true}); 
                                    Private.deleteContent(insideContent[k-1], pageClicked);
                                }

                                let deleteButton = document.getElementById('btn--delete');
                            
                                deleteButton.addEventListener('click', deleteHandle);



                                let entireForm = document.getElementById('contentForm');

                                posId.removeEventListener('dblclick', dblclickEvent);
                        
                                
    
                                //Validation avec enter

                                document.addEventListener('keydown', handleModifyLine); 

                                // Validation avec un clic outside 

                                document.addEventListener('click', handleModifyLine, {once: true}); 

                                entireForm.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                
                                }); 
                            }
                            
                
                            posId.addEventListener('dblclick', dblclickEvent);




                            
                        }
                    }
                }
                posIndex++;
            }
            else{
                middleSelector.appendChild(createLi);

               

            }

        }

        let createLi = document.createElement('div');
        createLi.id = 'li_' + (posIndex-1)*2;
        middleSelector.appendChild(createLi);
       

        if(zone === 'Private'){

            let posId = [];
           
            let createLi = [];

           
           

            // Drag and drop 
            function dragStartHandler(e){

                for(let i=0; i<(posIndex-1)*2+1; i++){
                    if(i % 2 === 0){
                        createLi[i] = document.getElementById('li_' + i);
                        createLi[i].style.height = '5px';
                        createLi[i].style.background = '#FF922A';
                        createLi[i].style.opacity = '0.5';
                    }
                    
                }
                console.log('e.target.id');
                console.log(e.target.id);
                e.dataTransfer.setData("text/plain", e.target.id);
            }

            for(let i=1; i<=(posIndex-1); i++){
                posId[i] = document.getElementById('pos_' + i);
                posId[i].addEventListener('dragstart', dragStartHandler);
     
    
            }


            function dragOverHandler(e){
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            }

            function dropHandler(e){
                e.preventDefault();
                console.log('e.dataTransfer');
                console.log(e.dataTransfer);
                let pos = e.dataTransfer.getData("text/plain");
                let target = e.target.id;
                console.log('e.target.id')
                console.log(e.target.id)
                console.log('pos');
                console.log(pos);
                Private.dragAndDrop(pos, target, pageClicked);
            }
            
            for(let i=0; i<(posIndex-1)*2+1; i++){
                if(i % 2 === 0){
                    createLi[i] = document.getElementById('li_' + i);
                    createLi[i].addEventListener('dragover',dragOverHandler);
                    createLi[i].addEventListener('drop',dropHandler);
                }
            }


            // Ajout bouton + 

            addPlus('add');



            

        }


        // Boucle qui permet de ne pas lancer le sommaire en si pas de titre (créé un bug sinon)

        let isGood = false;
        for(let i=0; i<insideContent.length; i++){
            let isTitle = insideContent[i].type.match(/^h/i);
            if(isTitle !== null){
                isGood = true
                break;
            }
        } 

        if(isGood === true){
            this.summary(zone);
            isGood = false;
        }
        else{
            document.querySelector(`.${zone}__content__right`).innerHTML = 'Ajouter un titre créera un sommaire';
        }
        

    }




    


    static summary(zone){

        let titres=[];  //Tableau récupération des titres

        let nb = [];

        // récupère le numéro des id où il y a du content quand le noeud est un h
        for(let i=0; i<500; i++){
            if(document.getElementById('content_' + i) !== null){
                if(document.getElementById('content_' + i).nodeName.search(/^h/i) !== -1)
                {
                    nb.push(i)
                }
            }
        }


       

        let titleIndex = 0;

        // Récupère les éléments où il y a un h dans une variable titre[]
        for(let j=0; j<nb.length*2; j++){   //
            if(nb.indexOf(j) !== (-1)){     //   
                if(document.getElementById('content_' + j).firstChild.nodeName=='#text'){   
                    titres[titleIndex]=document.getElementById('content_' + j);  
                    titleIndex++;						
                        // dans <h1>, affiché avec innerHTML
                }else{
                    titres[titleIndex]=document.getElementById('content_' + j).firstElementChild; 
                    titleIndex++; 	
                        //dans <a>, affiché avec innerHTML
                }   
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


        for(var i = 0; i<titres.length; i++){	// essayer avec switch  et créer une fonction string(n)
            let j=nb[i]
            if (typetitre[i]=='h1'){					// affiche titre1 (1, 2, ... ) devant + change le href
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre1 + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById('content_' + j).innerHTML = titre1 + '. ' + main_titres(i) ; 		//titres[i].parentNode.innerHTML ;
                titre1++;
            } else if (typetitre[i]=='h2'){				// affiche titre2 (I, II, ... ) devant + change le href	
                if(typetitre[i-1]=='h1'){				//permet de repartir à 0 si le chaptitre est clôt
                    local2=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre2[local2] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;	
                    document.getElementById('content_' + j).innerHTML = titre2[local2] + '. ' +main_titres(i) ;	
                    local2++;
                }else{									// incrémente titre2 et affiche les titres
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre2[local2] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById('content_' + j).innerHTML = titre2[local2] + '. ' + main_titres(i) ;		
                local2++;
                }
            } else if (typetitre[i]=='h3'){
                if(typetitre[i-1]=='h1'|| typetitre[i-1]=='h2' ){
                    local3=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre3[local3] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                    document.getElementById('content_' + j).innerHTML = titre3[local3] + '. ' + main_titres(i) ;	
                    local3++;
                }else{
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre3[local3] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById('content_' + j).innerHTML = titre3[local3] + '. ' + main_titres(i) ;	
                local3++;
                }
            } else if (typetitre[i]=='h4'){
                if(typetitre[i-1]=='h1'|| typetitre[i-1]=='h2'|| typetitre[i-1]=='h3'){
                    local4=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre4[local4] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                    document.getElementById('content_' + j).innerHTML = titre4[local4] + '. ' + main_titres(i) ;	
                    local4++;
                }else{
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre4[local4] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById('content_' + j).innerHTML = titre4[local4] + '. ' + main_titres(i) ;	
                local4++;
                }
            } else if (typetitre[i]=='h5'){
                if(typetitre[i-1]=='h1'|| typetitre[i-1]=='h2'|| typetitre[i-1]=='h3'|| typetitre[i-1]=='h4'){
                    local5=0;
                    string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre5[local5] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                    document.getElementById('content_' + j).innerHTML = titre5[local5] + '. ' + main_titres(i) ;
                    local5++;
                }else{
                string += '<' + typetitre[i] + '><a href="#' + i + '">' + titre5[local5] + '. ' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
                document.getElementById('content_' + j).innerHTML = titre5[local5] + '. ' + main_titres(i) ;
                local5++;
                }
            }else {
            string += '<' + typetitre[i] + '><a href="#' + i + '">' + '?' + titres[i].innerHTML + '</' + typetitre[i] + '><br/>' ;
            document.getElementById('content_' + j).innerHTML =  '?. ' + main_titres(i) ;
            }
        }


        document.querySelector(`.${zone}__content__right`).innerHTML = string; // Affiche le menu navright en HTML à l'emplacement id="navright"

    }
}