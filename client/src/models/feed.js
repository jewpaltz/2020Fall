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
              ...userFields
            },
            comments {
                Text,
                user {
                ...userFields
                }     
            },
            reactions {
              id,
              user {
                  ...userFields
              }
            },
            reactionCount
          }
        }
        
        fragment userFields on User {
            id  # this is why the profile pic wasn't working
            FirstName,
            LastName,
            PrimaryEmail
        }`
}).then(x=> x.data.posts);

export function react(post_id){
    const query = `
    mutation Like($post_id: Int!, $owner_id: Int!)  {
        like(Post_id: $post_id, Owner_id: $owner_id) {
          id
          Emoji
          post{
            id
          }
          user {
            id
          }
        }
      }`;
    const owner_id = session.user.id || 1; // Once we've implemented a proper login. The user will have an id. in the meantime this is the mock.
    const variables = { post_id, owner_id  };
    console.log(variables)
    return myFetch('graphql', { query, variables })
}

export function comment(post_id, text){
    return myFetch('comments', { Post_id: post_id, Owner_id: 1, Text: text })
}