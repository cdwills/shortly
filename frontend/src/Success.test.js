import { render } from '@testing-library/react';
import Success from './Success';

describe('<Success />', () => {
  it('Renders <Success /> component', () =>{
    const { getByText } = render(<Success />)
    expect(getByText(/success/i)).toBeInTheDocument()
  })

  it('renders shortlink',() => {
    const shortLink = 'http://localhost/ytr45'
    const { getByRole, getByText } = render(<Success shortLink={shortLink} />)
    expect(getByText(shortLink)).toBeInTheDocument()
    expect(getByRole('link')).toHaveAttribute('href', shortLink)
  })

  it('renders do-it-again button', () => {
    const shortLink = 'http://localhost/ytr45'
    const { getByRole } = render(<Success shortLink={shortLink} />)
    expect(getByRole('button')).toHaveTextContent(/do it again!/i)
  })

})
