import { Fetch } from '../fetch.js';
import { View } from '../contentView.js';


export class PublicData{

    constructor(user_id, username, note_id, note_name, share, view, publicInside, outsideContent, insideContent){
        this.user_id = user_id;
        this.username = username;
        this.note_id = note_id;
        this.note_name = note_name;
        this.share = share;
        this.view = view;
        this.publicInside = publicInside;
        this.outsideContent = outsideContent
        this.insideContent = insideContent
    }

    // outsideContent = contenu qui s'initialise lors du chargement principal de la page (username - note)
    // insideContent = Lors du clic sur la note, informations relatives à la notes (pages, contents)

    publicStep1 = async () => {  //fléchées sinon this.view fait référence à la fonction, pas à la class

        // Fetch

        let outsideContent = await Fetch.jsonFetchGET('Public/outside');
        // outsideContent = [{user, note}] WHERE share=1
        this.outsideContent = outsideContent,

        // OPTIMISATION : Charger outsideContent dans une propriété et l'utiliser pour chaque potentiel futur appel

        //this.view = new View;
        //this.view.outsideView(outsideContent, 'Public');
        View.outsideView(outsideContent, 'Public');
    }


    publicStep2 = async (selectedOutside) =>{
        this.user_id = selectedOutside.user_id;
        this.username = selectedOutside.username;
        this.note_id = selectedOutside.note_id;
        this.note_name = selectedOutside.note_name;
        this.share = selectedOutside.share;

        let fetchOptions = {method : 'POST',headers:{'Content-Type':'application.json;charset=utf-8','Accept':'application/json'},body: JSON.stringify(this.note_id)}

        let insideContent = await Fetch.jsonFetchPOST('Public/inside', fetchOptions); 
        // [{note_id(fixe), page_id, page_name, position, type, content}]
        this.insideContent = insideContent;

        // OPTIMISATION : Charger insideContent dans une propriété et l'utiliser pour chaque potentiel futur appel

        //this.view.insideView(insideContent, 'public')
        View.insideView(insideContent, 'Public');
    }
}

