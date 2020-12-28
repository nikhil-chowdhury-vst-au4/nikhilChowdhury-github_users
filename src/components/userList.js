import React from "react";
import { Card,ListGroup,ListGroupItem,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../github_PNG15.png";
const UserList = (props) => {
    return(
        <div className="container">
         {props.users.length > 0 && <h1 className="text-center my-4">{props.heading}</h1>}
            <div  className= "row">
        {props.users.map((user, idx) => (
        <div className="col-xs-12 col-md-6 col-lg-4 col-xl-3 mb-md-3 mb-4 d-flex" key={user.id}>
        <Card className="text-center mx-auto flex-grow-1">
          <Card.Img variant="top" src= {props.users.length? user.avatar_url: {Logo}} alt = "type something"/>
          <Card.Body className="d-flex justify-content-center align-items-center">
            <Card.Title>username: {user.login}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem><Card.Link href={user.html_url}>Github Link</Card.Link></ListGroupItem>
            <ListGroupItem><Card.Link href={user.repos_url}>repositories Link</Card.Link></ListGroupItem>
          </ListGroup>
          <Button variant="danger" onClick = {() => props.onClickUser(user.id)}>{props.buttonText}</Button>
</Card>
</div>
        ))}
        </div>
</div>
      
    )
}

export default UserList;