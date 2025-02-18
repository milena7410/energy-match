import { renderHook, act } from "@testing-library/react"
import { useFornecedores } from "./use-fornecedores"
import { jest, describe, it, expect } from "@jest/globals"

// Mock the useToast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("useFornecedores", () => {
  it("initializes with empty fornecedores and fornecedoresComparados", () => {
    const { result } = renderHook(() => useFornecedores())

    expect(result.current.fornecedores).toEqual([])
    expect(result.current.fornecedoresComparados).toEqual([])
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBe(null)
  })

  it("loads fornecedores after initial render", async () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useFornecedores())

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.fornecedores.length).toBeGreaterThan(0)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBe(null)

    jest.useRealTimers()
  })

  it("handles comparing fornecedores correctly", () => {
    const { result } = renderHook(() => useFornecedores())

    act(() => {
      result.current.handleComparar(1)
    })

    expect(result.current.fornecedoresComparados).toEqual([1])

    act(() => {
      result.current.handleComparar(2)
    })

    expect(result.current.fornecedoresComparados).toEqual([1, 2])

    act(() => {
      result.current.handleComparar(3)
    })

    // Should only keep the last two
    expect(result.current.fornecedoresComparados).toEqual([2, 3])

    act(() => {
      result.current.handleComparar(2)
    })

    // Should remove 2
    expect(result.current.fornecedoresComparados).toEqual([3])
  })
})

