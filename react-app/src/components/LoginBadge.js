import session from "../models/session";

function LoginBadge() {
    
return (
    <div id="LoginBadge">
        { session.user ?
        <div className="media" >
            <div className="media-left">
                <figure className="image">
                    <img src={session.user.profile} alt="Placeholder image" />
                </figure>
            </div>
            <div className="media-content">
                <p className="has-text-weight-bold">{session.user.name}</p>
                <p className="is-size-7">@{session.user.handle}</p>
            </div>
        </div>

            :
        <div className="buttons" >
          <a className="button">
            <strong>Sign up</strong>
          </a>
            <router-link to="/login"  className="button is-light" >
                Log in
            </router-link>
        </div>
        }
    </div>
    )}
    
export default LoginBadge;