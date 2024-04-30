import React from 'react';
import '@testing-library/jest-dom'; 
import { vi, describe, it, expect} from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecentReflection from '../src/components/RecentReflection/RecentReflection';
import axios from 'axios';


vi.mock('axios');
Storage.prototype.getItem = vi.fn();

const renderRecentReflection = () => {
    return render(
        <Router>
            <RecentReflection />
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

        it('should render the RecentReflection component correctly', async () => {
            axios.get.mockResolvedValue({
                data: {
                  data: [],
                },
              });
            renderRecentReflection();
            await waitFor(() => {
                expect(screen.getByText('My Reflections')).toBeInTheDocument();
            }
            );
        });

        it('should render component with mock data', async () => {
            const mockReflection = { 
                title: 'A student reflection', 
                content: 'content of the reflection', 
            };
            axios.get.mockResolvedValue({
                data: {
                  data: [mockReflection],
                },
              });

            renderRecentReflection();

            expect(screen.getByText('A student reflection')).toBeInTheDocument();
    
        });
    });
});


describe('Boundary Cases', () => {

    describe('', () => {
        it('', async () => {
            
            
        });
    });
});


describe('Edge Cases', () => {

    describe('', () => {
        it('', async () => {
            
            
        });
    });
});

describe('Negative Cases', () => {

    describe('', () => {
        it('', async () => {
            
            
        });
    });
});
