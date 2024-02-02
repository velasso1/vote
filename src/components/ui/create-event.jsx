import React from 'react';

const CreateEvent = () => {
    return ( 
        <div className="create-event">
            <h1 className="create-event__title">Создание нового события</h1>
            <div className="create-event__info">
                <label htmlFor="">Введите название события</label>
                <input  className="create-event__name" type="text" placeholder='Введите название'/>

                <label htmlFor="">Введите описание события</label>
                <textarea className="create-event__description" name="description" placeholder='Введите описание'/>

                <label htmlFor="">Введите количество людей, которые будут голосовать</label>
                <input className="create-event__quantity" type="number" min={0} placeholder='Введите количество'/>
            </div>
            <div className="create-event__peoples">
                <div className="1">
                    <span className="create-event__subtitle">Выбранные люди</span>
                    <ul className="create-event__selected">
                        <li className="create-event__item">1</li>
                    </ul>
                </div>

                <div className="2">
                    <span className="create-event__subtitle">Все люди</span>
                    <ul className="create-event__all">
                        <li className="create-event__item">2</li>
                    </ul>
                </div>
            </div>
        </div>
     );
}
 
export default CreateEvent;