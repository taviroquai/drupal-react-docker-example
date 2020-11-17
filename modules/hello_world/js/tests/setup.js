import React from 'react'
import { render } from '@testing-library/react'
import 'whatwg-fetch'

const AllTheProviders = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }