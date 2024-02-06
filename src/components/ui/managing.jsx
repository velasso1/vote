import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userToEdit } from '../../store/slices/user';
import { deleteUser } from '../../store/slices/user';
import config from '../../auxuliary.json';

const Managing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const editUserData = (user) => {
        navigate(`/edit-user/${user.id}`);
        dispatch(userToEdit(user));
    }

    const deleteUserData = (user) => {
        dispatch(deleteUser(user.id));
    }

    return (
        <div className="managing">
            <h1 className='managing__title'>Управление пользователями</h1>
            <div className="managing__">
                <table className="managing__list">
                    <tbody>
                        <tr>
                            <th>Учетные записи</th>
                            <th colSpan={2}>Действие</th>
                        </tr>
                        {config.peoples.map((item, index) => {
                            return (
                                <tr className="managing__item" key={index}>
                                    <td>{item.login}</td>
                                    <td className="managing__edit" onClick={() => editUserData(item)}>Редактировать</td>
                                    <td className="managing__delete" onClick={() => deleteUserData(item)}>Удалить</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Managing;