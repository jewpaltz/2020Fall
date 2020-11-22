/*  B"H
    Feed Model. The raw data for the feed display.
    Currently mocked at the client side.
*/
import { myFetch } from "./my-fetch";
import session from "./session";

export const getPosts = ()=> myFetch(`graphql`, {
    query: `{
        posts {
            id,
            URL,
            Text,
            user {
                id,
                FirstName,
                LastName
            },
            comments {
                id,
                Text,
                user {
                    id,
                    FirstName,
                    LastName
                }     
            }
        }
    }`
}).then(x=> x.data.posts);

export function react(post_id){
    //console.log(session.user)
    return myFetch('reactions', { Post_id: post_id, Owner_id: 1 })
}

export function comment(post_id, text){
    return myFetch('comments', { Post_id: post_id, Owner_id: 1, Text: text })
}