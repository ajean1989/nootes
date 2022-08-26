
import { View } from '../contentView.js';
import { Private } from '../../index.js'
import { Fetch } from '../fetch.js';

export class PrivateData{

    constructor(connexion, username, mail, outsideContent, insideContent, nbOfInstance){
        this.connexion = connexion;
        this.username = username;
        this.mail = mail;
        this.outsideContent = outsideContent;
        //[{notes, pages}]=f(username) -- Chargement initial à la connexion
        //user_id, username, mail, note_id, note_name, share, page_id, page_name
        this.insideContent = insideContent;  
        //[{notes, pages, content}] -- chargement à chaque click sur note
        //note_id, note_name, share, page_id, page_name, content_id, position, type, content
        this.nbOfInstance = 0;
    }


    status = async () => {

        let status = await Fetch.jsonFetchGET('Private/status');
        //let status = await response.json();
        this.connexion = status.connexion;

        if(status.connexion === 1){
            this.username =  status.username;
            this.mail =  status.mail;
            View.connnexionConfig();
            this.outsideLoad()

     
        }
        else{
            View.connexionView();
        }
    }


    outsideLoad = async () => {
        // Charge les notes, les pages =f(username)
        let outsideContent = await Fetch.jsonFetchGET('Private/outside');
        this.outsideContent = outsideContent;
        View.outsideView(outsideContent, 'Private');
      
    }



    modification = async (returnObject, content_id, pageClicked)  => {

        let newInsideContent = [];

        this.nbOfInstance = this.nbOfInstance+1;

        newInsideContent[this.nbOfInstance] = new PrivateData();
        newInsideContent[this.nbOfInstance].insideContent = this.insideContent;
     
        let lineToUpdate = []
       

            // Affecte à la nouvelle instance les valeures modifiées par raport au content id
       for(let i=0; i<newInsideContent[this.nbOfInstance].insideContent.length; i++)
       {
        if(typeof(this.insideContent[i] !== undefined))
        {
            if(this.insideContent[i].content_id === content_id)
            {
                newInsideContent[this.nbOfInstance].insideContent[i].note_id = this.insideContent[i].note_id;
                newInsideContent[this.nbOfInstance].insideContent[i].note_name = this.insideContent[i].note_name;
                newInsideContent[this.nbOfInstance].insideContent[i].share = this.insideContent[i].share;
                newInsideContent[this.nbOfInstance].insideContent[i].page_id = this.insideContent[i].page_id;
                newInsideContent[this.nbOfInstance].insideContent[i].page_name = this.insideContent[i].page_name;
                newInsideContent[this.nbOfInstance].insideContent[i].content_id = this.insideContent[i].content_id;
                newInsideContent[this.nbOfInstance].insideContent[i].position = this.insideContent[i].position;
                newInsideContent[this.nbOfInstance].insideContent[i].type = returnObject.type;
                newInsideContent[this.nbOfInstance].insideContent[i].content = returnObject.content; 

                lineToUpdate.push(i);
            }
        }
    }
 

        // Modifier les valeurs des positions 


        // Création d'un tableau à envoyer avec uniquement les lignes modifiées

        let insideContentToUpdate = [];  // [{},{},... ]
        for(let i=0; i<newInsideContent[this.nbOfInstance].insideContent.length; i++){
            if(lineToUpdate.indexOf(i) !== (-1)){
                insideContentToUpdate.push(newInsideContent[this.nbOfInstance].insideContent[i])
            }
         }

         this.insideContent = newInsideContent[this.nbOfInstance].insideContent

        insideContentToUpdate = JSON.stringify(insideContentToUpdate);

 
        let fetchOptions = {method:'POST', headers:{'Content-Type' : 'application/json;charset=utf-8', 'Accept' : 'application/json'}, 
        body : insideContentToUpdate}; 
            
        Fetch.jsonFetchPOST('Private/update',fetchOptions)
        .then(View.insideView(newInsideContent[this.nbOfInstance].insideContent, pageClicked,'Private'))

    }



    async addContent(returnObject, pageClicked){  //return object {content: blabla, type:h1, ... } du form +


        // Nouvelle instance de PrivateData 

        let newInsideContent = [];

        this.nbOfInstance = this.nbOfInstance+1;

        newInsideContent[this.nbOfInstance] = new PrivateData();

        // Traite l'erreur si on souhaite ajouté un content si la page est vide

        console.log('this.insideContent :');

        console.log(this.insideContent);

        if(this.insideContent.length !== 0)
        {
        newInsideContent[this.nbOfInstance].insideContent = this.insideContent;
        }
        else{
            newInsideContent[this.nbOfInstance].insideContent = [{content:'',type:'',position:0, page_id: pageClicked}];
        }

        console.log('newInsideContent[this.nbOfInstance].insideContent :');
        console.log(newInsideContent[this.nbOfInstance].insideContent);


        //Ajout d'un objet content dans insideContent en copiant le dernier et modifiant avec les données de returnObject

        let iCLength = newInsideContent[this.nbOfInstance].insideContent.length;

        let indexOfLastInsideContent;
        let lastInsideContent;
        for(let i=0; i<iCLength; i++){
            if(i===1 && indexOfLastInsideContent>= 1){
                if(newInsideContent[this.nbOfInstance].insideContent[i].position > newInsideContent[this.nbOfInstance].insideContent[i-1].position)
                lastInsideContent = newInsideContent[this.nbOfInstance].insideContent[i].position;
                indexOfLastInsideContent = i;
            }else
            {
                lastInsideContent = newInsideContent[this.nbOfInstance].insideContent[i]
                indexOfLastInsideContent = i;
            }
        }

        console.log('lastInsideContent');
        console.log(lastInsideContent);

        newInsideContent[this.nbOfInstance].insideContent.push(lastInsideContent);

        console.log('newInsideContent[this.nbOfInstance].insideContent');
        console.log(newInsideContent[this.nbOfInstance].insideContent);
        console.log('newInsideContent[this.nbOfInstance].insideContent[(iCLength)]');
        console.log(newInsideContent[this.nbOfInstance].insideContent[(iCLength)]);
        console.log('iCLength');
        console.log(iCLength);



        newInsideContent[this.nbOfInstance].insideContent[(iCLength)].content = returnObject.content;
        newInsideContent[this.nbOfInstance].insideContent[(iCLength)].type = returnObject.type;
        newInsideContent[this.nbOfInstance].insideContent[(iCLength)].position = (lastInsideContent.position)+1;


        // Mise en forme pour l'envoie

        let insideContentToAdd = []

        insideContentToAdd.push(JSON.stringify(newInsideContent[this.nbOfInstance].insideContent[(iCLength)]));

        console.log('to fetch');
        console.log(insideContentToAdd);
        console.log(newInsideContent[this.nbOfInstance].insideContent[(iCLength)]);


        let fetchOptions1 = {method:'POST', headers:{'Content-Type' : 'application/json;charset=utf-8', 'Accept' : 'application/json'}, 
        body : insideContentToAdd}; 

        let dontcare = await Fetch.jsonFetchPOST('Private/add',fetchOptions1);

        let fetchOptions2 = {method:'POST', header:{'Content-Type':'application/json'}, body : pageClicked}

        let insideContent = await Fetch.jsonFetchPOST(`Private/inside`, fetchOptions2)

        Private.insideContent = await insideContent;


        View.insideView(insideContent, pageClicked, 'Private');

    }

    deleteContent = async (insideContent, pageClicked)  => {
    
        // Nouvelle instance de PrivateData 

        let newInsideContent = [];

        this.nbOfInstance = this.nbOfInstance+1;

        newInsideContent[this.nbOfInstance] = new PrivateData();

        newInsideContent[this.nbOfInstance].insideContent = this.insideContent;

        

        // Envoyer le requête delete à la db et retourner le nouveau insideContent (avec trou dans position)

        let fetchOptions = {method:'POST', headers:{'Content-Type':'application/json;charset=utf-8', 'Accept':'application/json'}, body: insideContent.content_id}

        let insideHoled = await Fetch.jsonFetchPOST('Private/delete', fetchOptions);


        console.log('newInsideContent[this.nbOfInstance].insideContent :');
        console.log(newInsideContent[this.nbOfInstance].insideContent);

        console.log('insideContent :');
        console.log(insideContent);

        console.log('pageClicked :');
        console.log(pageClicked);

        insideHoled = newInsideContent[this.nbOfInstance].insideContent.filter(content => content.position !== insideContent.position && content.page_id === pageClicked);

        
        console.log('insideHoled :');
        console.log(insideHoled);

        // Traiter insideContent pour que les positions se suivent

        let newInsideArray = [];

        // Classe les positions dans l'ordre

        for(let i=1; i<=(insideHoled.length)+1; i++){
            for(let j=0; j<insideHoled.length; j++){
                if(insideHoled[j].position === i){
                    newInsideArray.push(insideHoled[j])
                }
            }
        }

        console.log('newInsideArray :');
        console.log(newInsideArray);

        console.log(newInsideArray[0]);


        // Enlève le trou de position 
        for(let i=0; i<newInsideArray.length; i++){
            if(newInsideArray[i].position !== i+1){
                newInsideArray[i].position = (newInsideArray[i].position) - 1; 
            }
        }

        console.log('newInsideArray :');
        console.log(newInsideArray);
        

        newInsideContent[this.nbOfInstance].insideContent = newInsideArray;

        this.insideContent = newInsideContent[this.nbOfInstance].insideContent

        console.log('newInsideContent[this.nbOfInstance].insideContent :');
        console.log(newInsideContent[this.nbOfInstance].insideContent);

        newInsideArray = JSON.stringify(newInsideArray);


        // Update de la db

        let fetchUpdateOptions = {method:'POST', headers:{'Content-Type':'application/json;charset=utf-8', 'Accept':'application/json'}, body: newInsideArray}


        Fetch.jsonFetchPOST('Private/deleteUpdate',fetchUpdateOptions)
        .then(View.insideView(newInsideContent[this.nbOfInstance].insideContent, pageClicked,'Private'))


        // Appelle de la vue
    }



    disconnect = () => {
        this.connexion = 0;
        this.username = undefined;
        this.mail = undefined;
        this.outsideContent = undefined;
        this.insideContent = undefined;
        View.connexionView();
    }
}