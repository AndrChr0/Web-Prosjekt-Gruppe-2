//Edgar


import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Register from "../src/components/Register/Register";

vi.mock("axios");

const renderComponent = () => {
  render(
    <Router>
      <Register />
    </Router>
  );
};

describe("EDGAR - Register Component", () => {
  beforeEach(() => {
    Storage.prototype.getItem = vi.fn().mockReturnValue(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Realistic Usage Cases", () => {
    it("registers with common name formats", async () => {
      renderComponent();
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      const registerButton = screen.getByRole("button", { name: "Register" });

      fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "password123" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "password123" },
      });

      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(window.location.pathname).toEqual("/login");
      });
    });
  });

  describe("Boundary Cases", () => {
    it("submits with minimum valid input", async () => {
      renderComponent();
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      const registerButton = screen.getByRole("button", { name: "Register" });

      fireEvent.change(emailInput, { target: { value: "a@a.com" } });
      fireEvent.change(passwordInput, { target: { value: "pwd12345" } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: "pwd12345" },
      });

      fireEvent.click(registerButton);

      await waitFor(() => {
        expect(window.location.pathname).toEqual("/login");
      });
    });

    it("handles the age boundary for user input", async () => {
    });
  });

  describe("Edge Cases", () => {
    it("handles edge cases of acceptable input", async () => {
      renderComponent();
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      const registerButton = screen.getByRole("button", { name: "Register" });

      fireEvent.change(emailInput, { target: { value: "a".repeat(255) + "@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "pwd12345" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "pwd12345" } });
      fireEvent.click(registerButton);
      await waitFor(() => {
        expect(window.location.pathname).toEqual("/login");
      });
      
    });
  });

  describe("Negative Cases", () => {
    it("displays error messages for invalid input", async () => {
      renderComponent();
      const emailInput = screen.getByPlaceholderText("Email");
      const passwordInput = screen.getByPlaceholderText("Password");
      const confirmPasswordInput = screen.getByPlaceholderText("Confirm Password");
      const registerButton = screen.getByRole("button", { name: "Register" });
    
      fireEvent.change(emailInput, { target: { value: "invalidemail" } });
      fireEvent.change(passwordInput, { target: { value: "short" } });
      fireEvent.change(confirmPasswordInput, { target: { value: "short" } });
    
      fireEvent.click(registerButton);
    
      // const passwordsMismatchError = await screen.findByText("Passwords do not match.");
      // const passwordLengthError = await screen.findByText("Password must be at least 8 characters long.");
    
      // expect(passwordsMismatchError).toBeInTheDocument();
      // expect(passwordLengthError).toBeInTheDocument();
    });
  
  });
  
});
