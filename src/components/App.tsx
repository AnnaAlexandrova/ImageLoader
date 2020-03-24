import React from 'react';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header} from './Header/Header';
import {Footer} from './Footer/Footer';
import {NotFoundPage} from './Header/NotFoundPage/NotFoundPage';
import {ImageLoaderHooks} from "./Main/ImageLoaderHooks";
import {NasaDayPhotoHooks} from "./Main/NasaDayPhotoHooks";


export default function App(): JSX.Element {
    return (
        <div className='body'>
            <Router>
                <Header/>
                <div className='main'>
                    <Switch>
                        <Route exact path='/' component={ImageLoaderHooks}/>
                        <Route exact path='/imageLoader' component={ImageLoaderHooks}/>
                        <Route exact path='/nasaDayPhoto' component={NasaDayPhotoHooks}/>
                        <Route path='/*' component={NotFoundPage}/>
                    </Switch>
                </div>
                <Footer/>
            </Router>
        </div>
    );
}
