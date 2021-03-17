import 'whatwg-fetch'
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import LinkForm from './LinkForm';

const server = setupServer(
  rest.post('/api/links', (req, res, ctx) => {
    return res(ctx.json({ data: { hash: 'asdf55' }}))
  })
)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('<LinkForm />', () => {
  it('Renders <LinkForm /> component', () => {
    const { getByText } = render(<LinkForm />);
    expect(getByText(/Shortly/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  it('Renders Url input with label "Url"', () => {
    const { getByLabelText } = render(<LinkForm />)
    const input = getByLabelText(/url/i)
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toBeRequired()
  })

  it('Renders error message when entering invalid Url', ()=> {
    const { getByLabelText, getByRole, queryByRole, rerender } = render(<LinkForm />)
    const input = getByLabelText(/url/i)
    userEvent.type(input, 'http:')
    expect(getByRole('alert')).toHaveTextContent(/invalid url/i)
  })

  it('Renders no error message with valid Url', () =>{
    const { getByLabelText, queryByRole } = render(<LinkForm />)
    const input = getByLabelText(/url/i)
    userEvent.type(input, 'http://google.com')
    expect(queryByRole('alert')).toBeNull()
  })

  it('Renders error message from server for duplicate', async () => {
    server.use(
      rest.post('/api/links', (req, res, ctx) => {
        return res.once(
          ctx.status(422),
          ctx.json({ errors: { url: ["bad url"] } })
        )
      })
    )
    const { getByRole, getByLabelText, getByText, } = render(<LinkForm />)
    const input = getByLabelText(/url/i)
    userEvent.type(input, 'http://google.com')
    userEvent.click(getByText(/submit/i))
    await waitFor(() => {
      expect(getByRole('alert')).toHaveTextContent(/bad url/i)
    })
  })

  it('shows new shortlink on successful submission', async () => {
    const shortLink = 'http://localhost/asdf55'
    const { getByRole, getByLabelText, getByText, rerender, debug } = render(<LinkForm />)
    const input = getByLabelText(/url/i)
    userEvent.type(input, 'http://google.com')
    userEvent.click(getByText(/submit/i))
    await waitFor(() => {
      rerender(<LinkForm />)
      expect(getByText(/success/i)).toBeInTheDocument()
      expect(getByRole('link')).toHaveAttribute('href', shortLink)
    })
  })


});

