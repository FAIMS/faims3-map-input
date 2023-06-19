/**
 * @jest-environment jsdom
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react'

import { FieldMetaProps, FormikProps, FormikState } from 'formik'
import { MapFormField } from '.'

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


it('renders as a button', async () => {
  const props = {
    value: {},
    name: 'point',
    onChange: (x: any) => x,
    onBlur: (x: any) => x,
  }
  const fprops: FormikProps<any> = {values: {}}
  const fstate: FieldMetaProps<any> = null

  await act(() => {
    ReactDOM.createRoot(container).render(
    <MapFormField
      field={props}
      featureType='Point'
      form={fprops}
      meta={fstate} 
    />)});

  expect(screen.getByRole('button', {name: 'Get Point'}))
})

it('creates a map when the button is pressed', async () => {
  const props = {
    value: {},
    name: 'point',
    onChange: jest.fn(),
    onBlur: jest.fn()
  }
  window.scrollTo = jest.fn()
  const fprops: FormikProps<any> = {values: {}}
  const fstate: FieldMetaProps<any> = null

  await act(() => {
    ReactDOM.createRoot(container).render(
    <MapFormField
      field={props}
      featureType='Point'
      form={fprops}
      meta={fstate}
    />)});

  const button = container.querySelector('button');

  await act(() => {
    fireEvent.click(button)
  });
  expect(container.querySelector('.ol-viewport'))
})


export {}
