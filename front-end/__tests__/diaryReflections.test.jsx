import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
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

      it("it should render the DiaryReflections component correctly", async () => {
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
      it("it should retrive exactly one reflection", async () => {

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
          expect(
            screen.queryByText("No reflections found")
          ).not.toBeInTheDocument();
          expect(screen.getByText("22.4.2024, 14:00:00")).toBeInTheDocument();
        });
      });
    });
  });

  describe("Given the user creates a new reflection", () => {
  it("it should update the list when a reflection is added and the component re-renders", async () => {
    const initialData = [
      {
        _id: "1",
        title: "Initial Reflection",
        updatedAt: "2024-04-22T12:00:00.000Z",
      },
    ];
    axios.get.mockResolvedValue({ data: { data: initialData } });

    renderComponent();
    await waitFor(() => {
      expect(screen.getByText("Initial Reflection")).toBeInTheDocument();
    });

    // Simulate adding a new reflection
    const newData = [
      ...initialData,
      {
        _id: "2",
        title: "New Reflection",
        updatedAt: "2024-05-22T12:00:00.000Z",
      },
    ];
    axios.get.mockResolvedValue({ data: { data: newData } });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("New Reflection")).toBeInTheDocument();
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
  });
});

describe("Given the user has made multiple reflections", () => {
  it("renders multiple reflections correctly", async () => {
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

  it("Provies proper response when no reflections are found", async () => {
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

describe("ANDREAS - diaryReflection Boundary Cases", () => {
  //   it("it should handle exactly one reflection", async () => {
  //     axios.get.mockResolvedValue({
  //       data: {
  //         data: [
  //           {
  //             _id: "1",
  //             title:
  //               "Why feeding wild chickens might not be a good idea after all.",
  //             updatedAt: "2024-04-22T12:00:00.000Z",
  //           },
  //         ],
  //       },
  //     });

  //     renderComponent();
  //     await waitFor(() => {
  //       expect(
  //         screen.getByText(
  //           "Why feeding wild chickens might not be a good idea after all."
  //         )
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.queryByText("No reflections found")
  //       ).not.toBeInTheDocument();
  //       expect(screen.getByText("22.4.2024, 14:00:00")).toBeInTheDocument();
  //     });
  //   });
  // });

  describe("ANDREAS - diaryReflection Edge Cases", () => {
    // it("handles far future dates", async () => {
    //   axios.get.mockResolvedValue({
    //     data: {
    //       data: [
    //         {
    //           _id: "1",
    //           title: "Space... the final frontier",
    //           updatedAt: "3000-01-01T00:00:00.000Z",
    //         },
    //       ],
    //     },
    //   });

    //   renderComponent();
    //   await waitFor(() => {
    //     expect(screen.getByText("1.1.3000, 01:00:00")).toBeInTheDocument();
    //   });
    // });

    // it("handles far past dates", async () => {
    //   axios.get.mockResolvedValue({
    //     data: {
    //       data: [
    //         {
    //           _id: "1",
    //           title: "Past Reflection",
    //           updatedAt: "1900-01-01T00:00:00.000Z",
    //         },
    //       ],
    //     },
    //   });

    //   renderComponent();
    //   await waitFor(() => {
    //     expect(screen.getByText("1.1.1900, 01:00:00")).toBeInTheDocument();
    //   });
    // });

    describe("Given a reflection contains special characters", () => {

    it("it should retrive reflections with special characters", async () => {
      axios.get.mockResolvedValue({
        data: {
          data: [
            {
              _id: "1",
              title: "Some whacky title: !@#$%^&*()",
              describtion: "Some whacky description: !@#$%^&*()",
              updatedAt: "2024-04-22T12:00:00.000Z",
            },
          ],
        },
      });

      renderComponent();
      await waitFor(() => {
        expect(
          screen.getByText("Some whacky title: !@#$%^&*()")
).toBeInTheDocument();
      });
    });
  });
  });

  describe("ANDREAS - diaryReflection Negative Cases", () => {


    describe("Given there is a network error in the request", () => {

    it("it should return a error message", async () => {
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

    // it('handles API returning empty data', async () => {
    //   axios.get.mockResolvedValue({ data: { data: null } });
    //   renderComponent();

    //   await waitFor(() => {
    //     expect(screen.queryByText('No reflections found')).toBeInTheDocument();
    //   });
    // });
  });
});
