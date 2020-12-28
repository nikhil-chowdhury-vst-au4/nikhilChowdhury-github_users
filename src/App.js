import React from "react";
import SearchBar from "./components/searchBar"
import UserList from "./components/userList"
import toaster  from 'toasted-notes' 
import 'toasted-notes/src/styles.css';
import Logo from "./github_PNG15.png";

function App() {
  const [users, setUsers] = React.useState([])
  const [savedUsers, setSavedUsers] =React.useState([]);

const onSaveUser = (userId) => {
  const userToBeSaved = users.find((eachUser) => eachUser.id === userId)

  
if(savedUsers.findIndex((u)=>u.id === userId) > -1){
  toaster.notify('user already saved to local storage', {
    duration: 2000
  })
  return
}

const usersToBeSaved = [...savedUsers, userToBeSaved];

  localStorage.setItem("savedUsers", JSON.stringify(usersToBeSaved));
  setSavedUsers(usersToBeSaved)
  toaster.notify('user saved to local storage', {
    duration: 2000
  })

}

React.useEffect(()=>{
const usersString =   localStorage.getItem("savedUsers");

  if(!usersString)
  return;

  setSavedUsers(JSON.parse(usersString));

},[])


const onRemoveUser = (userId) => {
  const usersToBeSaved = savedUsers.filter((eachUser) => eachUser.id !== userId);
  localStorage.setItem("savedUsers", JSON.stringify(usersToBeSaved));
  setSavedUsers(usersToBeSaved)
  toaster.notify('user removed from local storage', {
    duration: 2000
  })
}
  return (
    <div className="App">
      <div className="container d-flex justify-content-center my-2">
      <img src= {Logo} style={{width: "200px"}} alt= "github-search"></img>
      </div>
     
      <SearchBar setUsers={setUsers} />
      <UserList onClickUser={onSaveUser} buttonText={"Add"}  users={users.filter((u) => savedUsers.findIndex((su) => su.id === u.id) === -1)} heading={"Search Result"} />

      <UserList onClickUser={onRemoveUser} buttonText="Delete"  users={savedUsers} heading={"Saved Users"} />
    </div>
  );
}

export default App;
