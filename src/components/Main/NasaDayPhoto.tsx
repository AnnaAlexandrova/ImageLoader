import React from 'react';
import './Main.css';
import {Button, Col, Form, Spinner} from 'react-bootstrap';

type NasaDayPhotoProps = {};

type NasaDayPhotoState = {
    inputInfo: string;
    result: string;
    hasError: boolean;
    imgURL: string;
    isLoading: boolean;
    title: string;
};

const myKey: string = 'ZgjDKeAjElmUHevN4X97y9Bxt1BReWaAPrccaHFn';

const path: string = `https://api.nasa.gov/planetary/apod?api_key=${myKey}&`;

const errorImg: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1jSgqSR3LajqtjDDRsgHEIwh4U8KMziTB3TZurCMYYxq9QPNO';

const defaultImg: string = 'https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg';

export class NasaDayPhoto extends React.Component<NasaDayPhotoProps, NasaDayPhotoState> {
    state: NasaDayPhotoState;

    constructor(props: NasaDayPhotoProps) {
        super(props);

        this.state = {
            inputInfo: '',
            result: '',
            hasError: false,
            imgURL: defaultImg,
            isLoading: false,
            title: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputDateOnChange = this.inputDateOnChange.bind(this);
    }

    inputDateOnChange(event: React.FormEvent) {
        let inputText = event.target as HTMLInputElement;

        this.setState({inputInfo: inputText.value});
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const request: XMLHttpRequest = new XMLHttpRequest();

        request.open(
            'GET',
            path + `date=${this.state.inputInfo}`
        );
        request.send();

        this.setState({isLoading: true});

        const self = this;

        request.onreadystatechange = function () {
            if (request.status === 200) {
                const response = JSON.parse(request.response);

                self.setState({
                    inputInfo: '',
                    result: response.explanation,
                    imgURL: response.url,
                    isLoading: false,
                    title: response.title,
                    hasError: false
                });
            } else {
                const response = JSON.parse(request.response);

                self.setState({
                    hasError: true,
                    result: response.msg,
                    isLoading: false,
                    imgURL: errorImg,
                    title: 'Error!'
                })
            }
        }
    }

    render() {
        return (
            <div className='content-body'>
                <h1 className='nasa-content-header'>Фото дня от NASA</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md='6'>
                            <Form.Label>Введите дату в формате ГГГГ-ММ-ДД (текущая дата по умолчанию)</Form.Label>
                            <Form.Control type='text' value={this.state.inputInfo}
                                          onChange={this.inputDateOnChange}
                                          placeholder='YYYY-MM-DD'/>
                        </Form.Group>
                        <Col>
                            <Button variant='primary' type='submit' className='form-button-style'>OK</Button>
                        </Col>
                    </Form.Row>
                </Form>

                <div className='nasa-photo-content'>
                    <Spinner animation='border' hidden={!this.state.isLoading}/>
                    <div hidden={this.state.isLoading}>
                        <h2 className={!this.state.hasError ? 'nasa-content-header' : 'on-error-header'}>{this.state.title}</h2>
                        <img src={this.state.imgURL} className='nasa-image-style' alt='Not found'/>
                        <div>{this.state.result}</div>
                    </div>
                </div>
            </div>
        );
    }
}