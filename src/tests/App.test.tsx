import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import App from '../App'

describe('App — routing', () => {
  it('renders Home page at /', () => {
    render(<App />)
    expect(screen.getByText(/discover your/i)).toBeInTheDocument()
  })
})
