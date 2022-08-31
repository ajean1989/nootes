import { ElementView } from './elementView.js';

export class Listener{

    // type : add, modify, delete
    // what : note, page, content
    // data : inside, outside, onepage, onenote

    static addNotePage(type, what, data){
        function firstClicHandler(e){
            e.preventDefault();
            addPage.removeEventListener('click', firstClicHandler);

            ElementView.notePageForm('add','note',data);

            let notePageForm = document.getElementById('form--NotePage');

            function addNotePage(e){
                console.log(e);
                if(e.type === 'click'){
                    e.preventDefault();
                    document.removeEventListener('keydown', addNotePage);  
                    document.removeEventListener('click', addNotePage, {once: true}); 
                    sendEventLine(e)
                }
                else{
                    if(e.key === 'Enter' && e.shiftKey === false) {  
                        console.log("keypress");
                        e.preventDefault();     
                        document.removeEventListener('keydown', addNotePage); 
                        document.removeEventListener('click', addNotePage, {once: true});             
                        sendEventLine();
                    }
                }
            }

            function sendEventLine(){  // Fonction d'envoi du form lors de l'évenment
                
               let returnObject ={};
                let newData = new FormData(notePageForm);
                for(var pair of newData.entries()) {
                    returnObject[pair[0]] = pair[1];
                }
            
    
                if(returnObject !== 'undefined' && returnObject['page'] !== ''){
                    Private.addNotePage(returnObject, data, 'page');
                }
                else{
                    // Traiter si content = ''
                    //firstLi.replaceChild(toReplace, form);
                }
            }


            document.addEventListener('click', addNotePage, {once: true});
            document.addEventListener('keydown', addNotePage);

            notePageForm.addEventListener('click', (e) => {
                e.stopPropagation();
            
            }); 


        }

        addPage.addEventListener('click', firstClicHandler);

    }

}
