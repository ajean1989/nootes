
//let url = 'http://localhost:8000/fetch/public/users';
//let url = 'https://jsonplaceholder.typicode.com/posts';

/*
export function publicLeftView(data){
    let selector = document.querySelector('.public__content');

    const publicUl = document.createElement('ul');

    for(let line of data)
    {
        const PublicLi = document.createElement('li');
        PublicLi.textContent = line.username + ' ' + line.note_name;
        publicUl.appendChild(PublicLi);
    }

    selector.appendChild(publicUl);
}

export async function publicFetch(what){

    let url = 'http://localhost:8000/fetch/public/' + what;

    try{
        let response = await fetch(url);
        let data = await response.json();
        //console.log(data);

        publicLeftView(data);

    }
    catch(error)
    {
        console.error(error);
    }


}


*/