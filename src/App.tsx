import { Provider as ReduxProvider } from 'react-redux'
import Header from './components/Header'
import { Sidebar } from './components/Sidebar'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import AppRouter from './Router'

export function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <div className="min-h-screen lg:grid lg:grid-cols-app">
          <Sidebar />
          <main className="max-w-[100vw] px-4 pb-12 pt-24 lg:col-start-2 lg:px-8 lg:pt-8">
            <Header />
            <AppRouter />
          </main>
        </div>
      </BrowserRouter>
    </ReduxProvider>
  )
}
