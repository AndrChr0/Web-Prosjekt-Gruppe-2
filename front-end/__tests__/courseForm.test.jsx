import React from 'react';
import '@testing-library/jest-dom'; 
import { vi, describe, it, expect} from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CourseForm from '../src/components/courseForm/CourseForm';
import axios from 'axios';


vi.mock('axios');
Storage.prototype.getItem = vi.fn();

const renderForm = () => {
    return render(
        <Router>
            <CourseForm />
        </Router>
    );
};


describe('Realistic Cases', () => {
    beforeEach(() => {
        // Mock localStorage.getItem to return a token
        Storage.prototype.getItem.mockReturnValue("mocktoken");
      });

      afterEach(() => {
        vi.clearAllMocks();
      });

    describe('given that page loads', () => {

        it('should render the new course form correctly', async () => {
            renderForm();
            await waitFor(() => {
                expect(screen.getByText('Course Name:')).toBeInTheDocument();
                expect(screen.getByText('Course Code:')).toBeInTheDocument();
                expect(screen.getByText('Submit')).toBeInTheDocument();
            });
        });
    });

    describe('given that user wants to make a new course', () => {
        it('should create a new course', async () => {
            renderForm();
            vi.mock('axios');

            const mockcourseData = {
                title: "A web course",
                courseCode: "IDG2222",
                userId: "1"
            };

            const mockResponse = { data: { token: 'mocktoken' } };
            axios.post.mockImplementationOnce(() => {
            return Promise.resolve(mockResponse);
            });

            const courseNameInput = screen.getByPlaceholderText('Enter course name');

            const courseCodeInput = screen.getByPlaceholderText('Enter course code');
            // fill the inputs
            fireEvent.change(courseNameInput, { target: { value: mockcourseData.title } });
            fireEvent.change(courseCodeInput, { target: { value: mockcourseData.courseCode } });
    
            const submitbtn = screen.getByText('Submit');
            fireEvent.click(submitbtn);
            
            
            axios.post('http://localhost:5151/courses', mockcourseData);

            await waitFor(() => {
                // when form submits, expect a navigation back to /my_courses
                expect(window.location.pathname).toEqual("/my_courses");
              });
        });
    });
});


describe('Boundary Cases', () => {

    describe('Given that the user enters a course name with 3 characters (the minimum)', () => {
        it('should be considered valid input and not show error', async () => {
            renderForm();
            const courseNameInput = screen.getByPlaceholderText('Enter course name');
            const courseCodeInput = screen.getByPlaceholderText('Enter course code');
            fireEvent.change(courseNameInput, { target: { value: 'abc' } });
            fireEvent.change(courseCodeInput, { target: { value: 'IDG2222' } });

            expect(courseNameInput).toHaveValue('abc');
            
            const submitBtn = screen.getByText('Submit');
            fireEvent.click(submitBtn);

            await waitFor(() => {
                expect(screen.queryByText('Course name must be at least 3 characters long.')).toBeNull();
            });

        });
    });
});


describe('Edge Cases', () => {
    describe('Given that the user enters a course name under 3 characters', () => {
        it('should give an error in return', async () => {
            renderForm();

            const mockcourseData = {
                title: "a",
                courseCode: "IDG222",
            };

            const courseNameInput = screen.getByPlaceholderText('Enter course name');
            const courseCodeInput = screen.getByPlaceholderText('Enter course code');

            fireEvent.change(courseNameInput, { target: { value: mockcourseData.title } });
            fireEvent.change(courseCodeInput, { target: { value: mockcourseData.courseCode } });

            const submitBtn = screen.getByText('Submit');
            fireEvent.click(submitBtn);

            await waitFor(() => {
                expect(screen.getByText('Course name must be at least 3 characters long.')).toBeInTheDocument();
            });
        });
    }); 
});


describe('Negative Cases', () => {
    describe('Given that the user submits empty form, null', () => {
        it('should display that the fields are required', async () => {
            renderForm();
            const courseNameInput = screen.getByPlaceholderText('Enter course name');
            const courseCodeInput = screen.getByPlaceholderText('Enter course code');

            fireEvent.change(courseNameInput, { target: { value: "" } });
            fireEvent.change(courseCodeInput, { target: { value: "" } });

            const submitBtn = screen.getByText('Submit');
            fireEvent.click(submitBtn);

            await waitFor(() => {
                expect(courseCodeInput).toBeRequired();
                expect(courseNameInput).toBeRequired();
            });
        });
    });
});