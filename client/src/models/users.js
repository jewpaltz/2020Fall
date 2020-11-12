/* B"H

*/
import { myFetch } from "./my-fetch";



export function getList() {
    return myFetch('http://localhost:3001/users');
}