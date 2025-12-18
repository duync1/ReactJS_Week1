import { Outlet } from 'react-router'

import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'

const LayoutPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            padding: '2rem',
            minHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutPage
