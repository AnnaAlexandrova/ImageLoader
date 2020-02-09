import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import './MobileMenuButton.css';
import {Link} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class MobileMenuButton extends React.Component {
    render() {
        return (
            <Navbar bg='dark' variant='dark'>
                <Nav variant='pills'>
                    <Menu>
                        <Link className='menu-item' to='/imageLoader'>
                            Загрузить фото
                        </Link>
                        <Link className='menu-item' to='/nasaDayPhoto'>
                            Фото дня от NASA
                        </Link>
                    </Menu>
                </Nav>
            </Navbar>
        );
    }
}