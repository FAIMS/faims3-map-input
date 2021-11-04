// @ts-ignore
import React from 'react';
import { Field, Form, Formik } from 'formik';
import {MapFormField} from 'faims3-map-input'
import Button from '@material-ui/core/Button'
import './ExampleForm.css'

const ExampleForm = () => {

  const center = [151.21409960967713,-33.85543752567224]
  const geoTiffNoProjection = process.env.PUBLIC_URL + '/tif1.tif'
  const geoTiffProjection = 'EPSG:28354'
  const geoTiffURL = 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/2020/S2A_36QWD_20200701_0_L2A/TCI.tif'

  return (
      <Formik
        initialValues={{ point: {}, polygon: {}, gtlinestring: {}, linestring: {} }}

        onSubmit={(values: any, actions: any) => {
            console.log(values)
            actions.setSubmitting(false)
        }}
      >
        {(formProps) => (
          <div id="demoformcontainer">
            <div id="theform">
                  <h1>Test Form</h1>
          <Form>
            <p>Point, default map, defined center.</p>
            <Field name="point" center={center} featureType="Point" component={MapFormField} />

            <p>Polygon, local basemap with projection defined explicitly, no center defined.</p>
            <Field name="polygon" 
                label="Polygon GeoTiff no Projection"
                geoTiff={geoTiffNoProjection}
                projection={geoTiffProjection}
                featureType="Polygon" 
                component={MapFormField} />
            <p>Linestring, no center defined.</p>
            <Field name="linestring"  featureType="LineString" component={MapFormField} />

            <p>Linestring, basemap from remote URL, basemap defines projection, center defined.</p>
            <Field name="gtlinestring" 
                   label="Get Linestring with Geotiff" 
                   geoTiff={geoTiffURL}
                   center={center}
                   featureType="LineString" component={MapFormField} />


            <Button variant='contained' color='primary' type="submit">Submit</Button>
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