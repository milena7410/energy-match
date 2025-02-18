import { render, screen, fireEvent } from "@testing-library/react"
import { SimulacaoConsumo } from "./simulacao-consumo"
import { useToast } from "@/components/ui/use-toast"

// Mock the useToast hook
jest.mock("@/components/ui/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe("SimulacaoConsumo", () => {
  it("renders the component", () => {
    render(<SimulacaoConsumo onSubmit={() => {}} />)
    expect(screen.getByLabelText(/Simule seu consumo mensal/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite seu consumo mensal/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Simular/i })).toBeInTheDocument()
  })

  it("allows input of valid numbers", () => {
    render(<SimulacaoConsumo onSubmit={() => {}} />)
    const input = screen.getByPlaceholderText(/Digite seu consumo mensal/i)
    fireEvent.change(input, { target: { value: "1000" } })
    expect(input).toHaveValue("1000")
  })

  it("prevents input of non-numeric characters", () => {
    render(<SimulacaoConsumo onSubmit={() => {}} />)
    const input = screen.getByPlaceholderText(/Digite seu consumo mensal/i)
    fireEvent.change(input, { target: { value: "abc" } })
    expect(input).toHaveValue("")
  })

  it("prevents input of negative numbers", () => {
    render(<SimulacaoConsumo onSubmit={() => {}} />)
    const input = screen.getByPlaceholderText(/Digite seu consumo mensal/i)
    fireEvent.change(input, { target: { value: "-1000" } })
    expect(input).toHaveValue("")
  })

  it("shows an error message if the input is invalid", () => {
    const mockOnSubmit = jest.fn()
    render(<SimulacaoConsumo onSubmit={mockOnSubmit} />)
    const input = screen.getByPlaceholderText(/Digite seu consumo mensal/i)
    const button = screen.getByRole("button", { name: /Simular/i })
    fireEvent.change(input, { target: { value: "-100" } })
    fireEvent.click(button)
    expect(useToast().toast).toHaveBeenCalledWith({
      title: "Erro",
      description: "Consumo mensal inválido",
      status: "error",
    })
  })

  it("calls onSubmit with the entered value when form is submitted", () => {
    const mockOnSubmit = jest.fn()
    render(<SimulacaoConsumo onSubmit={mockOnSubmit} />)
    const input = screen.getByPlaceholderText(/Digite seu consumo mensal/i)
    const button = screen.getByRole("button", { name: /Simular/i })

    fireEvent.change(input, { target: { value: "1000" } })
    fireEvent.click(button)

    expect(mockOnSubmit).toHaveBeenCalledWith(1000)
  })
})

