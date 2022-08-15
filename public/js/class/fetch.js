export class Fetch{

    static async jsonFetchGET(what){

        let url = 'http://localhost:8000/fetch/' + what;
    
        try{
            let response = await fetch(url);
            let data = await response.json();
            return data;
        }
        catch(error)
        {
            console.error(error);
        }
    }

    static async jsonFetchPOST(what, options){

        let url = 'http://localhost:8000/fetch/' + what;
    
        try{
            let response = await fetch(url, options);
            let data = await response.json();
            return data;
        }
        catch(error)
        {
            console.error(error);
        }
    }
}