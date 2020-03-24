import React, {useState} from 'react';
import {Button, Form, Col, Alert, Modal} from 'react-bootstrap';
import './Main.css';

const placeholder: string = 'https://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder.png';
const imageAlt: string = 'Loading';

export function ImageLoaderHooks(): JSX.Element {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [images, setImages] = useState<Array<string>>([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const [urlIsValid, setUrlIsValid] = useState<boolean>(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
    const [imageIdForRemoving, setImageIdForRemoving] = useState<number>(-1);

    function validateUrl(imageUrl: string): boolean {
        return imageUrl.trim().length > 0;
    }

    function onUrlChange(event: React.FormEvent): void {
        let urlValue: HTMLInputElement = event.target as HTMLInputElement;

        setImageUrl(urlValue.value);
        setUrlIsValid(validateUrl(urlValue.value));
    }

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault();

        if (urlIsValid) {
            const image: HTMLImageElement = new Image();
            image.onload = () => {
                setImages(images.concat(imageUrl));
                setImageUrl('')
            };

            image.onerror = () => {
                setHasError(true);
                setImageUrl('');
                setImages(prevState => [...prevState.slice(0, -1)]);
            };

            setImages(images.concat(placeholder));

            image.src = imageUrl;
        }
    }

    function handleConfirmDialogClick(): void {
        deleteImage();

        setImageIdForRemoving(-1);
        setShowConfirmDialog(false);
    }

    function deleteImageDialogClick(event: React.MouseEvent): void {
        const image: HTMLImageElement = event.currentTarget as HTMLImageElement;
        const imageId: number = parseInt(image.id);
        setShowConfirmDialog(true);
        setImageIdForRemoving(imageId);
    }

    function deleteImage(): void {
        images.splice(imageIdForRemoving, 1);
        setImages(prevState => prevState);
    }

    let imagesList = images.map((image, imageId) => (
        <img
            src={image}
            id={imageId.toString()}
            key={imageId}
            className='image-style'
            onClick={deleteImageDialogClick}
            alt={imageAlt}>
        </img>
    ));

    return (
        <div className='content-body'>
            <Alert variant='danger' hidden={!hasError}>
                <Alert.Heading>Изображение не найдено!</Alert.Heading>
                <p>
                    Пожалуйста, убедитесь, что правильно ввели адрес изображения.
                </p>
                <Button variant='outline-primary' type='button' onClick={() => setHasError(false)} block>OK</Button>
            </Alert>

            <Modal centered={true} show={showConfirmDialog}>
                <Modal.Header>
                    <Modal.Title>Удаление изображения</Modal.Title>
                </Modal.Header>
                <Modal.Body>Хотите удалить изображение?</Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleConfirmDialogClick}>Удалить</Button>
                    <Button variant='secondary' onClick={() => setShowConfirmDialog(false)}>Отмена</Button>
                </Modal.Footer>
            </Modal>

            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md='6'>
                        <Form.Label>Введите URL изображения</Form.Label>
                        <Form.Control type='text' value={imageUrl}
                                      onChange={onUrlChange}
                                      placeholder='https://image.url.com/'
                                      required/>
                    </Form.Group>
                    <Col>
                        <Button variant='primary' type='submit'
                                className='form-button-style'
                                disabled={!validateUrl(imageUrl)}>Загрузить</Button>
                    </Col>
                </Form.Row>
            </Form>

            <div className='image-list-style'>{imagesList}</div>
        </div>
    );
}
