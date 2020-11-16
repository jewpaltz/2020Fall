/* B"H

*/
const API_ROOT = process.env.API_ROOT || 'http://localhost:3001/';

export function myFetch(url){
    return fetch( API_ROOT + url  ).then(x=> x.json() )
}

