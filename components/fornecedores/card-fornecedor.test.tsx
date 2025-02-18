import { render, screen, fireEvent } from "@testing-library/react"
import { CardFornecedor } from "./card-fornecedor"
import { describe, it, expect } from "@jest/globals"
import { jest } from "@jest/globals"

const mockFornecedor = {
  id: 1,
  nome: "EcoEnergia Brasil",
  logo: "/placeholder.svg",
  estado: "São Paulo",
  custoKwh: 0.65,
  limiteMinKwh: 5000,
  totalClientes: 500000,
  avaliacaoMedia: 4.5,
}

describe("CardFornecedor", () => {
  it("renders the fornecedor information correctly", () => {
    render(<CardFornecedor fornecedor={mockFornecedor} onComparar={() => {}} isComparado={false} />)

    expect(screen.getByText("EcoEnergia Brasil")).toBeInTheDocument()
    expect(screen.getByText("São Paulo")).toBeInTheDocument()
    expect(screen.getByText("R$ 0.65")).toBeInTheDocument()
    expect(screen.getByText("5,000 kWh")).toBeInTheDocument()
    expect(screen.getByText("500,000")).toBeInTheDocument()
    expect(screen.getByText("4.5 / 5.0")).toBeInTheDocument()
  })

  it("calls onComparar when the compare button is clicked", () => {
    const mockOnComparar = jest.fn()
    render(<CardFornecedor fornecedor={mockFornecedor} onComparar={mockOnComparar} isComparado={false} />)

    const compareButton = screen.getByRole("button", { name: /Comparar/i })
    fireEvent.click(compareButton)

    expect(mockOnComparar).toHaveBeenCalledWith(1)
  })

  it('shows "Remover" when isComparado is true', () => {
    render(<CardFornecedor fornecedor={mockFornecedor} onComparar={() => {}} isComparado={true} />)

    expect(screen.getByRole("button", { name: /Remover/i })).toBeInTheDocument()
  })
})

