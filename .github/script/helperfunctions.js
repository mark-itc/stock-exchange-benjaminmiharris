export async function GETCompanyDetails(url){

    try{
        const response = await fetch (url); 
        const results = await response.json();
        const dataFeed = await results.profile;

        return dataFeed;

    } catch (e) {
        console.log(e);
    }
}


