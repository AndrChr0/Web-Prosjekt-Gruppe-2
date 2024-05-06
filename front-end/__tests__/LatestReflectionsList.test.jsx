import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { render, screen } from "@testing-library/react"
import { describe, it, expect, afterEach, vi } from "vitest"
import { LatestReflectionsList } from "../src/pages-teacher/Home/LatestReflectionsList"
import * as reflectionsHook from "../src/pages-teacher/Home/useLatestReflections"
import "@testing-library/jest-dom"
// Automatically clean up after each test
afterEach(() => {
  vi.restoreAllMocks()
})

describe("LatestReflectionsList Tests", () => {
  it("displays reflections when data is successfully fetched", () => {
    const mockData = [
      { _id: "123", courseCode: "CS101", title: "Intro to Computer Science" },
      { _id: "456", courseCode: "CS102", title: "Advanced Algorithms" },
    ]
    vi.spyOn(reflectionsHook, "useLatestReflections").mockReturnValue({
      reflections: mockData,
      isLoading: false,
      isError: false,
    })

    render(
      <Router>
        <LatestReflectionsList />
      </Router>
    )

    expect(screen.getByText("CS101")).toBeInTheDocument()
    expect(screen.getByText("Intro to Computer Science")).toBeInTheDocument()
    expect(screen.getByText("CS102")).toBeInTheDocument()
    expect(screen.getByText("Advanced Algorithms")).toBeInTheDocument()
  })

  it("displays a loading state appropriately", () => {
    vi.spyOn(reflectionsHook, "useLatestReflections").mockReturnValue({
      reflections: [],
      isLoading: true,
      isError: false,
    })

    render(
      <Router>
        <LatestReflectionsList />
      </Router>
    )

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("displays an error message when there is an error fetching data", () => {
    vi.spyOn(reflectionsHook, "useLatestReflections").mockReturnValue({
      reflections: [],
      isLoading: false,
      isError: true,
    })

    render(
      <Router>
        <LatestReflectionsList />
      </Router>
    )

    expect(screen.getByText("Error fetching Data")).toBeInTheDocument()
  })

  it("handles an empty list of reflections", () => {
    vi.spyOn(reflectionsHook, "useLatestReflections").mockReturnValue({
      reflections: [],
      isLoading: false,
      isError: false,
    })

    render(
      <Router>
        <LatestReflectionsList />
      </Router>
    )

    expect(screen.queryByText("Student-Name")).toBeNull()
    expect(screen.queryByText(/CS\d+/)).toBeNull() // No course codes displayed
  })

  it("handles reflections with unusual characters in titles or course codes", () => {
    const unusualData = [
      { _id: "999", courseCode: "CS101@#$", title: "Intro? Yes/No" },
    ]
    vi.spyOn(reflectionsHook, "useLatestReflections").mockReturnValue({
      reflections: unusualData,
      isLoading: false,
      isError: false,
    })

    render(
      <Router>
        <LatestReflectionsList />
      </Router>
    )

    expect(screen.getByText("CS101@#$")).toBeInTheDocument()
    expect(screen.getByText("Intro? Yes/No")).toBeInTheDocument()
  })
})
