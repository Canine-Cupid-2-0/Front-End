import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext"
import "./style.css";

export function Button(props) {
    return ( 
        <button
            className="matchbtn" {...props}>{props.text}
        </button>
    );
};

export function MessageButton(props) {
    return ( 
        <button
            className="messagebutton" {...props.children}>{props.text}
        </button>
    );
};

export function ModalButton(props) {
    return ( 
        <button
            className="LoginModalButton"
            onClick={props.onClick}
            style={props}>
            Okay
        </button>
    );
};
export function XButton(props) {
    console.log(props.onClick)
    return ( 
        <button
            className="XButton"
            onClick={props.onClickOne}
            style={props}>
            X
        </button>
    );
};
export function LoginButton(props) {
    return (
        <button 
        onClick={props.onClick}
        style={props}
        >
            Log In
        </button>
    );
}
export function LoginModalButton(props) {
    console.log(props)
    return ( 
        <button
            className="LoginModalButton topright" {...props}
            onClick={props.onClick}
            >
            X
        </button>
    );
};

export function SignupButton(props) {
        const history = useHistory();
        function handleClick() {
            history.push("/signup");
        }
        return (
            <button 
            className="Signuphome" 
            onClick={handleClick} >
                Sign Up
            </button>
        );
}
export function HomeButton(props) {
    const history = useHistory();
    function handleClick() {
        history.push("/login");
    }
    return (
        <button 
        className="homeButton" 
        onClick={handleClick} >
            Home Page
        </button>
    );
}
export function AboutUsButton(props) {
    const history = useHistory();
    function handleClick() {
        history.push("/aboutus");
    }
    return (
        <button 
        className="abtUs" 
        onClick={handleClick} >
            Our Story
        </button>
    );
}
export function EditProfileButton() {
    const history = useHistory();
    function handleClick() {
        history.push("/editprofile");
    }
    return (
        <button style={{marginLeft:"22%"}}
            className="editProfile"
            onClick={handleClick} >
            <p className="edit-btn"> Edit Profile </p>
        </button>
    );
}

export function MyProfileButton() {
    const history = useHistory();
    function handleClick() {
        history.push("/profile");
    }
    return (
        <button 
        className="btn" 
        onClick={handleClick} >
           <p className="btn-login" > My Profile </p>
        </button>
    );
}

export function MatchNowButton() {
    const { allUsersNames, getNewUserData, getNewUserName } = useContext(UserContext)
    const history =  useHistory();
        
    async function getUserData (firstUser) {
        console.log ("getNewUser",firstUser)
        await API.getUserByName(firstUser)
        // .then(response=>console.log(response))
        .then((response) =>{
            getNewUserData(response.data); 
            getNewUserName(response.data.userName)
            history.push("/matchnow")
        }) 
    }

    function handleClick() {
        const rand = function (items) {
            return items[~~(items.length * Math.random())];
        }
        const firstUser = rand(allUsersNames)
        getUserData(firstUser)
        // .then(history.push("/matchnow"));
    }
    return (
        <button 
        className="btn" 
        onClick={handleClick} >
          <p className="btn-login" > Match Now </p>
        </button>
    );
}

export function MatchesButton() {
    const {userForMatchesPage, getAllMatchesForMatchesPage, user} = useContext(UserContext)
    const history = useHistory();
    let newVar = user
    const getUserDataById = async () => {
        await API.getMatchesYesByName(newVar.userName)
        .then(response => getAllMatchesForMatchesPage(response.data))
        
    }
    async function handleClick(user) {
        console.log(userForMatchesPage, "anytext")
        await getUserDataById(user)
        .then(history.push("/matches"))
    }
    return (
    <button 
    className="btn" 
    onClick={handleClick} >
      <p className="btn-login" > Matches </p>
    </button>
    );
}

export function LogOutButton() {
    const { user, getData } = useContext(UserContext)
    const history = useHistory();

    useEffect(
        ()=>{localStorage.setItem('user', JSON.stringify(user));
      }, [user])

    function handleClick() {
        getData("")
        history.push("/login");
    }
    return (
        <button 
        className="btn" 
        onClick={handleClick} >
                  <p className="btn-login" > Log Out </p>
        </button>
    );
}