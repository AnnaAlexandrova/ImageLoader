import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from './Header/Header';
import { ImageLoader } from './Main/ImageLoader';
import { NasaDayPhoto } from './Main/NasaDayPhoto';
import { Footer } from './Footer/Footer';
import { NotFoundPage } from "./Header/NotFoundPage/NotFoundPage";

export default class App extends React.Component {
    render() {
        return (
          <Router>
              <Header />
              <Switch>
                  <Route exact path='/' component ={ ImageLoader } />
                  <Route exact path='/imageLoader' component={ ImageLoader } />
                  <Route exact path='/nasaDayPhoto' component={ NasaDayPhoto } />
                  <Route path='/*' component={ NotFoundPage } />
              </Switch>
              <Footer />
          </Router>
        );
    }
}
