import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import GithubIcon from "mdi-react/GithubIcon";
import { AuthContext } from "../../App";
import ApiCall from '../common/API/ApiCall'
import urlMapping from '../common/API/Api'


export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        client_id: state.client_id,
        redirect_uri: state.redirect_uri,
        client_secret: state.client_secret,
        code: newUrl[1]
      };
      //API call for authentication
      ApiCall(urlMapping.authentication(requestData), (response) => {
        if (response.status === true) {
          dispatch({
            type: "LOGIN",
            payload: { user: response.result, isLoggedIn: true }
          })
          //API call for repo list
          ApiCall(urlMapping.userRepo(), (response) => {
            if (response.status === true) {
              dispatch({
                type: "REPO",
                repo: response.result
              })
            }else{
              alert("Something went wrong");
            }
          })
        }else{
          alert("Something went wrong");
        }
      })
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <section className="container">
        <div>
          <h1>Welcome</h1>
          <span>Super amazing app-knit app</span>
          <span>{data.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
                <>
                  {
                    // Link to request GitHub access
                  }
                  <a
                    className="login-link"
                    href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                    onClick={() => {
                      setData({ ...data, errorMessage: "" });
                    }}
                  >
                    <GithubIcon />
                    <span>Login with GitHub</span>
                  </a>
                </>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}