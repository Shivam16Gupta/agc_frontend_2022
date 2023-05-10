import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core'
import classNames from 'classnames'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUploader from '../../../common/FileUploader/FileUploader'
import CustomText from '../../../components/CustomText/Customtext'
import {
  fetchMeritDetails,
  submitMeritDetails,
} from '../../../store/Form/4/actions'
import {
  addErrorMsg,
  convertedMajorSubjects,
  getCourseType,
  getUserDetail,
  uploadViewer,
} from '../../../utils/Utils'
import meritCalculateData from '../StaticData/meritCalculate.json'

const styles = {
  unCheckIcon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        'url("https://admission.agracollegeagra.org.in/checkbox.png")',
      content: '""',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '97%',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
}

const useStyles = makeStyles(styles)

function MeritDetails(props, ref) {
  let dispatch = useDispatch()
  const meritDetails = useSelector((state) => state.meritDetails.meritDetails)
  const academicFacultyDetails = useSelector(
    (state) => state.academicFacultyDetails.academicFacultyDetails
  )
  const classes = useStyles()
  const [fields, setFields] = useState({
    course: getUserDetail('course'),
    admissionYear: getUserDetail('admissionYear'),
    courseType: getCourseType(getUserDetail('course')),
    majorSubjects: academicFacultyDetails.majorSubjects,
    nationalCompetition: '',
    nationalCertificate: '',
    nationalSevaScheme: false,
    nssDocument: '',
    other: '',
    otherCertificate: '',
    otherCompetition: '',
    otherRoverRanger: false,
    roverRanger: '',
    ncc: '',
    nccCertificate: '',
    totalMerit: meritCalculateData,
    totalMeritCount: '',
    freedomFighter: false,
    rrDocument: '',
    bcom: false,
    uploadExtraMark: null,
  })

  let {
    course,
    admissionYear,
    courseType,
    majorSubjects,
    nationalCompetition,
    nationalCertificate,
    nationalSevaScheme,
    nssDocument,
    other,
    otherCertificate,
    otherCompetition,
    otherRoverRanger,
    roverRanger,
    ncc,
    nccCertificate,
    totalMerit,
    totalMeritCount,
    freedomFighter,
    rrDocument,
    bcom,
    uploadExtraMark,
  } = fields

  useEffect(() => {
    if (!meritDetails) {
      dispatch(fetchMeritDetails())
    } else {
      setFields({ ...fields, ...meritDetails })
    }
  }, [meritDetails, academicFacultyDetails])

  const handleUpload = (file, index, name) => {
    setFields({
      ...fields,
      [name]: file,
    })
  }

  const handleCalculateMerit = (event) => {
    const name = event.target.name
    const value = event.target.value
    let total = 0
    totalMerit[name] = parseInt(value.split(',')[1])
    total = Object.values(totalMerit).reduce(
      (currentVal, nextVal) => currentVal + nextVal
    )
    if (name === 'other' && value === 'none,0') {
      setFields({
        ...fields,
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
        uploadExtraMark: null,
      })
    } else if (name === 'ncc' && value === 'none,0') {
      setFields({
        ...fields,
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
        nccCertificate: null,
      })
    } else if (name === 'nationalCompetition' && value === 'none,0') {
      setFields({
        ...fields,
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
        nationalCertificate: null,
      })
    } else {
      setFields({
        ...fields,
        totalMerit,
        totalMeritCount: total <= 17 ? total : 17,
        [name]: value,
      })
    }
  }

  const handleCalculateMeritCheck = (event) => {
    const name = event.target.name
    const checked = event.target.checked
    if (!checked) {
      totalMerit[name] = 0
    } else {
      totalMerit[name] = parseInt(event.target.value)
    }
    let total = 0
    total = Object.values(totalMerit).reduce(
      (currentVal, nextVal) => currentVal + nextVal
    )
    if (name === 'otherRoverRanger') {
      if (totalMerit.roverRanger !== 0) {
        total = total - totalMerit.roverRanger
        totalMerit.roverRanger = 0
      }
      setFields({
        ...fields,
        roverRanger: '',
        [name]: checked,
        totalMerit,
        totalMeritCount: total > 17 ? 17 : total,
      })
    } else if (name === 'nationalSevaScheme' && !checked) {
      setFields({
        ...fields,
        nssDocument: null,
        [name]: checked,
        totalMerit,
        totalMeritCount: total > 17 ? 17 : total,
      })
    } else {
      setFields({
        ...fields,
        totalMeritCount: total > 17 ? 17 : total,
        [name]: checked,
        totalMerit,
      })
    }
  }

  const handleSubmit = () => {
    let naCCount = 0,
      nccCount = 0,
      nSSCount = 0,
      otherCount = 0,
      otherCertCount = 0,
      rangeRoverCount = 0,
      validation = 0
    if (
      (courseType == 'UG' && admissionYear == '1') ||
      ((courseType == 'LAW' || courseType == 'LLB') &&
        admissionYear == '1' &&
        majorSubjects.length >= 1 &&
        majorSubjects[0].id == 'BALLB')
    ) {
      validation = 1
      if (
        (!nationalCompetition || nationalCompetition == 'none,0') &&
        !nationalCertificate
      ) {
        naCCount = 1
      } else if (nationalCompetition !== 'none,0' && nationalCertificate) {
        naCCount = 1
      } else {
        addErrorMsg(
          'Upload "Participation in Zone / National Competition" Certificate'
        )
        return
      }

      if ((!ncc || ncc == 'none,0') && !nccCertificate) {
        nccCount = 1
      } else if (ncc !== 'none,0' && nccCertificate) {
        nccCount = 1
      } else {
        addErrorMsg('Upload "NCC/Cadet" Certificate')
        return
      }

      if (!nationalSevaScheme) {
        nSSCount = 1
      } else if (nationalSevaScheme && nssDocument) {
        nSSCount = 1
      } else {
        addErrorMsg('Upload "NSS" Document')
        return
      }

      if ((!other || other == 'none,0') && !uploadExtraMark) {
        otherCount = 1
      } else if (other !== 'none,0' && uploadExtraMark) {
        otherCount = 1
      } else {
        addErrorMsg('Upload "Other Details / Extra Marks" Certificate')
        return
      }

      if (naCCount == 1 && nccCount == 1 && nSSCount == 1 && otherCount == 1) {
        dispatch(submitMeritDetails(fields, () => props.moveToNextStep()))
      }
    } else if (
      (courseType == 'PG' && admissionYear == '1') ||
      ((courseType == 'LAW' || courseType == 'LLB') && admissionYear == '1')
    ) {
      validation = 1
      if (
        (!nationalCompetition || nationalCompetition == 'none,0') &&
        !nationalCertificate
      ) {
        naCCount = 1
      } else if (nationalCompetition !== 'none,0' && nationalCertificate) {
        naCCount = 1
      } else {
        addErrorMsg(
          'Upload "Participation in Zone / National Competition" Certificate'
        )
        return
      }

      if (
        (!otherCompetition || otherCompetition == 'none,0') &&
        !otherCertificate
      ) {
        otherCertCount = 1
      } else if (otherCompetition !== 'none,0' && otherCertificate) {
        otherCertCount = 1
      } else {
        addErrorMsg(
          'Upload "Participation in Zone / National Competition" from Other University'
        )
        return
      }

      if ((!roverRanger || roverRanger == 'none,0') && !rrDocument) {
        rangeRoverCount = 1
      } else if (roverRanger !== 'none,0' && rrDocument) {
        rangeRoverCount = 1
      } else if (otherRoverRanger) {
        rangeRoverCount = 1
      } else {
        addErrorMsg('Please upload certificate or checkbox for range rover')
        return
      }

      if ((!ncc || ncc == 'none,0') && !nccCertificate) {
        nccCount = 1
      } else if (ncc !== 'none,0' && nccCertificate) {
        nccCount = 1
      } else {
        addErrorMsg('Upload "NCC/Cadet" Certificate')
        return
      }

      if (!nationalSevaScheme) {
        nSSCount = 1
      } else if (nationalSevaScheme && nssDocument) {
        nSSCount = 1
      } else {
        addErrorMsg('Upload "NSS" Document')
        return
      }

      if ((!other || other == 'none,0') && !uploadExtraMark) {
        otherCount = 1
      } else if (other !== 'none,0' && uploadExtraMark) {
        otherCount = 1
      } else {
        addErrorMsg('Upload "Other Details / Extra Marks" Certificate')
        return
      }
      if (
        naCCount == 1 &&
        otherCertCount == 1 &&
        rangeRoverCount == 1 &&
        naCCount == 1 &&
        nccCount == 1 &&
        nSSCount == 1 &&
        otherCount == 1
      ) {
        dispatch(submitMeritDetails(fields, () => props.moveToNextStep()))
      }
    } else {
      props.moveToNextStep()
    }
  }

  useImperativeHandle(ref, () => ({
    handleSubmitMeritDetails() {
      handleSubmit()
    },
  }))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          Other / Merit Details <b>(For More Details Read the Prospectus)</b>
        </CustomText>
      </Grid>
      {admissionYear === '1' &&
      majorSubjects.length > 0 &&
      (courseType === 'UG' ||
        courseType === 'PG' ||
        courseType === 'LAW' ||
        courseType === 'LLB') ? (
        <Grid item xs={12}>
          {courseType === 'PG' ||
          convertedMajorSubjects(majorSubjects).includes('LLM') ||
          convertedMajorSubjects(majorSubjects).includes('LLB') ? (
            <Typography>
              विश्वविद्यालय की टीम के सदस्य के रुप में अन्तर्विश्वविद्यालय
              प्रतियोगिता में भाग लेने के लिए
            </Typography>
          ) : (
            <Typography>
              उत्तर क्षेत्रीय स्तर की टीम सदस्य के रुप में राज्यस्तरीय राष्ट्रीय
              प्रतियोगिता में भाग लेने के लिए
            </Typography>
          )}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                variant="outlined"
                name="nationalCompetition"
                label="Participation in Zone / National Competition"
                value={nationalCompetition}
                onChange={handleCalculateMerit}
              >
                <MenuItem value="none,0">None</MenuItem>
                <MenuItem value="Ist,5">Ist</MenuItem>
                <MenuItem value="IInd,4">IInd</MenuItem>
                <MenuItem value="IIIrd,3">IIIrd</MenuItem>
                <MenuItem value="Participant,2">Participant</MenuItem>
              </TextField>
            </Grid>
            {nationalCompetition && nationalCompetition !== 'none,0' && (
              <Grid item xs={6}>
                <FileUploader
                  buttonLabel="Upload Document"
                  accept="image/jpg,image/jpeg,image/png,application/pdf"
                  maxSize={5}
                  handleChange={handleUpload}
                  id={'nationalCompetition'}
                  name="nationalCertificate"
                />
              </Grid>
            )}
            {nationalCertificate && (
              <Grid item xs={6}>
                {uploadViewer(nationalCertificate)}
              </Grid>
            )}
            {courseType === 'PG' ||
            convertedMajorSubjects(majorSubjects).includes('LLM') ||
            convertedMajorSubjects(majorSubjects).includes('LLB') ? (
              <Grid item xs={12}>
                <Typography>
                  विश्वविद्यालय की टीम के सदस्य के रुप में राष्ट्रीय प्रतियोगिता
                  में भाग लेने
                </Typography>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  name="otherCompetition"
                  label="Participation in Zone / National Competition from Other University"
                  value={otherCompetition}
                  onChange={handleCalculateMerit}
                >
                  <MenuItem value="none,0">None</MenuItem>
                  <MenuItem value="Ist,8">Ist</MenuItem>
                  <MenuItem value="IInd,7">IInd</MenuItem>
                  <MenuItem value="IIIrd,6">IIIrd</MenuItem>
                  <MenuItem value="participant,3">Participant</MenuItem>
                </TextField>
              </Grid>
            ) : null}
            {otherCompetition &&
              otherCompetition !== '' &&
              otherCompetition !== 'none,0' && (
                <Grid item xs={6}>
                  <FileUploader
                    buttonLabel="Upload Document"
                    accept="image/jpg,image/jpeg,image/png,application/pdf"
                    maxSize={5}
                    handleChange={handleUpload}
                    id={'otherCompetition'}
                    name="otherCertificate"
                  />
                </Grid>
              )}
            {otherCertificate && (
              <Grid item xs={6}>
                {uploadViewer(otherCertificate)}
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                variant="outlined"
                name="ncc"
                label="NCC/Cadet"
                value={ncc}
                onChange={handleCalculateMerit}
              >
                <MenuItem value="none,0">None</MenuItem>
                <MenuItem value="NCC(B)/G-1,8">NCC(C)/G-2</MenuItem>
                <MenuItem value="NCC(B)/G-1,6">NCC(B)/G-1</MenuItem>
                <MenuItem value="NCC Worked(240 Hours) and Participated in 2 Camps but did not passed any exam,3">
                  NCC Worked(240 Hours) and Participated in 2 Camps but did not
                  passed any exam
                </MenuItem>
              </TextField>
            </Grid>
            {ncc && ncc !== 'none,0' && (
              <Grid item xs={6}>
                <FileUploader
                  buttonLabel="Upload Document"
                  accept="image/jpg,image/jpeg,image/png,application/pdf"
                  maxSize={5}
                  handleChange={handleUpload}
                  id={'nccDoc'}
                  name="nccCertificate"
                />
              </Grid>
            )}
            {nccCertificate && (
              <Grid item xs={6}>
                {uploadViewer(nccCertificate)}
              </Grid>
            )}
            {courseType === 'UG' ||
            majorSubjects[0].subjectName === 'B.A. LLB' ? (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={
                        <span className={classNames(classes.checkedIcon)} />
                      }
                      icon={<span className={classes.unCheckIcon} />}
                      value="5"
                      checked={!freedomFighter ? false : true}
                      onChange={handleCalculateMeritCheck}
                      name="freedomFighter"
                      color="primary"
                    />
                  }
                  label="Freedom Fighter ?"
                />
              </Grid>
            ) : null}
            <Grid item md={4} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checkedIcon={
                      <span className={classNames(classes.checkedIcon)} />
                    }
                    icon={<span className={classes.unCheckIcon} />}
                    value="5"
                    checked={!nationalSevaScheme ? false : true}
                    onChange={handleCalculateMeritCheck}
                    name="nationalSevaScheme"
                    color="primary"
                  />
                }
                label="(NSS) National Service Scheme ?"
              />
            </Grid>
            <Grid item md={3} xs={6}>
              {nationalSevaScheme && (
                <FileUploader
                  buttonLabel="Upload Document"
                  accept="image/jpg,image/jpeg,image/png,application/pdf"
                  maxSize={5}
                  handleChange={handleUpload}
                  id={'nssDoc'}
                  name="nssDocument"
                />
              )}
            </Grid>
            <Grid item md={5} xs={6}>
              {nssDocument && uploadViewer(nssDocument)}
            </Grid>
            {(courseType === 'PG' ||
              convertedMajorSubjects(majorSubjects).includes('LLM') ||
              convertedMajorSubjects(majorSubjects).includes('LLB')) && (
              <Grid item md={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  disabled={otherRoverRanger}
                  variant="outlined"
                  name="roverRanger"
                  label="Team Members of Rover Rangers to Participate in Rally from University"
                  value={roverRanger}
                  onChange={handleCalculateMerit}
                >
                  <MenuItem value="none,0">None</MenuItem>
                  <MenuItem value="Ist,5">Ist</MenuItem>
                  <MenuItem value="IInd,4">IInd</MenuItem>
                  <MenuItem value="IIIrd,3">IIIrd</MenuItem>
                  <MenuItem value="Participant,2">Participant</MenuItem>
                </TextField>
              </Grid>
            )}
            {!otherRoverRanger && roverRanger && roverRanger !== 'none,0' && (
              <Grid item md={3} xs={6}>
                <FileUploader
                  buttonLabel="Upload Document"
                  accept="image/jpg,image/jpeg,image/png,application/pdf"
                  maxSize={5}
                  handleChange={handleUpload}
                  id={'roverRanger'}
                  name="rrDocument"
                />
              </Grid>
            )}
            <Grid item md={3} xs={6}>
              {rrDocument && !otherRoverRanger && uploadViewer(rrDocument)}
            </Grid>
            {courseType === 'PG' ||
            convertedMajorSubjects(majorSubjects).includes('LLM') ||
            convertedMajorSubjects(majorSubjects).includes('LLB') ? (
              <Grid container item xs={12} justifyContent="center">
                <Typography>OR</Typography>
              </Grid>
            ) : null}
            {courseType === 'PG' ||
            convertedMajorSubjects(majorSubjects).includes('LLM') ||
            convertedMajorSubjects(majorSubjects).includes('LLB') ? (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={
                        <span
                          className={classNames(
                            classes.icon,
                            classes.checkedIcon
                          )}
                        />
                      }
                      icon={<span className={classes.unCheckIcon} />}
                      value="3"
                      checked={!otherRoverRanger ? false : true}
                      onChange={handleCalculateMeritCheck}
                      name="otherRoverRanger"
                      color="primary"
                    />
                  }
                  label="Team Members of Rover Rangers to Participate in Rally from Other University"
                />
              </Grid>
            ) : null}
            {course === '8BCOM' ||
            convertedMajorSubjects(majorSubjects).includes('B.A. LLB') ? (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checkedIcon={
                        <span
                          className={classNames(
                            classes.icon,
                            classes.checkedIcon
                          )}
                        />
                      }
                      icon={<span className={classes.unCheckIcon} />}
                      value="5"
                      checked={!bcom ? false : true}
                      onChange={handleCalculateMeritCheck}
                      name="bcom"
                      color="primary"
                    />
                  }
                  label="Inter 10+2 with Commerce ?"
                />
              </Grid>
            ) : null}
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              variant="outlined"
              name="other"
              label="Other Details / Marks"
              value={other}
              onChange={handleCalculateMerit}
            >
              <MenuItem value="none,0">None</MenuItem>
              <MenuItem value="डॉ. भीमराव आंबेडकर विश्वविद्यालय और सम्बद्ध महाविद्यालयों में सेवारत एवं स्ववित पोषित संस्थान के विश्वविद्यालय द्वारा अनुमोदित अनु बन्धित प्रवक्ता तथा अवकाश प्राप्त केवल स्थायी अध्यापको एवं कर्मचारियों के पति/पत्नी/पुत्री तथा कृषि संकाय में स्थायी परियोजना के स्थायी परियोजनाओं के स्थायी कर्मचारियों के पति/पत्नी/पुत्री/पुत्र।,17">
                डॉ. भीमराव आंबेडकर विश्वविद्यालय और सम्बद्ध महाविद्यालयों में
                सेवारत एवं स्ववित पोषित संस्थान के विश्वविद्यालय द्वारा अनुमोदित
                अनु बन्धित प्रवक्ता तथा अवकाश प्राप्त <br /> केवल स्थायी
                अध्यापको एवं कर्मचारियों के पति/पत्नी/पुत्री तथा कृषि संकाय में
                स्थायी परियोजना के स्थायी परियोजनाओं के स्थायी कर्मचारियों के
                पति/पत्नी/पुत्री/पुत्र।
              </MenuItem>
              <MenuItem value="भारतीय सेना में सेवारत अथवा अवकाश प्राप्त अधिकारियों या अन्य रैंक के केवल पति/पत्नी/पुत्री/पुत्र (अविवाहित),10">
                भारतीय सेना में सेवारत अथवा अवकाश प्राप्त अधिकारियों या अन्य
                रैंक के केवल पति/पत्नी/पुत्री/पुत्र (अविवाहित)
              </MenuItem>
              <MenuItem value="भारतीय सेना पैरा/मिलट्री फोर्स/अर्ध सैनिक बल (पुलिस/पीएसी) में कार्य करते हुये विजय के शहीदों के पुत्र/पुत्री/विधवाओं को प्रवेश में,17">
                भारतीय सेना पैरा/मिलट्री फोर्स/अर्ध सैनिक बल (पुलिस/पीएसी) में
                कार्य करते हुये विजय के शहीदों के पुत्र/पुत्री/विधवाओं को प्रवेश
                में
              </MenuItem>
            </TextField>
            {other && other !== 'none,0' && (
              <FileUploader
                buttonLabel="Upload Certificate for Extra Merit Marks"
                accept="image/jpg,image/jpeg,image/png,application/pdf"
                maxSize={1}
                handleChange={handleUpload}
                id="uploadExtraMark"
                name="uploadExtraMark"
              />
            )}
            <Grid item md={4} xs={6}>
              {uploadExtraMark !== '' && uploadExtraMark !== null
                ? uploadViewer(uploadExtraMark)
                : null}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Extra Marks: <b>{totalMeritCount}</b>
            </Typography>
            <br />
            <Typography variant="caption">
              <b>Note:-</b> Allowed maximum 17 marks.
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container item xs={12} justifyContent="center">
          <Typography variant="subtitle1">
            According to your selected course this section is not required,
            Please goto <b>"Next"</b> step.
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
export default forwardRef(MeritDetails)
