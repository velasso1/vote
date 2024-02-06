import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createEvent } from "../../store/slices/events";
import config from "../../auxuliary.json";

const CreateEvent = () => {
  const dispatch = useDispatch();

  const [allPeoples, setAllPeoples] = useState([...config.peoples]);
  const [votedPeoples, setVotedPeoples] = useState([]);

  const [state, setState] = useState({
    error: false,
    empty: false,
    sending: false
  });

  const [eventInfo, setEventInfo] = useState({
    name: "",
    description: "",
    dateCreated: "",
    numberOfVotes: "",
    // votedPeoples: '',
  });

  const validate = () => {
    setState({error: false, empty: false});

    for (let key in eventInfo) {
      if (eventInfo[key] === '') {
        setState({...state, empty: true});
        return;
      }
    }

    if (+eventInfo.numberOfVotes !== +votedPeoples.length) {
      setState({error: true, empty: false}); 
      return;
    }
    
    sendData();
  }

  const choosePeople = (id) => {
    setVotedPeoples([...votedPeoples, ...allPeoples.filter((item) => item.id === id)]);
    setAllPeoples(allPeoples.filter((item) => item.id !== id));
  };

  const deletePeople = (id) => {
    setAllPeoples([...allPeoples, ...votedPeoples.filter((item) => item.id === id)])
    setVotedPeoples(votedPeoples.filter((item) => item.id !== id));
  }

  const sendData = () => {
    dispatch(createEvent(eventInfo));
    setState({ ...state, sending: true });
    // dateCreated reset ????
    setTimeout(() => {
      setEventInfo({
        ...eventInfo,    
        name: "",
        description: "",
        // dateCreated: "",
        numberOfVotes: "",
        // votedPeoples: '',
    });
      setVotedPeoples([]);
      setState({ error: false, empty: false, sending: false });
    }, 3000);
  }

  return (
    <div className="create-event">
      <h1 className="create-event__title">Создание нового события</h1>
        {state.empty && (
          <span className="create-event__clue">
            *Все поля должны быть заполнены
          </span>
        )}
      <div className="create-event__info">
        <label htmlFor="name">Введите название события</label>
        <input
          disabled={state.sending}
          style={{borderColor: state.empty && eventInfo.name === '' ? "red" : "black"}}
          onChange={(e) => setEventInfo({...eventInfo, name: e.target.value})}
          value={eventInfo.name}
          className="create-event__name"
          type="text"
          name="name"
          placeholder="Введите название"
        />

        <label htmlFor="description">Введите описание события</label>
        <textarea
          disabled={state.sending}
          style={{borderColor: state.empty && eventInfo.description === '' ? "red" : "black"}}
          onChange={(e) => setEventInfo({...eventInfo, description: e.target.value})}
          value={eventInfo.description}
          className="create-event__description"
          name="description"
          placeholder="Введите описание"
        />

        <label htmlFor="quantity">Введите количество голосующих</label>
        <input
          disabled={state.sending}
          onChange={(e) => setEventInfo({...eventInfo, numberOfVotes: e.target.value})}
          value={eventInfo.numberOfVotes}
          className="create-event__quantity"
          type="number"
          min={0}
          name="quantity"
          placeholder="Введите количество"
        /> 
        {state.error && (
          <span className="create-event__clue">
            *Введенное количество не совпадает с количеством выбранных людей
          </span>
        )}

        {eventInfo.dateCreated === '' &&  <span className="create-event__clue">
            Укажите дату голосования
          </span>}

        <input disabled={state.sending} className="create-event__date" type="date" onChange={(e) => setEventInfo({...eventInfo, dateCreated: e.target.value})} />
      </div>
      <div className="create-event__peoples">
        <div className="create-event__left">
          <span className="create-event__subtitle">Выбранные люди</span>
          <ul className="create-event__selected">
            {votedPeoples.length !== 0 ? (
              votedPeoples.map((item, index) => {
                return (
                  <li className="create-event__item" key={index} onClick={() => deletePeople(item.id)}>
                    {item.login}
                  </li>
                );
              })
            ) : (
              <li className="create-event__item">Никто не выбран</li>
            )}
          </ul>
        </div>

        <div className="create-event__right">
          <span className="create-event__subtitle">Все люди</span>
          <ul className="create-event__all" >
            {allPeoples.map((item, index) => {
              return (
                <li
                  className="create-event__item"
                  key={index}
                  onClick={() => choosePeople(item.id)}
                >
                  {item.login}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="create-event__buttons">
        <button disabled={state.sending} className="create-event__button" onClick={() => validate()}>Создать событие</button>
        <button disabled={state.sending} className="create-event__button">Очистить форму</button>
      </div>
    </div>
  );
};

export default CreateEvent;
