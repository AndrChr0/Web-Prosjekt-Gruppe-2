
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import DiaryReflections from '../src/components/DiaryReflections/DiaryReflections';
import { it } from 'vitest';

vi.mock('axios');
Storage.prototype.getItem = vi.fn(); // Mock localStorage globally

const renderComponent = () => {
  render(
    <Router>
      <DiaryReflections />
    </Router>
  );
};

describe('ANDREAS - DiaryReflections Component tests', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    // Mock localStorage.getItem to return a token
    Storage.prototype.getItem.mockReturnValue('mocked-token');
  });

  afterEach(() => {
    // clear all mocks after each test
    vi.clearAllMocks();
  });

  describe('ANDREAS - DiaryReflections Realistic Usage cases', () => {
    it('renders multiple reflections correctly', async () => {
      // Mock the API response
      axios.get.mockResolvedValue({
        data: { data: [
          { _id: '1', title: 'My first reflection', updatedAt: '2021-04-22T12:00:00.000Z' },
          { _id: '2', title: 'My second reflection', updatedAt: '2021-05-22T12:00:00.000Z' }
        ]}
      });

      renderComponent();
      await waitFor(() => {
        expect(screen.getByText('My first reflection')).toBeInTheDocument();
        expect(screen.getByText('My second reflection')).toBeInTheDocument();
      });
    });


    it('Provies proper response when no reflections are found', async () => {
      axios.get.mockResolvedValue({ data: { data: [] } });
      renderComponent();
      await waitFor(() => {
        expect(screen.queryByText('Some reflection title')).not.toBeInTheDocument();
        expect(screen.getByText('No reflections found')).toBeInTheDocument();
      });
    });

    

  });

  describe('ANDREAS - diaryReflection Boundary Cases', () => {
    it('it should handle exactly one reflection', async () => {
      axios.get.mockResolvedValue({
        data: { data: [
          { _id: '1', title: 'Why feeding wild chickens might not be a good idea after all.', updatedAt: '2021-04-22T12:00:00.000Z' }
        ]}
      });

      renderComponent();
      await waitFor(() => {
        expect(screen.getByText('Why feeding wild chickens might not be a good idea after all.')).toBeInTheDocument();
        expect(screen.queryByText('No reflections found')).not.toBeInTheDocument();
        expect(screen.getByText('22.4.2021, 14:00:00')).toBeInTheDocument();
      });
    });

    
  });

  describe('ANDREAS - diaryReflection Edge Cases', () => {

    it('handles far future dates', async () => {
      axios.get.mockResolvedValue({
        data: { data: [
          { _id: '1', title: 'Space... the final frontier', updatedAt: '3000-01-01T00:00:00.000Z' }
        ]}
      });

      renderComponent();
      await waitFor(() => {
        expect(screen.getByText('1.1.3000, 01:00:00')).toBeInTheDocument();
      });
    });

    it('handles far past dates', async () => {
      axios.get.mockResolvedValue({
        data: { data: [
          { _id: '1', title: 'Past Reflection', updatedAt: '1900-01-01T00:00:00.000Z' }
        ]}
      });

      renderComponent();
      await waitFor(() => {
        expect(screen.getByText('1.1.1900, 01:00:00')).toBeInTheDocument();
      });
    });

    it('handles reflections with special characters', async () => {
      axios.get.mockResolvedValue({
        data: { data: [
          { _id: '1', title: 'Some whacky title: !@#$%^&*()', updatedAt: '2024-04-22T12:00:00.000Z' }
        ]}
      });

      renderComponent();
      await waitFor(() => {
        expect(screen.getByText('Some whacky title: !@#$%^&*()')).toBeInTheDocument();
      });
    });

  });

  describe('ANDREAS - diaryReflection Negative Cases', () => {

    it('handles API failures gracefully', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText('Failed to load reflections. Please try again.')).toBeInTheDocument(); 
      });
    }); 


  });
});
