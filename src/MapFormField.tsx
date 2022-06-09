/*
 * Copyright 2021 Macquarie University
 *
 * Licensed under the Apache License Version 2.0 (the, "License");
 * you may not use, this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND either express or implied.
 * See, the License, for the specific language governing permissions and
 * limitations under the License.
 *
 * Filename: MapFormField.tsx
 * Description:
 *   Implement MapFormField for entry of data via maps in FAIMS
 */

import React, { useState } from 'react'
import './MapFormField.css'
import MapWrapper from './MapWrapper'
import Button from '@mui/material/Button'

import { Geolocation } from '@capacitor/geolocation'
import type { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'

import { FieldProps } from 'formik'
export interface MapFieldProps extends FieldProps {
  featureType: 'Point' | 'Polygon' | 'LineString'
  center?: Array<number>
  zoom?: number
  label?: string
  FormLabelProps?: any
}

export function MapFormField({
  field,
  form,
  ...props
}: MapFieldProps): JSX.Element {
  const [showMap, setShowMap] = useState(false)

  // get previous form state if available
  let initialFeatures = {}
  if (form.values[field.name]) {
    initialFeatures = form.values[field.name]
  }

  const [drawnFeatures, setDrawnFeatures] =
    useState<GeoJSONFeatureCollection>(initialFeatures)

  // default props.center if not defined
  if (!props.center) {
    props.center = [0, 0]
  }
  const [center, setCenter] = useState(props.center)

  if (!props.zoom) {
    props.zoom = 14
  }

  // default to point if not specified
  if (!props.featureType) {
    props.featureType = 'Point'
  }



  const mapCallback = (theFeatures: GeoJSONFeatureCollection) => {
    setDrawnFeatures(theFeatures)
    setShowMap(false)

    form.setFieldValue(field.name, theFeatures)
  }

  // get the current GPS location if we're about to show the map and
  // we have a default location
  if (showMap) {
    if (center[0] === 0 && center[1] === 0) {
      Geolocation.getCurrentPosition().then((result) => {
        setCenter([result.coords.longitude, result.coords.latitude])
      })
    }
  }

  let valueText = ''
  if (drawnFeatures.features) {
    const geom = drawnFeatures.features[0].geometry
    switch (geom.type) {
      case 'Point':
        valueText =
          'Point: ' +
          geom.coordinates[0].toFixed(2).toString() +
          ', ' +
          geom.coordinates[1].toFixed(2).toString()
        break
      case 'Polygon':
        valueText = 'Polygon: ' + (geom.coordinates[0].length - 1) + ' points'
        break
      case 'LineString':
        valueText = 'Line String: ' + geom.coordinates.length + ' points'
        break
    }
  }

  // only show the map if we have a center
  if (showMap && center[0] !== 0 && center[1] !== 0) {
    //window.scrollTo(0, 0)
    return (
      <div>
        <MapWrapper
          featureType={props.featureType}
          features={drawnFeatures}
          zoom={props.zoom}
          center={center}
          callbackFn={mapCallback}
        />
      </div>
    )
  } else {
    console.log('Map button props', props)
    return (
      <div>
        <Button
          variant='contained'
          className='map-button'
          onClick={() => setShowMap(true)}
        >
          {props.label ? props.label : 'Get ' + props.featureType + ' from Map'}
        </Button>
        <div>{valueText}</div>
      </div>
    )
  }
}

//
