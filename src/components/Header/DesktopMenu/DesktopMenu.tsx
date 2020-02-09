import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import './DesktopMenu.css';

export class DesktopMenu extends React.Component {
    render() {
        return (
            <Navbar bg='dark' variant='dark'>
                <Nav variant='pills'>
                    <Nav.Link>
                        <Link to='/imageLoader' className='link-style'>Загрузить фото</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to='/nasaDayPhoto' className='link-style'>Фото дня от NASA</Link>
                    </Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}