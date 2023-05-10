import { Grid, makeStyles, Typography } from '@material-ui/core'
import config from 'myconfig'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch, useSelector } from 'react-redux'
import FileUploader from '../../../common/FileUploader/FileUploader'
import CustomText from '../../../components/CustomText/Customtext'
import { ASSETS } from '../../../constants/Constants'
import {
  fetchDeclarationDetails,
  saveDeclarationDetails,
  submitDeclarationDetails,
} from '../../../store/Form/5/actions'
import { addErrorMsg, getUserDetail, uploadViewer } from '../../../utils/Utils'

const styles = {
  photo: {
    width: '50px',
    height: '50px',
  },
}

const useStyles = makeStyles(styles)

function Declaration(props, ref) {
  let dispatch = useDispatch()
  const declaration = useSelector((state) => state.declaration.declaration)
  const classes = useStyles()
  const [fields, setFields] = useState({
    categoryFile: '',
    subCategoryFile: '',
    signatureFile: '',
    token: '',
  })

  let { categoryFile, subCategoryFile, signatureFile, token } = fields

  useEffect(() => {
    if (!declaration) {
      dispatch(fetchDeclarationDetails())
    } else {
      setFields({ ...fields, ...declaration })
    }
  }, [declaration])

  const handleUpload = (file, index, name) => {
    setFields({
      ...fields,
      [name]: file,
    })
  }

  const handleReCaptcha = (token) => {
    setFields({ ...fields, token })
  }

  const handleSubmit = (tryToSubmit) => {
    let vald = 0
    if (getUserDetail('category') !== '1General') {
      if (!categoryFile) {
        addErrorMsg('Please Upload Category Certificate')
        vald++
      }
    }
    if (getUserDetail('subCategory') !== 'none') {
      if (!subCategoryFile) {
        addErrorMsg('Please Upload Sub-Category Certificate')
        vald++
      }
    }
    if (!signatureFile) {
      addErrorMsg('Please Upload Signature')
      vald++
    }
    if (vald === 0) {
      if (token && token !== '') {
        if (tryToSubmit) {
          // Last Date of Form Submission check (Constraint) needs to be added here....
          // Basically a contraint that check admission of this course are still
          // OPENED or CLOSED.
          dispatch(submitDeclarationDetails(fields))
        } else {
          dispatch(saveDeclarationDetails(fields))
        }
      } else {
        addErrorMsg("Please verify you're not a robot")
      }
    }
  }

  useImperativeHandle(ref, () => ({
    handleSaveDetails() {
      handleSubmit()
    },
    handleSubmitForm() {
      handleSubmit(1)
    },
  }))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          Declaration
        </CustomText>
      </Grid>
      {getUserDetail('category') !== '1General' && (
        <Grid item xs={12}>
          <div className="center">
            <FileUploader
              buttonLabel="Upload Category Certificate"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              maxSize={5}
              handleChange={handleUpload}
              id="categoryFile"
              name="categoryFile"
            />
            {categoryFile && uploadViewer(categoryFile)}
          </div>
        </Grid>
      )}
      {getUserDetail('subCategory') !== 'none' && (
        <Grid item xs={12}>
          <div className="center">
            <FileUploader
              buttonLabel="Upload Sub-Category Certificate"
              accept="image/jpg,image/jpeg,image/png,application/pdf"
              maxSize={5}
              handleChange={handleUpload}
              id="subCategoryFile"
              name="subCategoryFile"
            />
            {subCategoryFile && uploadViewer(subCategoryFile)}
          </div>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="body1">
          I solemnly declare that the above mentioned information is correct and
          I fulfill the eligibility condition for the course. Further, if
          admitted, I promise to abide by the rules and norms of discipline of
          the institute.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">APPLICANT SIGNATURE</Typography>
        <div className="alignCenter">
          <FileUploader
            buttonLabel="Upload"
            accept="image/jpg,image/jpeg,image/png"
            maxSize={5}
            handleChange={handleUpload}
            id="signature"
            name="signatureFile"
          />
          &nbsp;&nbsp;
          {signatureFile !== '' && signatureFile !== null ? (
            <img
              className={classes.photo}
              src={
                typeof signatureFile === 'object'
                  ? URL.createObjectURL(signatureFile)
                  : ASSETS.url + signatureFile
              }
            />
          ) : null}
        </div>
      </Grid>
      <Grid container item xs={12} justifyContent="center">
        <ReCAPTCHA
          sitekey={config.CAPTCHA}
          onChange={(token) => handleReCaptcha(token)}
          onExpired={() => handleReCaptcha('')}
        />
      </Grid>
    </Grid>
  )
}
export default forwardRef(Declaration)
