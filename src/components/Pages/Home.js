import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../App";

export default function Home() {
  const { state, dispatch } = useContext(AuthContext);

  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }
  const { avatar_url, name, public_repos, followers, following } = state.user
  const repo = state.repo

  //Logout Function
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  }

  //Function to Find Relative time for update
  const relativeTime = (previous) => {
    previous = new Date(previous)
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Date.now() - previous;
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
      return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  return (
    <div>
      <div className="split left">
        <div className="centered">
          <img className="avatarImg" src={avatar_url} alt="Profile Img" />
          <h2>{name}</h2>
          <div className="info">
            <span >{`Public Repo ${public_repos}`}</span>
            <span>{`Followers ${followers}`}</span>
            <span>{`Following ${following}`}</span>
          </div>
        </div>
      </div>
      <div className="split right">
        <div className="d-flex justify-content-between">
          <h4 className="pl-4">{repo.length !== 0 ? "Reprogetry List" : "Reprogetry List Loding..."}</h4>
          <button className="btn btn-success mr-4" onClick={() => handleLogout()}>Logout</button>
        </div>
        <div>
          <ul className="pl-0">
            {repo.map((item, i) => {
              return <li key={i} className="col-12 d-flex width-full py-4 border-bottom public source">
                <div className="col-10 col-lg-9 d-inline-block">
                  <div className="d-inline-block mb-1">
                    <h3 className="wb-break-all ">
                      <span href="/aman06it/freeCharge" className="fontWeight" itemProp="name codeRepository">
                        {item.name}</span>
                    </h3>
                    <div>
                      <p className="col-9 d-inline-block text-gray mb-2 pr-4" itemProp="description">
                        {item.description}
                      </p>
                    </div>
                    <div className="f6 text-gray mt-2">
                      <span className="ml-0 mr-3">
                        <span className="repo-language-color mr-1"></span>
                        <span itemProp="programmingLanguage">{item.language}</span>
                      </span>
                      Updated <relative-time datetime="2020-10-19T14:45:03Z" className="no-wrap" title="19 Oct 2020, 20:15 GMT+5:30">{relativeTime(item.pushed_at)}</relative-time>
                    </div>
                  </div>
                </div>
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}