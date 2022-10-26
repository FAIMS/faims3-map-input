// @ts-ignore
import React from 'react';
import { Field, Form, Formik } from 'formik';
import {MapFormField} from 'faims3-map-input'
import Button from '@mui/material/Button'
import './ExampleForm.css'

const ExampleForm = () => {

  const center = [151.21409960967713,-33.85543752567224]

  const value = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            151.2123170963103,
            -33.85179701635804
          ]
        },
        "properties": null
      }
    ]
  }

  return (
      <Formik
        initialValues={{ point: {}, polygon: {}, linestring: {}, sample: value}}
        onSubmit={(values: any, actions: any) => {
            console.log(values)
            actions.setSubmitting(false);
        }}
      >
        {(formProps) => (
          <div id="demoformcontainer">
            <div id="theform">
                  <h1>Test Form</h1>
          <Form>

            <p>First button does not specify featureType so defaults to Point, center is defined</p>
            <Field label="This label was set explicitly" name="point" center={center} component={MapFormField} />

            <p>Specify center position and featureType: Point</p>
            <Field name="point" center={center} featureType="Point" component={MapFormField} />
            <p>Polygon with no specified center, uses current location, zoom set to 10</p>
            <Field name="polygon" zoom={10} featureType="Polygon" component={MapFormField} />
            <p>Linestring with no center, uses current location</p>
            <Field name="linestring" featureType="LineString" component={MapFormField} />
            <p></p>
            <Button variant='contained' color='primary' type="submit">Submit</Button>


            <Field label="Sample Data" name="sample" center={center} component={MapFormField} />


          </Form>

            </div>
              <div id="formvaluedisplay">
                <pre>
                {JSON.stringify(formProps.values, null, 2)}
                </pre>
              </div>
              </div>
        )}
      </Formik>
)
};


export default ExampleForm;