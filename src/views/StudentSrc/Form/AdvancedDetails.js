import { Grid, MenuItem, TextField } from '@material-ui/core'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomInput from '../../../components/CustomInput/CustomInput'
import {
  fetchAdvancedDetails,
  submitAdvancedDetails,
} from '../../../store/Form/1/actions'
import { addErrorMsg, mandatoryField } from '../../../utils/Utils'
import Validation from '../Validation.json'
import citiesData from '../../StudentSrc/StaticData/cities.json'
import statesData from '../../StudentSrc/StaticData/states.json'
import RegularButton from '../../../components/CustomButtons/Button'
import CustomText from '../../../components/CustomText/Customtext'

function AdvancedDetails(props, ref) {
  let dispatch = useDispatch()
  const advancedDetails = useSelector(
    (state) => state.advancedDetails.advancedDetails
  )
  const [fields, setFields] = useState({
    motherName: '',
    parentsOccupation: '',
    guardianName: '',
    relationOfApplicant: '',
    houseNo: '',
    street: '',
    pincode: '',
    postOffice: '',
    state: '',
    city: '',
    cHouseNo: '',
    cStreet: '',
    cPincode: '',
    cCity: '',
    cState: '',
    cPostOffice: '',
  })

  let {
    motherName,
    parentsOccupation,
    guardianName,
    relationOfApplicant,
    houseNo,
    street,
    pincode,
    postOffice,
    state,
    city,
    cHouseNo,
    cStreet,
    cPincode,
    cCity,
    cState,
    cPostOffice,
  } = fields

  useEffect(() => {
    if (!advancedDetails) {
      dispatch(fetchAdvancedDetails())
    } else {
      setFields({ ...fields, ...advancedDetails })
    }
  }, [advancedDetails])

  const handleChangeFields = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    })
  }

  const handleFillCorrespondenceAddress = () => {
    setFields({
      ...fields,
      cHouseNo: houseNo,
      cStreet: street,
      cPincode: pincode,
      cPostOffice: postOffice,
      cState: state,
      cCity: city,
    })
  }

  const handleSubmit = () => {
    if (
      motherName &&
      parentsOccupation &&
      guardianName &&
      relationOfApplicant &&
      houseNo &&
      street &&
      pincode &&
      postOffice &&
      state &&
      city &&
      cHouseNo &&
      cStreet &&
      cPincode &&
      cPostOffice &&
      cState &&
      cCity
    ) {
      dispatch(submitAdvancedDetails(fields, () => props.moveToNextStep()))
    } else {
      addErrorMsg('Fields cannot be empty !')
    }
  }

  useImperativeHandle(ref, () => ({
    handleSubmitAdvancedDetails() {
      handleSubmit()
    },
  }))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          Parent Details
        </CustomText>
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['motherName']['minLength']}
          maxLength={Validation['motherName']['maxLength']}
          labelText={mandatoryField("Mother's Name")}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'motherName',
            value: motherName,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['parentsOccupation']['minLength']}
          maxLength={Validation['parentsOccupation']['maxLength']}
          labelText={mandatoryField("Parent's Occupation")}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'parentsOccupation',
            value: parentsOccupation,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['guardianName']['minLength']}
          maxLength={Validation['guardianName']['maxLength']}
          labelText={mandatoryField('Guardian Name')}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'guardianName',
            value: guardianName,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['relationOfApplicant']['minLength']}
          maxLength={Validation['relationOfApplicant']['maxLength']}
          labelText={mandatoryField('Relation with Student')}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'relationOfApplicant',
            value: relationOfApplicant,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          Permanent Address
        </CustomText>
      </Grid>
      <Grid item md={6} xs={12}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['houseNo']['minLength']}
          maxLength={Validation['houseNo']['maxLength']}
          labelText={mandatoryField('House/Flat No.')}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'houseNo',
            value: houseNo,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['street']['minLength']}
          maxLength={Validation['street']['maxLength']}
          labelText={mandatoryField('Colony/Street/Mohalla/Village')}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'street',
            value: street,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['pincode']['minLength']}
          maxLength={Validation['pincode']['maxLength']}
          labelText={'Pincode'}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'pincode',
            type: 'number',
            value: pincode,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['postOffice']['minLength']}
          maxLength={Validation['postOffice']['maxLength']}
          labelText={'Post Office'}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'postOffice',
            value: postOffice,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          variant="outlined"
          label={mandatoryField('Select State')}
          name="state"
          value={state}
          onChange={handleChangeFields}
        >
          {statesData.map((item, key) => (
            <MenuItem key={key} value={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          label={mandatoryField('Select City')}
          variant="outlined"
          name="city"
          value={city}
          onChange={handleChangeFields}
        >
          {citiesData.map(
            (item, key) =>
              state === item.state && (
                <MenuItem key={key} value={item.id}>
                  {item.name}
                </MenuItem>
              )
          )}
        </TextField>
      </Grid>
      <Grid item xs={12} className="headBg">
        <Grid container alignItems="center">
          <Grid item sm={6} xs={12}>
            <CustomText white upperCase>
              Correspondence Details
            </CustomText>
          </Grid>
          <Grid container item sm={6} xs={12} justifyContent="flex-end">
            <RegularButton
              round
              color="primary"
              size="sm"
              onClick={handleFillCorrespondenceAddress}
            >
              Same as Permanent Address ?
            </RegularButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['houseNo']['minLength']}
          maxLength={Validation['houseNo']['maxLength']}
          labelText="House/Flat No."
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'cHouseNo',
            value: cHouseNo,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['street']['minLength']}
          maxLength={Validation['street']['maxLength']}
          labelText="Colony/Street/Mohalla/Village"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'cStreet',
            value: cStreet,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['pincode']['minLength']}
          maxLength={Validation['pincode']['maxLength']}
          labelText="Pincode"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'cPincode',
            value: cPincode,
            type: 'number',
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['postOffice']['minLength']}
          maxLength={Validation['postOffice']['maxLength']}
          labelText="Post Office"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'cPostOffice',
            value: cPostOffice,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          variant="outlined"
          label="Select State"
          name="cState"
          value={cState}
          onChange={handleChangeFields}
        >
          {statesData.map((item, key) => (
            <MenuItem key={key} value={item.code}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          select
          fullWidth
          label="Select City"
          variant="outlined"
          name="cCity"
          value={cCity}
          onChange={handleChangeFields}
        >
          {citiesData.map(
            (item, key) =>
              cState === item.state && (
                <MenuItem key={key} value={item.id}>
                  {item.name}
                </MenuItem>
              )
          )}
        </TextField>
      </Grid>
    </Grid>
  )
}
export default forwardRef(AdvancedDetails)
