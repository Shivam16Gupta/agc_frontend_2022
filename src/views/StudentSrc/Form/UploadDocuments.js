import { Box, Grid, MenuItem, TextField, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FileUploader from '../../../common/FileUploader/FileUploader'
import RegularButton from '../../../components/CustomButtons/Button'
import {
  fetchDocumentsDetails,
  submitDocumentsDetails,
} from '../../../store/Form/3/actions'
import {
  addErrorMsg,
  getCourseType,
  getUserDetail,
  mandatoryField,
  uploadViewer,
} from '../../../utils/Utils'
import academicData from '../StaticData/academicData.json'
import documentTypeData from '../StaticData/documentType.json'
import documentsStatic from '../StaticData/documents.json'
import CustomText from '../../../components/CustomText/Customtext'

function UploadDocuments(props, ref) {
  let dispatch = useDispatch()
  const documentsData = useSelector((state) => state.documents.documents)
  const [fields, setFields] = useState({
    documents:
      documentsStatic[
        getCourseType(getUserDetail('course')) +
          '-' +
          getUserDetail('admissionYear')
      ],
  })

  let { documents } = fields

  useEffect(() => {
    if (!documentsData) {
      dispatch(fetchDocumentsDetails())
    } else {
      setFields({
        ...fields,
        documents:
          documentsData && documentsData.documents.length > 0
            ? documentsData.documents
            : documentsStatic[
                getCourseType(getUserDetail('course')) +
                  '-' +
                  getUserDetail('admissionYear')
              ],
      })
    }
  }, [documentsData])

  const handleAddEnclosure = () => {
    setFields({
      ...fields,
      documents: [...documents, ...academicData.documents],
    })
  }

  const handleRemoveEnclosure = (index) => {
    const list = [...documents]
    list.splice(index, 1)
    setFields({
      ...fields,
      documents: list,
    })
  }

  const handleInputEnclosure = (e, index) => {
    const { name, value } = e.target
    const list = [...documents]
    list[index][name] = value
    setFields({
      ...fields,
      documents: list,
    })
  }

  const handleUploadEnclosure = (file, index) => {
    const list = [...documents]
    list[index]['document'] = file
    setFields({
      ...fields,
      documents: list,
    })
  }

  // 0: not null, >1: null
  const checkJSONfields = (data) => {
    let isNull = 0
    if (data && data.length > 0) {
      data.map((item) => {
        for (let k in item) {
          if (
            typeof item[k] == 'string' &&
            (item[k] == undefined ||
              item[k] == 'undefined' ||
              item[k] == 'null' ||
              item[k] == null ||
              item[k] == '')
          ) {
            isNull = isNull + 1
            break
          }
        }
      })
    }
    return isNull
  }

  const handleSubmit = () => {
    if (checkJSONfields(documents) <= 0) {
      dispatch(submitDocumentsDetails(fields, () => props.moveToNextStep()))
    } else {
      addErrorMsg('Fill the empty fields and upload all required documents !')
    }
  }

  useImperativeHandle(ref, () => ({
    handleSubmitDocuments() {
      handleSubmit()
    },
  }))

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className="headBg">
        <CustomText white upperCase>
          Upload Documents <b>(allowed jpg,png,jpeg or pdf only.)</b>
        </CustomText>
      </Grid>
      <Grid item xs={12}>
        {documents.length > 0 &&
          documents.map((item, i) => (
            <Box p={1} key={i}>
              <Grid container spacing={2} alignItems="center">
                <Grid item md={4} xs={12}>
                  <TextField
                    fullWidth
                    select
                    disabled={item.isDelete === 0}
                    label={mandatoryField('Document Type')}
                    value={item.documentType}
                    onChange={(e) => handleInputEnclosure(e, i)}
                    variant="outlined"
                    name="documentType"
                  >
                    {documentTypeData.map((item, key) => (
                      <MenuItem key={key} value={item.documentTypeId}>
                        {item.documentType}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={3} xs={12}>
                  <FileUploader
                    buttonLabel="Upload Document"
                    accept="image/jpg,image/jpeg,image/png,application/pdf"
                    maxSize={5}
                    handleChange={handleUploadEnclosure}
                    id={'uploadDocument' + i}
                    index={i}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  {item.document &&
                    item.document !== '' &&
                    item.document !== null &&
                    uploadViewer(item.document)}
                </Grid>
                <Grid item md={1} xs={12}>
                  {item.isDelete === 1 && (
                    <RegularButton
                      fab
                      size="sm"
                      color="danger"
                      onClick={() => handleRemoveEnclosure(i)}
                    >
                      <DeleteIcon />
                    </RegularButton>
                  )}
                </Grid>
                <Grid container item md={12} xs={6} justifyContent="flex-end">
                  {documents.length - 1 === i && (
                    <Box pr="10px" pb="5px">
                      <div className="alignCenter">
                        <Typography>
                          Press on <b>"+"</b> button to add more documents.
                          &nbsp;&nbsp;
                        </Typography>
                        <RegularButton size="sm" onClick={handleAddEnclosure}>
                          <AddIcon />
                        </RegularButton>
                      </div>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          ))}
      </Grid>
    </Grid>
  )
}
export default forwardRef(UploadDocuments)
