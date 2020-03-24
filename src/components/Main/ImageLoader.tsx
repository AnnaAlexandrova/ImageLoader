import React from 'react';
import {Button, Form, Col, Alert, Modal} from 'react-bootstrap';
import './Main.css';

type ImageLoaderProps = {};

type ImageLoaderState = {
    imageUrl: string;
    images: string[];
    hasError: boolean;
    urlIsValid: boolean;
    showConfirmDialog: boolean;
    imageIdForRemoving: number;
};

const placeholder: string = 'https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png';
const imageAlt: string = 'Loading';

export class ImageLoader extends React.Component<ImageLoaderProps, ImageLoaderState> {
    state: ImageLoaderState;

    constructor(props: ImageLoaderProps) {
        super(props);
        this.state = {
            imageUrl: '',
            images: [],
            hasError: false,
            urlIsValid: false,
            showConfirmDialog: false,
            imageIdForRemoving: -1
        };

        this.onUrlChange = this.onUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAlertCloseClick = this.onAlertCloseClick.bind(this);
        this.deleteImageDialogClick = this.deleteImageDialogClick.bind(this);
        this.handleConfirmDialogClick = this.handleConfirmDialogClick.bind(this);
        this.handleCancelDialogClick = this.handleCancelDialogClick.bind(this);
    }

    validateUrl(imageUrl: string): boolean {
        return imageUrl.trim().length > 0;
    }

    onUrlChange(event: React.FormEvent) {
        let urlValue = event.target as HTMLInputElement;
        this.setState({
            imageUrl: urlValue.value,
            urlIsValid: this.validateUrl(urlValue.value)
        });
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (this.state.urlIsValid) {
            const image: HTMLImageElement = new Image();
            image.onload = () => {
                this.setState(prevState => ({
                    images: [...prevState.images.slice(0, -1), prevState.imageUrl],
                    imageUrl: ''
                }));
            };

            image.onerror = () => {
                this.setState(prevState => ({
                    hasError: true,
                    imageUrl: '',
                    images: prevState.images.slice(0, -1)
                }));
            };

            this.setState(prevState => ({
                images: [...prevState.images, placeholder]
            }));

            image.src = this.state.imageUrl;
        }
    }

    onAlertCloseClick() {
        this.setState({hasError: false});
    }

    handleConfirmDialogClick() {
        this.deleteImage();

        this.setState({
            imageIdForRemoving: -1,
            showConfirmDialog: false
        });
    }

    handleCancelDialogClick() {
        this.setState({showConfirmDialog: false});
    }

    deleteImageDialogClick(event: React.MouseEvent) {
        const image = event.currentTarget as HTMLImageElement;
        const imageId: number = parseInt(image.id);
        this.setState({showConfirmDialog: true, imageIdForRemoving: imageId});
    }

    deleteImage() {
        this.state.images.splice(this.state.imageIdForRemoving, 1);
        this.setState(prevState => ({
            images: prevState.images
        }));
    }

    render() {
        let imagesList = this.state.images.map((image, imageId) => (
            <img
                src={image}
                id={imageId.toString()}
                key={imageId}
                className='image-style'
                onClick={this.deleteImageDialogClick}
                alt={imageAlt}>
            </img>
        ));

        return (
            <div className='content-body'>
                <Alert variant='danger' hidden={!this.state.hasError}>
                    <Alert.Heading>Изображение не найдено!</Alert.Heading>
                    <p>
                        Пожалуйста, убедитесь, что правильно ввели адрес изображения.
                    </p>
                    <Button variant='outline-primary' type='button' onClick={this.onAlertCloseClick} block>OK</Button>
                </Alert>

                <Modal centered={true} show={this.state.showConfirmDialog}>
                    <Modal.Header>
                        <Modal.Title>Удаление изображения</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Хотите удалить изображение?</Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' onClick={this.handleConfirmDialogClick}>Удалить</Button>
                        <Button variant='secondary' onClick={this.handleCancelDialogClick}>Отмена</Button>
                    </Modal.Footer>
                </Modal>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md='6'>
                            <Form.Label>Введите URL изображения</Form.Label>
                            <Form.Control type='text' value={this.state.imageUrl}
                                          onChange={this.onUrlChange}
                                          placeholder='https://image.url.com/'
                                          required/>
                        </Form.Group>
                        <Col>
                            <Button variant='primary' type='submit'
                                    className='form-button-style'
                                    disabled={!this.validateUrl(this.state.imageUrl)}>Загрузить</Button>
                        </Col>
                    </Form.Row>
                </Form>

                <div className='image-list-style'>{imagesList}</div>
            </div>
        );
    }
}