import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const EditUser = () => {
    const userData = useSelector((state) => state.user.userData);
    return (
        <div className="">page for edit user with id: {userData.id} and login: {userData.login}</div>
    )
}

export default EditUser;