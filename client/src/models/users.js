/* B"H

*/
import { myFetch } from "./my-fetch";



export function getList() {
    return myFetch('users');
}