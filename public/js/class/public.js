export class Public{

    constructor(user_id, username, note_id, note_name, share){
        this.user_id = user_id;
        this.username = username;
        this.note_id = note_id;
        this.note_name = note_name;
        this.share = share;

    }

    async publicFetch(what){

        let url = 'http://localhost:8000/fetch/public/' + what;
    
        try{
            let response = await fetch(url);
            let data = await response.json();
            //console.log(data);
            return data;
            //this.publicLeftView(data);
    
        }
        catch(error)
        {
            console.error(error);
        }
    }

    async publicLeftView(){

        let data = await this.publicFetch('users')

        let selector = document.querySelector('.public__content__left');
        const publicUl = document.createElement('ul');
    
        for(let line of data)
        {
            const PublicLi = document.createElement('li');
            PublicLi.textContent = line.username + ' ' + line.note_name;
            publicUl.appendChild(PublicLi);
        }
    
        selector.appendChild(publicUl);
    }

    async publicMiddleView(){

        let data = await this.publicFetch('pages')

        let selector = document.querySelector('.public__content__middle');
        const publicUl = document.createElement('ul');
    
        for(let line of data)
        {
            const PublicLi = document.createElement('li');
            PublicLi.textContent = line.username + ' ' + line.note_name;
            publicUl.appendChild(PublicLi);
        }
    
        selector.appendChild(publicUl);
    }

    async publicRightView(){

        let data = await this.publicFetch('pages')

        let selector = document.querySelector('.public__content__middle');
        const publicUl = document.createElement('ul');
    
        for(let line of data)
        {
            const PublicLi = document.createElement('li');
            PublicLi.textContent = line.username + ' ' + line.note_name;
            publicUl.appendChild(PublicLi);
        }
    
        selector.appendChild(publicUl);
    }
    
    

}