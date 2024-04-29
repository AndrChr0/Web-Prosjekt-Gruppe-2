import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import DiaryReflections from "../src/components/DiaryReflections/DiaryReflections";
import { describe, expect, it } from "vitest";

vi.mock("axios");
Storage.prototype.getItem = vi.fn(); // Mock localStorage globally

const renderComponent = () => {
  render(
    <Router>
      <DiaryReflections />
    </Router>
  );
};

describe("ANDREAS - DiaryReflections Component tests", () => {
  // Clear all mocks before each test
  beforeEach(() => {
    // Mock localStorage.getItem to return a token
    Storage.prototype.getItem.mockReturnValue("mocked-token");
  });

  afterEach(() => {
    // clear all mocks after each test
    vi.clearAllMocks();
  });

  describe("ANDREAS - DiaryReflections Realistic Usage cases", () => {

    describe("Given the user accesses the MyDiary page", () => {

      it("should render the DiaryReflections component correctly", async () => {
        // // Mock the API response
        axios.get.mockResolvedValue({
          data: { data: [] },
        });
        renderComponent();
        await waitFor(() => {
          expect(screen.getByText("My reflections")).toBeInTheDocument();
        });
      });

    });

    describe("Given the user creates a reflection", () => {
      it("it should retrieve  exactly one reflection", async () => {

        const oneReflection = {
          _id: "1",
          title:
            "Why feeding wild chickens might not be a good idea after all.",
          updatedAt: "2024-04-22T12:00:00.000Z",
        };

        axios.get.mockResolvedValue({
          data: {
            data: [oneReflection],
          },
        });

        renderComponent();
        await waitFor(() => {
          expect(
            screen.getByText(
              "Why feeding wild chickens might not be a good idea after all."
            )
          ).toBeInTheDocument();

          expect(screen.queryByText("No reflections found")).not.toBeInTheDocument();
          expect(screen.getByText("22.4.2024, 14:00:00")).toBeInTheDocument();
        });
      });
    });

  
describe("Given the user has made multiple reflections", () => {
  it("should render multiple reflections correctly", async () => {
    // Mock the API response
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            _id: "1",
            title: "My first reflection",
            updatedAt: "2024-04-22T12:00:00.000Z",
          },
          {
            _id: "2",
            title: "My second reflection",
            updatedAt: "2022-05-22T12:00:00.000Z",
          },
          {
            _id: "3",
            title: "My third reflection",
            updatedAt: "2024-06-22T12:00:00.000Z",
          },
        ],
      },
    });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText("My first reflection")).toBeInTheDocument();
      expect(screen.getByText("My second reflection")).toBeInTheDocument();
      expect(screen.getByText("My third reflection")).toBeInTheDocument();
    });
  });
});

describe("Given the user has no reflections", () => {

  it("should provide a proper response when no reflections are found", async () => {
    axios.get.mockResolvedValue({ data: { data: [] } });
    renderComponent();
    await waitFor(() => {
      expect(
        screen.queryByText("Some reflection title")
      ).not.toBeInTheDocument();
      expect(screen.getByText("No reflections found")).toBeInTheDocument();
    });
  });
});
});

});



  describe("ANDREAS - diaryReflection Edge Cases", () => {
   
    describe("Given a reflection contains special characters", () => {
    it("should retrieve  reflections with special characters", async () => {
      const specialCharReflection = {
        _id: "1",
        title: "Some whacky title: !@#$%^&*()",
        describtion: "Some whacky description: !@#$%^&*()",
        updatedAt: "2024-04-22T12:00:00.000Z",
      };

      axios.get.mockResolvedValue({
        data: { data: [specialCharReflection] },
      });

      renderComponent();
      await waitFor(() => {
        expect(screen.getByText("Some whacky title: !@#$%^&*()")).toBeInTheDocument();
      });
    });
  });
  });



  describe("ANDREAS - diaryReflection Negative Cases", () => {

    describe("Given there is a network error in the request", () => {

    it("should return a error message", async () => {
      axios.get.mockRejectedValue(new Error("Network Error"));
      renderComponent();

      await waitFor(() => {
        expect(
          screen.queryByText("Failed to load reflections. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });


  describe("Given the user is not authorized to view reflections", () => {

    it("should display an error if the token is invalid or missing", async () => {
      Storage.prototype.getItem.mockReturnValue(null); // Mocking missing token
      axios.get.mockRejectedValue({
        response: { status: 401, statusText: "Unauthorized" },
      });

      renderComponent();
      await waitFor(() => {
        expect(
          screen.getByText("Failed to load reflections. Please try again.")
        ).toBeInTheDocument();
      });
    });
  });


describe("Given the API returns an empty response", () => {

    it('should display the proper massage when the response value is undefined', async () => {
      axios.get.mockResolvedValue(undefined);
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText('No reflections found')).toBeInTheDocument();
      });
    });

    it('should display the proper massage when the response value is null', async () => {
      axios.get.mockResolvedValue(null);
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText('No reflections found')).toBeInTheDocument();
      });
    });
  });
});
