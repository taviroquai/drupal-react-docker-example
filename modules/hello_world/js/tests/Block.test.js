import React from 'react'
import { render, fireEvent, waitFor, screen } from './setup'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Block from '../src/Block'

// establish API mocking before all tests
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const handlers = []

function addJSONFixture(key, json) {
  handlers.push(rest.get(key, (req, res, ctx) => {
    return res(ctx.json(json))
  }))
}

addJSONFixture('/jsonapi/node/article', { data: [{ id: 'foo', attributes: { title: 'foo' }}] });

const server = setupServer(...handlers);

it('Displays default block plugin correctly', async () => {
  render(<Block />)
  
  // Test sync results
  let result = screen.getByTestId('welcome');
  expect(result).toBeTruthy();
  expect(result.textContent).toBe('Hello React!');
})

it('Displays block plugin correctly when request fails', async () => {
  render(<Block uri="/bad request" />)

  // Test async results
  await waitFor(() => {
    let result = screen.getByTestId('articles');
    expect(result).toBeTruthy();
    expect(result.children.length).toBe(0);

    result = screen.getByTestId('error');
    expect(result).toBeTruthy();
    expect(result.textContent).not.toBe('');
  })
})

it('Displays block plugin correctly when request succeeds', async () => {
  render(<Block />)

  // Test async results
  await waitFor(() => {
    let result = screen.getByTestId('articles');
    expect(result).toBeTruthy();
    expect(result.children.length).toBe(1);

    result = screen.getByTestId('error');
    expect(result).toBeTruthy();
    expect(result.textContent).toBe('');
  })
})