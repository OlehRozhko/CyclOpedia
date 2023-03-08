import React from 'react'
import ReactDOM from 'react-dom/client'
import CyclopediaClassPage from './CyclopediaClassPage';
import CyclopediaFunc from './CyclopediaFunc';
import Header from './Header'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <Header />
    <div className="row text-white">
      <div className="col-6">
        <span className='h1 text-warning text-center'>Class Component</span>
        <CyclopediaClassPage />
      </div>
      <div className="col-6">
        <span className='h1 text-warning text-center'>Functional Component</span>
        <CyclopediaFunc />
      </div>
    </div>
  </div>,
)
