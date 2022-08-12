
let url = 'http://localhost:8000/fetch/public/users';
//let url = 'https://jsonplaceholder.typicode.com/posts';



async function publicFetch(){
    let selector = document.querySelector('.public__content');
    try{
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);

        const publicUl = document.createElement('ul');

        for(let line of data)
        {
            const PublicLi = document.createElement('li');
            PublicLi.textContent = line.username + ' ' + line.note_name;
            publicUl.appendChild(PublicLi);
        }

        selector.appendChild(publicUl);

    }
    catch(error)
    {
        console.error(error);
    }


}

publicFetch();



//document.querySelector('.public__content').textContent = '<p>hey</p>';