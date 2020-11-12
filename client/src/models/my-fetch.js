/* B"H

*/

export function myFetch(url){
    return fetch( url  ).then(x=> x.json() )
}

