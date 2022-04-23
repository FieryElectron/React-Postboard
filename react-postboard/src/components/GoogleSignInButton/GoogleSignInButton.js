import { GoogleLogin } from "react-google-login";
import { useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const clientId = process.env.REACT_APP_CLIENT_ID;


const GoogleSignInButton = () => {
    const loginGoogleUrl = useSelector(state => state.authApis.apis.logingoogle);
    const navigate = useNavigate();

    const onSuccess = async (resp) => {
        console.log("Sign In success!", resp.profileObj.givenName);

        const res = await axios.post(loginGoogleUrl, {username:resp.profileObj.givenName}, {withCredentials: true});

        if(res.data.flag){
            navigate('/postboard');
        }

        toast.info(res.data.info, {
            position: "top-center",
            autoClose: 1000,
            pauseOnFocusLoss:false,
        });
        
    }

    const onFailure = (res) => {
        console.log("Sign In failed!");
    }

    return(
        <div id="signInButton">
            <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onSuccess}
            onFailure={onFailure}
            // isSignedIn={true}
            />
        </div>
    )
}


export default GoogleSignInButton;