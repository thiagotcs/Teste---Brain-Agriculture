import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { ProducerList } from './components/ProducerList'
import { ProducerForm } from './components/Form/ProducerForm'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/producer" element={<ProducerList />} />
      <Route path="/add-producer" element={<ProducerForm />} />
      <Route path="/add-producer/:id/edit" element={<ProducerForm />} />
    </Routes>
  )
}
