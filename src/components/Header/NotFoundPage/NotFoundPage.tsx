import React from 'react';
import {Card} from 'react-bootstrap';
import './NotFoundPage.css';

export class NotFoundPage extends React.Component {
    render() {
        return (
            <div className='not-found-page-body'>
                <Card className="text-center">
                    <Card.Img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQmDKixnmDiEGAazG1N-7oAW8gOqxHptOFkFbt6SfISycwV_zEx'
                    />
                    <Card.Body>
                        <Card.Title>Error 404</Card.Title>
                        <Card.Text>
                            Sorry, this page not found
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}