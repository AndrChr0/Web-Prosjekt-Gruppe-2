import "@testing-library/jest-dom"
import { describe, it, expect, beforeEach, vi } from "vitest"
import { setupServer } from "msw/node"
import { rest } from "msw"
import { renderHook } from "@testing-library/react-hooks/dom"

import { useLatestReflections } from "../src/pages-teacher/Home/useLatestReflections"
import axios from "axios"

//axios.defaults.adapter = require("axios/lib/adapters/http")

const server = setupServer(
  rest.get("http://localhost:5151/reflections", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 1,
        data: [
          {
            _id: "6634289688342c3e8f3ef9ce",
            title: "dsf",
            content: "<p><em>dsfdsfadf</em></p>",
            visibility: true,
            files: [],
            userId: "6634282588342c3e8f3ef99d",
            courseId: { _id: "66341ffd88342c3e8f3ef92b", title: "pppppppppp" },
            createdAt: "2024-05-02T23:58:14.092Z",
            updatedAt: "2024-05-02T23:58:14.092Z",
            __v: 0,
          },
        ],
      })
    )
  })
)

beforeEach(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("useLatestReflections hook", () => {
  it("successfully fetches data and returns the top five reflections", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useLatestReflections()
    )
    await waitForNextUpdate()
    expect(result.current.reflections).toHaveLength(1)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBeFalsy()
  })

  it("handles zero reflections gracefully", async () => {
    server.use(
      rest.get("http://localhost:5151/reflections", (req, res, ctx) => {
        return res(ctx.json({ count: 0, data: [] }))
      })
    )
    const { result, waitForNextUpdate } = renderHook(() =>
      useLatestReflections()
    )
    await waitForNextUpdate()
    expect(result.current.reflections).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBeFalsy()
  })

  it("handles server errors by setting isError", async () => {
    server.use(
      rest.get("http://localhost:5151/reflections", (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )
    const { result, waitForNextUpdate } = renderHook(() =>
      useLatestReflections()
    )
    await waitForNextUpdate()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBeTruthy()
  })

  it("tests network error", async () => {
    server.use(
      rest.get("http://localhost:5151/reflections", (req, res, ctx) => {
        return res(ctx.networkError("Failed to connect"))
      })
    )
    const { result, waitForNextUpdate } = renderHook(() =>
      useLatestReflections()
    )
    await waitForNextUpdate()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.isError).toBeTruthy()
  })
})
