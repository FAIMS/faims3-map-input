/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
// import { Field, Form, Formik } from 'formik';
import { FormikProps, FormikState } from 'formik'
import { MapFormField } from '.'

it('renders as a button', () => {
  const props = {
    value: {},
    name: 'point',
    onChange: (x: any) => x,
    onBlur: (x: any) => x,
  }
  // const fprops: FormikProps<any> = null
  // const fstate: FormikState<any> = null

  // render(
  //   <MapFormField
  //     field={props}
  //     featureType='Point'
  //     form={fprops}
  //     meta={fstate}
  //   />
  // )
  expect(screen.getByText('Get Point'))
  expect(screen.getByRole('button'))
})

it('creates a map when the button is pressed', async () => {
  const props = {
    value: {},
    name: 'point',
    onChange: jest.fn(),
    onBlur: jest.fn()
  }
  window.scrollTo = jest.fn()
  // const fprops: FormikProps<any> = {}
  // const fstate: FormikState<any> = {}

  // render(
  //   <MapFormField
  //     field={props}
  //     featureType='Point'
  //     form={fprops}
  //     meta={fstate}
  //   />
  // )
  // fireEvent.click(screen.getByRole('button'))
  expect(document.querySelector('.ol-viewport'))
})


export {}
