import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Dashboard } from '../../components/Dashboard'
import { store } from '../../store'
import { Provider } from 'react-redux'

const renderDashboard = () => {
  render(
    <Provider store={store}>
      <Dashboard />
    </Provider>,
  )
}
describe('Dashboard Component - Initial Data Load', () => {
  // Testes relacionados à carga de dados inicial
  it('loads data correctly on initial mount', async () => {
    renderDashboard()
    // Aguarda a carga dos dados (pode ser necessário ajustar o tempo de espera)
    await waitFor(async () => {
      // Adapte a busca conforme necessário, substituindo pelo seletor ou texto real esperado
      const dataElement = await screen.findByTestId('data-element-id')
      expect(dataElement).toBeInTheDocument()
    })
  })
  it('renders the Dashboard component correctly', () => {
    renderDashboard()
    // Check if the Dashboard title ('Dashboard' or 'Dashboard Page Title') is present on the screen
    const dashboardTitle = screen.getByText(/Dashboard( Page Title)?/i)
    expect(dashboardTitle).toBeInTheDocument()
  })
  it('handles the case when there are no data', async () => {
    // Modifica o estado para simular um estado de ausência de dados
    store.dispatch({ type: 'producers/noData' })
    renderDashboard()
    // Aguarda a renderização do componente
    await waitFor(() => {
      // Adapte a busca conforme necessário, substituindo pelo seletor ou texto real esperado
      const noDataElement = screen.queryByText(/No data available/i)
      // Verifica se o elemento não está presente na tela
      expect(noDataElement).toBeNull()
    })
  })
})
describe('Dashboard Component - UI Elements', () => {
  // Testes relacionados aos elementos da interface do usuário
  it('displays the "Generate Report" button', () => {
    renderDashboard()
    // Check if the "Generate Report" button is present
    const generateReportButton = screen.getByRole('button', {
      name: 'Generate Report',
    })
    expect(generateReportButton).toBeInTheDocument()
  })
  it('displays the "State" chart title', () => {
    renderDashboard()
    // Check if the "State" chart title is present
    const stateChartTitle = screen.getByText('Estado')
    expect(stateChartTitle).toBeInTheDocument()
  })
})
describe('Dashboard Component - Charts', () => {
  // Testes relacionados aos gráficos
  it('renders charts and visualizations correctly', () => {
    renderDashboard()
    // Adicione verificações específicas para garantir que os gráficos estejam renderizados corretamente
    // Por exemplo, verifique se um elemento relacionado ao gráfico está presente
    const chartElement = screen.getByTestId('chart-test-id')
    expect(chartElement).toBeInTheDocument()
  })
})
