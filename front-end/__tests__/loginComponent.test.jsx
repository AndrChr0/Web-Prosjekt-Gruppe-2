import React from 'react';
import '@testing-library/jest-dom'; 
import { vi, describe, it} from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../src/components/Login/loginComponent';
import { AuthProvider } from '../src/components/context/AuthContext';
import axios from 'axios';
import jwt from 'jsonwebtoken';

 // import handleSubmit function to run tests on
import { handleSubmit } from '../src/components/Login/loginComponent';


vi.mock('axios');
Storage.prototype.getItem = vi.fn();

// login component relies on useAuth hook, so we need to wrap it with AuthProvider in order to test it properly
// reusable function to render component
const renderLogin = () => {
    return render(
        <Router>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </Router>
    );
};


describe('Realistic cases', () => {
    // test if login component renders
    describe('check login component render', () => {
        it('should render', () => {
            const { container } = render(
            <Router>
                <AuthProvider>
                <Login />
                </AuthProvider>
            </Router>
            );
            expect(container).toBeInTheDocument();
        });
    });

    describe('Check that email and password fields are able to render', () => {
        it('should render the login input fields', async () => {
            renderLogin();
            await waitFor(() => { 
            
                const emailInput = screen.getByPlaceholderText('Email');
                const passwordInput = screen.getByPlaceholderText('Password'); 
                
                expect(emailInput).toBeInTheDocument();
                expect(passwordInput).toBeInTheDocument();
                
                console.log("Email and password inputs were rendered");
            });
        });
    });

    // want to test if POST req is made upon submitting the form with credentials. only testing the request, not that the login is valid
    // testing the handleSubmit function in the login component. The function handles login based on credentials, 
    // and makes a POST request to the server and stores the token in local storage. 

    describe('Given that the login form is submitted', () => {
        it('should make a post request to /users/login', async () => {
            const setLoginError = vi.fn();
            const mockCredentials = {
                email: 'testuser@mail.com',
                password: 'password',
            };
            const mockResponse = { data: { token: 'mocktoken' } };
            axios.post.mockResolvedValueOnce(mockResponse);

            // trigger the function
            await handleSubmit(mockCredentials, setLoginError); //testing the function alone

            expect(axios.post).toHaveBeenCalledWith('http://localhost:5151/users/login', mockCredentials);
            console.log("post request was made");
        });
    });

    it('should log in user successfully', async () => {

        renderLogin();

        const mockCredentials = {
            email: 'validlogin@mail.com',
            password: 'password',
        };

        const mockPayload = {
            name: 'John doe',
            role: 'student'
        };

        const secretKey = 'secret';
        // generating a token with the payload
        const mockToken = jwt.sign(mockPayload, secretKey); 

        const mockResponse = { 
            data: 
            { 
            token: mockToken, 
            role: 'student'} 
        };

        axios.post.mockResolvedValueOnce(mockResponse);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Log In');

        fireEvent.change(emailInput, { target: { value: mockCredentials.email } });
        fireEvent.change(passwordInput, { target: { value: mockCredentials.password } });

        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:5151/users/login', mockCredentials);
            expect(screen.queryByText('Failed to login. Please check your input and try again.')).toBeNull();
            
        });
    });
});

describe('Boundary Cases', () => {

    describe('given that the login button is clicked', () => {
        it('should display that input is required if email and password fields are empty', async () => {
            renderLogin(); 

            const emailInput = screen.getByPlaceholderText('Email');
            const passwordInput = screen.getByPlaceholderText('Password');
    
            const loginButton = screen.getByRole('button', { name: 'Log In' });
            fireEvent.click(loginButton);
    
            await waitFor(() => {
                expect(emailInput).toBeRequired();
                expect(passwordInput).toBeRequired();
            });
        });
    });
});


describe('Edge Cases', () => {
    it('should display an error message if the submitted password is less than 8 characters', async () => {
        renderLogin(); 

        axios.post.mockRejectedValueOnce({
            response: {
                data: {
                    message: 'password must be at least 8 characters'
                }
            }
        });

        // fill login fields
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'abc' } });

        // trigger submit button click
        const loginButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            // want to expect err msg
            const errorMessage = screen.queryByText('Failed to login. Please check your input and try again.');
            expect(errorMessage).toBeInTheDocument();
        });
    });

});

describe('Negative Cases', () => {
    describe('Given that user attempt to log in with credentials', () => {
    it('should display an error message for network errors', async () => {
        renderLogin(); 

        // mocking network error
        axios.post.mockRejectedValueOnce(new Error('Network error'));

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        const loginButton = screen.getByRole('button', { name: 'Log In' });
        fireEvent.click(loginButton);

        await waitFor(() => {
            // since the component has this as its only error message, then we can expect it
            const errorMessage = screen.queryByText('Failed to login. Please check your input and try again.');
            expect(errorMessage).toBeInTheDocument();
        });
        
    });
    });
});