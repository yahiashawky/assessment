import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../store/store';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format.');
            return;
        }

        try {
            const response = await axios.post('https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token', {
                email,
                password,
                isEmployee: true,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { token } = response.data;
            document.cookie = `token=${token}; HttpOnly`; // Store token in HTTP Only cookie
            dispatch(setCredentials({ token })); // Save token in Redux store

            // Fetch user info
            const userInfoResponse = await axios.get('https://api-yeshtery.dev.meetusvr.com/v1/user/info', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const { id, name } = userInfoResponse.data;
            dispatch(setCredentials({ userId: id, userName: name }));

            // Redirect to dashboard
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p>{error}</p>}
            <button type="submit" disabled={!email} 