import { Box, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUploader from '../../../common/FileUploader/FileUploader'
import CustomInput from '../../../components/CustomInput/CustomInput'
import CustomText from '../../../components/CustomText/Customtext'
import { ASSETS } from '../../../constants/Constants'
import {
  fetchUserSubDetails,
  submitUserSubDetails,
} from '../../../store/Form/0/actions'
import {
  addErrorMsg,
  getUserDetail,
  mandatoryField,
  uploadViewer,
} from '../../../utils/Utils'
import religionData from '../StaticData/religion.json'
import Validation from '../Validation.json'

const styles = {
  profilePhoto: {
    width: '120px',
    height: '140px',
  },
}

const useStyles = makeStyles(styles)

function UserSubDetails(props, ref) {
  let dispatch = useDispatch()
  const userSubDetails = useSelector(
    (state) => state.userSubDetails.userSubDetails
  )
  const classes = useStyles()
  const [fields, setFields] = useState({
    admissionYear: getUserDetail('admissionYear'),
    nameTitle: '',
    name: getUserDetail('fullname'),
    religion: '',
    caste: '',
    parentMobile: '',
    aadharNo: '',
    email: '',
    mediumOfInstitution: '',
    passportPhoto: '',
    wrn: '',
    wrnFile: '',
    
  })

  let {
    admissionYear,
    nameTitle,
    name,
    religion,
    caste,
    parentMobile,
    aadharNo,
    email,
    mediumOfInstitution,
    passportPhoto,
    wrn,
    wrnFile,
    
  } = fields

  useEffect(() => {
    if (!userSubDetails) {
      dispatch(fetchUserSubDetails())
    } else {
      setFields({ ...fields, ...userSubDetails })
    }
  }, [userSubDetails])

  const handleChangeFields = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    })
  }

  const handleUpload = (file, index, name) => {
    setFields({
      ...fields,
      [name]: file,
    })
  }

  const handleSubmit = () => {
    if (wrn && (admissionYear !== '1' || wrnFile)) {
      if (!nameTitle) {
        addErrorMsg('Please select name title')
      } else if (!religion) {
        addErrorMsg('Please select religion')
      } else if (!caste) {
        addErrorMsg('Please select caste')
      } else if (!parentMobile) {
        addErrorMsg('Please enter parent mobile')
      } else if (!aadharNo) {
        addErrorMsg('Please enter aadhar no.')
      } else if (!email) {
        addErrorMsg('Please enter email')
      } else if (!mediumOfInstitution) {
        addErrorMsg('Please enter medium of institution')
      } else if (!passportPhoto) {
        addErrorMsg('Please upload passport photo')
      } else {
        dispatch(submitUserSubDetails(fields, () => props.moveToNextStep()))
      }
    } else {
      addErrorMsg('Enter University No. and Upload its Document !')
    }
  }

  useImperativeHandle(ref, () => ({
    handleSubmitUserSubDetails() {
      handleSubmit()
    },
  }))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          User-Sub Details
        </CustomText>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container alignItems="center">
          <Grid item md={3} xs={5}>
            <img
              className={classes.profilePhoto}
              src={
                passportPhoto === '' || passportPhoto === null
                  ? 'user.png'
                  : typeof passportPhoto === 'object'
                  ? URL.createObjectURL(passportPhoto)
                  : ASSETS.url + passportPhoto
              }
            />
          </Grid>
          <Grid item md={9} xs={7}>
            <FileUploader
              buttonLabel="Upload Photo"
              accept="image/jpg,image/jpeg,image/png"
              maxSize={5}
              handleChange={handleUpload}
              id="profile"
              name="passportPhoto"
            />
            <Box paddingTop="10px">
              <Typography variant="caption">
                Upload Passport size photo with white background.
              </Typography>
              <br />
              <Typography variant="caption">
                <b>Note:-</b> Allowed JPG, JPEG or PNG image only. Max size of
                2MB.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            {!admissionYear || admissionYear === '1' ? (
              <Typography>
                Enter (WRN Number) university web registration no and upload
                certification (in PDF or Image)
                <br />
                (*Mandatory to upload)
              </Typography>
            ) : (
              <Typography>(*University Exam Roll No.)</Typography>
            )}
            <CustomInput
              isMandatory={true}
              minLength={Validation['wrn']['minLength']}
              maxLength={Validation['wrn']['maxLength']}
              labelText={mandatoryField(
                !admissionYear || admissionYear === '1'
                  ? 'Web Registration No.'
                  : 'Roll No.'
              )}
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                name: 'wrn',
                value: wrn,
                helperText:
                  !admissionYear || admissionYear === '1'
                    ? 'For Ex: WRN23*********'
                    : '',
              }}
              handleChange={handleChangeFields}
            />
            
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <div className="alignCenter">
              {admissionYear === '1' && (
                <FileUploader
                  buttonLabel="Upload Form"
                  accept="image/jpg,image/jpeg,image/png,application/pdf"
                  maxSize={5}
                  handleChange={handleUpload}
                  id="uploadForm"
                  name="wrnFile"
                />
              )}
            </div>
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            {wrnFile !== '' && wrnFile !== null ? uploadViewer(wrnFile) : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={1} xs={4}>
        <TextField
          fullWidth
          select
          label={mandatoryField('Title')}
          value={nameTitle}
          onClick={handleChangeFields}
          variant="standard"
          name="nameTitle"
        >
          <MenuItem value="Mr.">Mr.</MenuItem>
          <MenuItem value="Ms.">Ms.</MenuItem>
        </TextField>
      </Grid>
      <Grid item md={11} xs={8}>
        <CustomInput
          labelText="Name"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'name',
            value: name,
            disabled: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          label={mandatoryField('Religion')}
          value={religion}
          onClick={handleChangeFields}
          size="small"
          variant="outlined"
          name="religion"
        >
          {religionData.map((item, key) => (
            <MenuItem key={key} value={item.religionId}>
              {item.religion}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label={mandatoryField('Caste')}
          value={caste}
          onChange={handleChangeFields}
          variant="outlined"
          name="caste"
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['parentMobile']['minLength']}
          maxLength={Validation['parentMobile']['maxLength']}
          labelText={mandatoryField('Mobile No. of Parent')}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'parentMobile',
            type: 'number',
            value: parentMobile,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['aadharNo']['minLength']}
          maxLength={Validation['aadharNo']['maxLength']}
          labelText={mandatoryField('Aadhar No.')}
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'aadharNo',
            type: 'number',
            value: aadharNo,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomInput
          isMandatory={true}
          minLength={Validation['email']['minLength']}
          maxLength={Validation['email']['maxLength']}
          labelText="Email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            name: 'email',
            value: email,
          }}
          handleChange={handleChangeFields}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          fullWidth
          variant="outlined"
          name="mediumOfInstitution"
          label={mandatoryField('Medium of Teaching')}
          value={mediumOfInstitution}
          onChange={handleChangeFields}
          size="small"
        >
          <MenuItem value="Hindi">Hindi</MenuItem>
          <MenuItem value="English">English</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  )
}
export default forwardRef(UserSubDetails)
