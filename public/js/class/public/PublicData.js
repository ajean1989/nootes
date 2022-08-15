import { Fetch } from '../fetch.js';
import { PublicView } from './PublicView.js';


export class PublicData{

    constructor(user_id, username, note_id, note_name, share, view, publicInside){
        this.user_id = user_id;
        this.username = username;
        this.note_id = note_id;
        this.note_name = note_name;
        this.share = share;
        this.view = view;
        this.publicInside = publicInside;
    }

    // outsideContent = contenu qui s'initialise lors du chargement principal de la page (username - note)
    // insideContent = Lors du clic sur la note, informations relatives à la notes (pages, contents)

    publicStep1 = async () => {  //fléchées sinon this.view fait référence à la fonction, pas à la class

        // Fetch

        let outsideContent = await Fetch.jsonFetchGET('public/outside');
        // outsideContent = [{user, note}]

        this.view = new PublicView;
        this.view.leftView(outsideContent);
    }


    publicStep2 = async (selectedOutside) =>{
        this.user_id = selectedOutside.user_id;
        this.username = selectedOutside.username;
        this.note_id = selectedOutside.note_id;
        this.note_name = selectedOutside.note_name;
        this.share = selectedOutside.share;

        let fetchOptions = {method : 'POST',headers:{'Content-Type':'application.json;charset=utf-8','Accept':'application/json'},body: JSON.stringify(this.note_id)}

        let insideContent = await Fetch.jsonFetchPOST('public/inside', fetchOptions); 
        // [{note_id(fixe), page_id, page_name, position, type, content}]

        this.view.leftView(insideContent)
    }
}

