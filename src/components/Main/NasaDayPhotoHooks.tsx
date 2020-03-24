import React, {useState} from 'react';
import './Main.css';
import {Button, Col, Form, Spinner} from 'react-bootstrap';

const myKey: string = 'ZgjDKeAjElmUHevN4X97y9Bxt1BReWaAPrccaHFn';

const path: string = `https://api.nasa.gov/planetary/apod?api_key=${myKey}&`;

const errorImg: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1jSgqSR3LajqtjDDRsgHEIwh4U8KMziTB3TZurCMYYxq9QPNO';

const defaultImg: string = 'https://www.nasa.gov/sites/all/themes/custom/nasatwo/images/nasa-logo.svg';

export function NasaDayPhotoHooks(): JSX.Element {
    const [inputInfo, setInputInfo] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [hasError, setHasError] = useState<boolean>(false);
    const [imgUrl, setImgUrl] = useState<string>(defaultImg);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');

    function inputDateOnChange(event: React.FormEvent): void {
        let inputText = event.target as HTMLInputElement;

        setInputInfo(inputText.value);
    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault();

        const request: XMLHttpRequest = new XMLHttpRequest();

        request.open(
            'GET',
            path + `date=${inputInfo}`
        );
        request.send();

        setIsLoading(true);

        request.onreadystatechange = function () {
            if (request.status === 200) {
                const response = JSON.parse(request.response);

                setInputInfo('');
                setResult(response.explanation);
                setImgUrl(response.url);
                setIsLoading(false);
                setTitle(response.title);
                setHasError(false);
            } else {
                const response = JSON.parse(request.response);

                setHasError(true);
                setResult(response.msg);
                setIsLoading(false);
                setImgUrl(errorImg);
                setTitle('Error!');
            }
        }
    }

    return (
        <div className='content-body'>
            <h1 className='nasa-content-header'>Фото дня от NASA</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md='6'>
                        <Form.Label>Введите дату в формате ГГГГ-ММ-ДД (текущая дата по умолчанию)</Form.Label>
                        <Form.Control type='text' value={inputInfo}
                                      onChange={inputDateOnChange}
                                      placeholder='YYYY-MM-DD'/>
                    </Form.Group>
                    <Col>
                        <Button variant='primary' type='submit' className='form-button-style'>OK</Button>
                    </Col>
                </Form.Row>
            </Form>

            <div className='nasa-photo-content'>
                <Spinner animation='border' hidden={!isLoading}/>
                <div hidden={isLoading}>
                    <h2 className={!hasError ? 'nasa-content-header' : 'on-error-header'}>{title}</h2>
                    <img src={imgUrl} className='nasa-image-style' alt='Not found'/>
                    <div>{result}</div>
                </div>
            </div>
        </div>
    );
}