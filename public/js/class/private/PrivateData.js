
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


    insideLoad = async () => {
        // Charge contenu = f(page)
        let response = await Fetch.jsonFetchGET('Private/inside');
        let insideContent = await response.json();

        this.insideContent = insideContent;

        View.insideView(insideContent, 'Private'); 
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
        newInsideContent[this.nbOfInstance].insideContent = this.insideContent;


        //Ajout d'un objet content dans insideContent en copiant le dernier et modifiant avec les données de returnObject

        let indexOfLastInsideContent = newInsideContent[this.nbOfInstance].insideContent.length;
        
        let lastInsideContent = newInsideContent[this.nbOfInstance].insideContent[(indexOfLastInsideContent-1)];

        newInsideContent[this.nbOfInstance].insideContent.push(lastInsideContent);


        newInsideContent[this.nbOfInstance].insideContent[(indexOfLastInsideContent)].content = returnObject.content;
        newInsideContent[this.nbOfInstance].insideContent[(indexOfLastInsideContent)].type = returnObject.type;
        newInsideContent[this.nbOfInstance].insideContent[(indexOfLastInsideContent)].position = (newInsideContent[this.nbOfInstance].insideContent[(indexOfLastInsideContent-1)].position)+1;


        // Mise en forme pour l'envoie

        let insideContentToAdd = []

        insideContentToAdd = JSON.stringify(newInsideContent[this.nbOfInstance].insideContent[(indexOfLastInsideContent)]);

        console.log('to fetch');
        console.log(insideContentToAdd);
        console.log(newInsideContent[this.nbOfInstance].insideContent);


        let fetchOptions = {method:'POST', headers:{'Content-Type' : 'application/json;charset=utf-8', 'Accept' : 'application/json'}, 
        body : insideContentToAdd}; 

            
            
        Fetch.jsonFetchPOST('Private/add',fetchOptions)
        .then(View.insideView(newInsideContent[this.nbOfInstance].insideContent, pageClicked, 'Private'))

        

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