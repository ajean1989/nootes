
import { View } from '../contentView.js';
import { Fetch } from '../fetch.js';

export class PrivateData{

    constructor(connexion, username, mail, outsideContent, insideContent){
        this.connexion = connexion;
        this.username = username;
        this.mail = mail;
        this.outsideContent = outsideContent;//[{notes, pages}]=f(username) -- Chargement initial à la connexion
        this.insideContent = insideContent;  //[{notes, pages, content}] -- chargement à chaque click sur note
    }

    status = async () => {

        let status = await Fetch.jsonFetchGET('Private/status');
        //let status = await response.json();
        this.connexion = status.connexion;

        if(status.status === 1){
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
        console.log(outsideContent);
        View.outsideView(outsideContent, 'Private');
      
    }

    insideLoad = async () => {
        // Charge contenu = f(page)
        let response = await Fetch.jsonFetchGET('Private/inside');
        let insideContent = await response.json();

        this.insideContent = insideContent;

        View.insideView(insideContent, 'Private');
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