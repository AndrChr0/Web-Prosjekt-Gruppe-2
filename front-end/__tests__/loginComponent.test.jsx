import React from 'react';
import '@testing-library/jest-dom'; 
import { vi, describe, it} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../src/components/Login/loginComponent';
import { AuthProvider } from '../src/components/context/AuthContext';
import axios from 'axios';

 // import handleSubmit function to run tests on
import { handleSubmit } from '../src/components/Login/loginComponent';

vi.mock('axios');
Storage.prototype.getItem = vi.fn();

// login component relies on useAuth hook, so we need to wrap it with AuthProvider in order to test it properly
// test if login component renders
  describe('login component', () => {
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

describe('Check that email and password fields are able to render', () => {
    it('should render the login input fields', async () => {
        renderLogin();
        await waitFor(() => { 
            // get inputs based on placeholder text
            const emailInput = screen.getByPlaceholderText('Email');
            const passwordInput = screen.getByPlaceholderText('Password'); 
            expect(emailInput).toBeInTheDocument();
            expect(passwordInput).toBeInTheDocument(); // toMatchInlineSnapshot() -- can use this method to check expected output
            console.log("email and password inputs were rendered");
        });
    });
}
);

// test that submit button triggers the handleSubmit function
/* describe('Check that submit button triggers handleSubmit function', () => {
    it('should trigger handleSubmit function when form is submitted', async () => {
        renderLogin();
        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: 'Log In' });

        // fill fields
        emailInput.value = 'testuser@mail.com';
        passwordInput.value = 'password';

        
        // trigger the submit button
        submitButton.click();
        expect(handleSubmit).toHaveBeenCalled();
        console.log("handleSubmit function was triggered");
    }
    );
}); */

// want to test if POST req is successful upon submitting the form with credentials
describe('Check that post request is made when form is submitted', () => {
    it('should make a post request to /users/login when form is submitted', async () => {
        const mockCredentials = {
            email: 'testuser@mail.com',
            password: 'password',
        };
        const mockResponse = { data: { token: 'mocktoken' } };
        axios.post.mockResolvedValueOnce(mockResponse);

        // trigger the function
        await handleSubmit(mockCredentials);

        expect(axios.post).toHaveBeenCalledWith('http://localhost:5151/users/login', mockCredentials);
        console.log("post request was made and login was successful");
    });
});