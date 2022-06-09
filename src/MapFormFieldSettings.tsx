// should really be imported from the main project
interface ProjectUIModel {
  _id?: string // optional as we may want to include the raw json in places
  _rev?: string // optional as we may want to include the raw json in places
  fields: { [key: string]: any }
  views: {
    [key: string]: {
      label?: string
      fields: string[]
      uidesign?: string
      next_label?: string
    }
  }
  viewsets: {
    [type: string]: {
      label?: string
      views: string[]
      submit_label?: string
    }
  }
  visible_types: string[]
}

export const MapFieldUISpec = {
  'component-namespace': 'mapping-plugin', // this says what web component to use to render/acquire value from
  'component-name': 'MapFormField',
  'type-returned': 'faims-core::JSON', // matches a type in the Project Model
  'component-parameters': {
    name: 'radio-group-field',
    id: 'radio-group-field',
    variant: 'outlined',
    required: false,
    featureType: 'Point',
    zoom: 12,
    label: '',
    FormLabelProps: {
      children: ''
    }
  },
  validationSchema: [['yup.string']],
  initialValue: '1'
}

export const MapFieldUISetting = (defaultSetting: ProjectUIModel) => {
  console.log('In MapField Settings')

  const newuiSetting = Object.assign({}, defaultSetting)

  newuiSetting['fields']['featureType'] = {
    'component-namespace': 'faims-custom', // this says what web component to use to render/acquire value from
    'component-name': 'Select',
    'type-returned': 'faims-core::String', // matches a type in the Project Model
    'component-parameters': {
      fullWidth: true,
      helperText: '',
      variant: 'outlined',
      required: true,
      select: true,
      InputProps: {},
      SelectProps: {},
      ElementProps: {
        options: [
          {
            value: 'Point',
            label: 'Point'
          },
          {
            value: 'Polygon',
            label: 'Polygon'
          },
          {
            value: 'LineString',
            label: 'LineString'
          }
        ]
      },
      InputLabelProps: {
        label: 'Select Feature Type'
      }
    },
    validationSchema: [['yup.string']],
    initialValue: 'Point'
  }

  newuiSetting['fields']['zoom'] = {
    'component-namespace': 'formik-material-ui', // this says what web component to use to render/acquire value from
    'component-name': 'TextField',
    'type-returned': 'faims-core::Integer', // matches a type in the Project Model
    'component-parameters': {
      fullWidth: true,
      helperText: 'Zoom Level',
      required: false,
      InputProps: {
        type: 'number' // must be a valid html type
      },
      SelectProps: {},
      FormHelperTextProps: {}
    },
    validationSchema: [['yup.string']],
    initialValue: 12
  }

  newuiSetting['views']['FormParamater']['fields'] = [
    'label',
    'featureType',
    'zoom'
  ]

  newuiSetting['viewsets'] = {
    settings: {
      views: ['FormParamater'],
      label: 'settings'
    }
  }
  console.log('NEW SETTINGS', newuiSetting)
  return newuiSetting
}
