import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserById, getAllUsers } from '../../services/apiCall.js';
import './Admin.css';

export const Admin = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const passport = JSON.parse(localStorage.getItem("passport"))
    const token = passport ? passport.token : null;

    useEffect(() => {
        const bringAllUsers = async () => {
            const allUsers = await getAllUsers(token)
            console.log(allUsers)
            if (allUsers.success) {
                setUsers(allUsers.data)
            } else {
                navigate('/login');
            }
        };
        bringAllUsers()
    }, [navigate, token]);

    const deleteUserHandler = async (e) => {
        const id = +e.target.name;
        const res = await deleteUserById(token, id);
        if (res.success) {
            const remainingUsers = users.filter((user) => {
                if (user.id !== id) {
                    console.log(user)
                    return user
                };
            });
            console.log(remainingUsers)
            setUsers(remainingUsers);
        }
    };
    return (
        <>
            <h1>Admin</h1>
            <div className="users-container">
                <div className="table-row">
                    <div className="content">id</div>
                    <div className="content">email</div>
                    <div className="content">creation date</div>
                    <div className="content">actions</div>
                </div>
                {users.length && users.map((user) => {
                    return (
                        <div className="table-row" key={user.id}>
                            <div className="content">{user.id}</div>
                            <div className="content">{user.email}</div>
                            <div className="content">{user.created_at}</div>
                            <div className="content"><input
                                type="button"
                                name={user.id}
                                value="🛇"
                                onClick={deleteUserHandler}
                            /></div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};
export default Admin;