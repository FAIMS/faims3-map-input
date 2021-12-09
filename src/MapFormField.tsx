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
import Feature from 'ol/Feature'
import './MapFormField.css'
import MapWrapper from './MapWrapper'
import Button from '@material-ui/core/Button'
import { FieldProps } from 'formik'

import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins

interface MapFieldProps extends FieldProps {
  label?: string
  featureType: 'Point' | 'Polygon' | 'LineString'
  geoTiff?: string
  projection?: string
  center?: Array<number>
  zoom?: number
}

function MapFormField({ field, form, ...props }: MapFieldProps) {
  const [showMap, setShowMap] = useState(false)
  const [drawnFeatures, setDrawnFeatures] = useState<Array<Feature<any>>>([])


  // default props.center if not defined
  if (!props.center) {
    props.center = [0, 0]
  }
  const [center, setCenter] = useState(props.center)

  if (!props.zoom) {
    props.zoom = 14
  }

  if (!props.label) {
    props.label = `Get ${props.featureType}`
  }

  const mapCallback = (theFeatures: any) => {
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
          geoTiff={props.geoTiff}
          projection={props.projection}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Button
          variant='contained'
          className='map-button'
          onClick={() => setShowMap(true)}
        >
          {props.label}
        </Button>
      </div>
    )
  }
}

export { MapFormField }
