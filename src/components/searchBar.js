import React, {useState, useEffect} from "react";
import { InputGroup,FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import toaster  from 'toasted-notes' 
import 'toasted-notes/src/styles.css';

const SearchBar = ({setUsers}) => {
    const [query, setquery] = useState("")


    useEffect(() => {
      const source = axios.CancelToken.source();
      const cancelToken = source.token;
      const fetchUsers = async () => {
        //Donot waste api calls on empty query calls
        if(!query) 
        {
          setUsers([])
          return
        }
 
          try {
              const data = await axios.get(`https://api.github.com/search/users?q=${query}`, {
                  cancelToken
              })
              setUsers(data.data.items)
           //if items zero then show toaster
           if(data.data.items.length === 0)
           toaster.notify('User not found please type a different name', {
            duration: 2000
          })
          } catch (error) {
               toaster.notify('Something wemt wrong', {
            duration: 2000
          })
              console.log("error", error)
          }
      }
  
      const timeoutToken = setTimeout(fetchUsers, 500)
  
      return () => {
        //clear the debounce api caller
          clearTimeout(timeoutToken)
          //clear the call so unwanted data doesnt get set
          source.cancel("Query changed, SO the request has been cancelled")
      }
  }, [query,setUsers]);

    return (
        <div className="container">
        <InputGroup className="mt-4">
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
        onChange={(e) => setquery(e.target.value)} 
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          className="pr-5" 
          placeholder= "Type a name"/>
      </InputGroup>

      </div>
    )
}

export default SearchBar;