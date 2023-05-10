import { CircularProgress, Dialog, Divider } from '@material-ui/core'
import Axios from 'axios'
import { ROLES_KEY } from 'constants/Constants'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import config from 'myconfig'
import React from 'react'
import ReactDOM from 'react-dom'
import DocumentView from '../common/DocumentView'
import FormDialog from '../common/FormDialog'
import LocalStorage from '../common/LocalStorage'
import PromptBox from '../common/PromptBox'
import Success from '../components/Typography/Success'
import { ASSETS } from '../constants/Constants'
import dashboardRoutes from '../routes'
import majorSelectionLimitStaticData from '../StaticData/majorSelectionLimit.json'
import majorSubjectsStaticData from '../StaticData/majorSubjects.json'
import coursesStaticData from '../StaticData/courses.json'
import feesFirstStatic from '../views/StudentSrc/StaticData/1stYearFees.json'
import feesStatic from '../views/StudentSrc/StaticData/fees.json'
import Snackbar from './../components/Snackbar/Snackbar'
import history from './history'

export function formatData(data, keys, actionItems, actionHandler, actionKey) {
  let result = []

  for (var i in data) {
    let dataVal = data[i]
    let actionValue = null
    if (Array.isArray(actionKey)) {
      actionValue = actionKey.map((item) => dataVal[item])
    } else {
      actionValue = dataVal[actionKey]
    }

    let row = keys.map((item) => dataVal[item])
    if (actionItems)
      row.push(
        React.cloneElement(actionItems, {
          onClick: actionHandler(actionValue),
        })
      )
    result.push(row)
  }
  return result
}

export function refreshApp(response) {
  
  if (response.headers) {
    if (
      response.headers.hasOwnProperty('app_version') ||
      response.headers.hasOwnProperty('APP_VERSION')
    ) {
      // console.log(response.headers.hasOwnProperty('app_version'));
      // console.log(response.headers.app_version);
      // console.log(config.APP_VERSION);
      if (response.headers.app_version !== config.APP_VERSION) {
        LocalStorage.removeUser()
        window.location.reload(true)
      } else {
        return response
      }
    } else {
      return response
    }
  }
}
 
export function addSuccessMsg(message) {
  ReactDOM.render(
    <Snackbar
      message={message}
      severity="success"
      renderElement={document.getElementById('error')}
    />,
    document.getElementById('error')
  )
}

export function addErrorMsg(message) {
  ReactDOM.render(
    <Snackbar
      message={message}
      severity="warning"
      renderElement={document.getElementById('error')}
    />,
    document.getElementById('error')
  )
}

const colors = {
  0: 'primary',
  1: 'warning',
  2: 'danger',
  3: 'success',
  4: 'info',
  5: 'rose',
}

export function tileColor(index) {
  let val = Math.floor(Math.random() * 6)
  return colors[index] ? colors[index] : colors[val]
}

export function viewError(res) {
  if (res.isError === true) {
    addErrorMsg(res.Message)
  } else {
    addSuccessMsg(res.Message)
    return res
  }
}

export function addLoader() {
  ReactDOM.render(
    <Dialog
      open={true}
      fullWidth
      fullScreen
      PaperComponent="div"
      PaperProps={{
        style: {
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <CircularProgress style={{ color: 'darkblue' }} size={80} thickness={6} />
    </Dialog>,
    document.getElementById('loader')
  )
}

export function removeLoader() {
  ReactDOM.unmountComponentAtNode(document.getElementById('loader'))
}

//It is used for delete confirmation
export function deleteBox(message, handleAction) {
  ReactDOM.render(
    <PromptBox
      title="Confirm"
      message={message}
      isYes
      isNo
      yesName="Confirm"
      noName="Cancel"
      handleAction={handleAction}
    />,
    document.getElementById('error')
  )
}

//It is used to display error message and response from PHP's on dialog box
export function errorDialog(message, title) {
  ReactDOM.render(
    <PromptBox
      title={title ? title : 'MESSAGE'}
      message={message}
      isNo
      noName="Close"
    />,
    document.getElementById('error')
  )
}

export function formDialog(component, fullscreen, title, width, action) {
  ReactDOM.render(
    <FormDialog
      fullScreen={fullscreen}
      maxSize={width}
      title={title}
      component={component}
      action={action}
    />,
    document.getElementById('form')
  )
}

export function closeDialog() {
  ReactDOM.unmountComponentAtNode(document.getElementById('form'))
}

export function closeFileViewerDialog() {
  ReactDOM.unmountComponentAtNode(document.getElementById('fileViewer'))
}

export function getAxios() {
  const axios = Axios
  const userData = LocalStorage.getUser() && LocalStorage.getUser()
  axios.defaults.headers.common['APP_VERSION'] = `${config.APP_VERSION}`
  //console.log(axios.defaults.headers.common['APP_VERSION'])
  axios.defaults.headers.common['Role'] = 'STUDENT'
  if (userData) {
    axios.defaults.headers.common['Authorization'] = `${userData.user_id}`
    const token = LocalStorage.getUserToken()
    axios.defaults.headers['Authentication'] = `${token}`
  }
  return axios
}

export function getUserRole() {
  return LocalStorage.getUser() && LocalStorage.getUser().role
}

export function validateUser() {
  const user = LocalStorage.getUser()
  let isValidate = false
  if (user && user.user_id) {
    isValidate = true
  }
  return isValidate
}

export function NoDataFound() {
  return (
    <React.Fragment>
      <br />
      <Divider />
      <div className="center pad10">
        No data info is available. Please select appropriate options
      </div>
    </React.Fragment>
  )
}

export function createdDateTime(ms, onlyDateTime, format) {
  if (ms !== '') {
    const dateObject = new Date(parseInt(ms))
    var date = dateObject.toLocaleString('en-US', {
      day: 'numeric',
    })
    var month = dateObject.toLocaleString('en-US', {
      month: 'numeric',
    })
    var year = dateObject.toLocaleString('en-US', {
      year: 'numeric',
    })
    var hour = dateObject.getHours()
    hour = hour > 9 ? hour : '0' + hour
    var minute = dateObject.toLocaleString('en-US', { minute: 'numeric' })
    var second = dateObject.toLocaleString('en-US', { second: 'numeric' })
    second = second > 9 ? second : '0' + second
    var min = minute > 9 ? minute : '0' + minute
    var ampm = hour >= 12 ? 'PM' : 'AM'
    if (onlyDateTime === 1) {
      if (format === 'yyyy-MM-dd') {
        return (
          year +
          '-' +
          `${month <= 9 ? 0 + month : month}` +
          '-' +
          `${date <= 9 ? 0 + date : date}`
        )
      }
      if (format === 'yyyymmddhhmmss') {
        return `${year}${month}${date}${hour}${min}${second}`
      } else {
        return date + '-' + month + '-' + year
      }
    } else if (onlyDateTime === 0) {
      return hour + ':' + min
    } else {
      return (
        date +
        '-' +
        month +
        '-' +
        year +
        ',' +
        ' ' +
        hour +
        ':' +
        min +
        ' ' +
        ampm
      )
    }
  }
}

export function redirectUrl(id, value) {
  if (id && value == null) {
    history.push(id)
  } else if (value > 1) {
    const obj = dashboardRoutes.filter((item) => item.id === id)
    if (obj.length > 0)
      window.location.replace(
        config.BASE_URL + '#' + obj[0].layout + obj[0].path
      )
  } else {
    const obj = dashboardRoutes.filter((item) => item.id === id)
    if (obj.length > 0) history.push(obj[0].layout + obj[0].path)
  }
}

export function setErrorFields(isError, errorList, fieldName) {
  if (isError) {
    if (!errorList.find((item) => item[fieldName])) {
      errorList.push({ [fieldName]: fieldName })
    }
  } else {
    if (errorList.find((item) => item[fieldName])) {
      errorList.splice(fieldName, 1)
    }
  }
  return errorList
}

export function deleteFromList(list, keyName, keyValue) {
  return list.filter((item) => item[keyName] !== keyValue)
}

export function updateInList(list, uniqueElement, updateElement) {
  return list.map((item) => {
    if (item[uniqueElement.keyName] === uniqueElement.keyValue) {
      item[updateElement.keyName] = updateElement.keyValue
    }
    return item
  })
}

export function updateMultipleInList(list, uniqueElement, updateElement) {
  return list.map((item) => {
    if (item[uniqueElement.keyName] === uniqueElement.keyValue) {
      for (const key in updateElement) {
        if (updateElement.hasOwnProperty(key)) {
          const element = updateElement[key]
          item[key] = element
        }
      }
    }
    return item
  })
}

export function isJSON(str) {
  try {
    return JSON.parse(str) && !!str
  } catch (e) {
    return false
  }
}

export function filterRoutes(id) {
  return dashboardRoutes.find((item) => item.id === id)
}

export function updateAlert(message, title) {
  ReactDOM.render(
    <PromptBox
      title={title ? title : 'MESSAGE'}
      message={message}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
    />,
    document.getElementById('error')
  )
}

//Used to replace key names for excel file.
export function replaceKey(data, newKeyName, oldKeyName) {
  var i
  for (i = 0; i < data.length; i++) {
    data[i][newKeyName] = data[i][oldKeyName]
    delete data[i][oldKeyName]
  }
  return data
}

export function deleteEachKeyPair(data, deleteObj) {
  if (deleteObj) {
    data.forEach((element) => {
      delete element[deleteObj]
    })
  }
  return data
}

export function deleteIndex(data, key, value) {
  data.map((item, index) => {
    if (item[key] === value) {
      data.splice(index, 1)
    }
  })
  return data
}

export function isUser(user) {
  if (ROLES_KEY.STUDENT === user) {
    return getUserRole() === ROLES_KEY.STUDENT
  } else if (ROLES_KEY.TEACHER === user) {
    return getUserRole() === ROLES_KEY.TEACHER
  } else if (ROLES_KEY.ADMIN === user) {
    return getUserRole() === ROLES_KEY.ADMIN
  }
  return false
}

export function getMilliDifference(endTime, startTime, isTimer) {
  if (startTime !== null) {
    var startingTime = startTime
  } else {
    var startingTime = new Date().getTime()
  }
  var minutes = parseInt(endTime - startingTime) / 1000
  var minutes = parseInt(minutes / 60)
  var timer = Date.now() + parseInt(minutes) * 60000
  if (isTimer) {
    return timer
  } else {
    if (minutes % 2 === 0) {
      return minutes
    } else {
      return minutes + 1
    }
  }
}

export function unauthorizedUser(error) {
  var arr = error.toString().split(' ')
  if (arr[arr.length - 1] === '401') {
    addErrorMsg('Invalid Authentication or Session Expired.')
    return true
  } else if (arr[arr.length - 1] === '406') {
    addErrorMsg(
      'Please try to refresh the page. Fill and upload all the required details'
    )
    return true
  } else {
    return false
  }
}

// Parameter Details:-
// 1- JSON Data to be filtered
// 2- Key name for the condition
// 3- Value to check on key
export function filterData(data, key, value) {
  return data.filter((item) => item[key] === value)
}

export function checkExtension(fileName) {
  return fileName
    ? fileName.substring(fileName.length - 3, fileName.length)
    : null
}

export function mandatoryField(string) {
  return (
    <div className="alignCenter">
      {string} &nbsp;
      <span className="makeRed">*</span>
    </div>
  )
}

export function downloadPdf(formId, fname, isCustomWidthHeight) {
  try {
    const input = document.getElementById(formId)
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg')
      var pdf = new jsPDF('p', 'px', 'a4')
      var imgWidth = isCustomWidthHeight ? 250 : pdf.internal.pageSize.width
      var pageHeight = pdf.internal.pageSize.height
      var imgHeight = isCustomWidthHeight
        ? 520
        : (canvas.height * imgWidth) / canvas.width
      var heightLeft = imgHeight
      var position = 10
      var spacing = isCustomWidthHeight ? 100 : 0
      pdf.addImage(imgData, 'PNG', spacing, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      const fileName = LocalStorage.getUser()
        ? LocalStorage.getUser().user_id
        : new Date().getTime()
      pdf.save(fileName + '_' + fname + '.pdf')
    })
  } catch (error) {}
}

export function handleCalculateFees(admissionYear, faculty, gender, major1) {
  // return null - Means Applied for 1st Year
  // Type 0  (Default Case With No Any Constraint)
  // Type 1  (Same faculty For All Years)
  // Type 2  (Same faculty with Gender Constraint)
  // Type 3  (Gender and Practical Constraint)
  if (admissionYear !== '1') {
    let fees = feesStatic[faculty]
    if (fees.type === 0) {
      return { parameterId: fees.parameterId, amount: fees.fee }
    } else if (fees.type === 1) {
      return { parameterId: fees.parameterId, amount: fees[gender] }
    } else if (fees.type === 2) {
      return {
        parameterId: fees.parameterId,
        amount: fees[major1[0].id][gender],
      }
    } else if (fees.type === 3) {
      let count = 0
      major1.map((item) => {
        if (fees.practicalSubjects.includes(item.id)) {
          count++
        }
      })
      return {
        parameterId: fees.parameterId,
        amount: fees.fee[count][gender],
      }
    }
  } else {
    return null
  }
}

export function calculateFirstYearFees(
  admissionYear,
  faculty,
  gender,
  major1,
  major2
) {
  // return null - Means Not Applied for 1st Year
  // Type 0  (Default Case With No Any Constraint)
  // Type 1  (Same faculty For All Years)
  // Type 2  (Same faculty with Gender Constraint)
  // Type 3  (Gender Constraint Only)
  // Type 4 (Gender and Practical Subject Constraint)
  // Type 5 (Bio/Maths and Gender Constraint)
  if (admissionYear === '1') {
    let isArts =
      faculty === 'f2Arts' ||
      faculty === 'f3Language' ||
      faculty === 'f4fineArt'
        ? true
        : false
    let fees = isArts ? feesFirstStatic['BA'] : feesFirstStatic[faculty]
    if (fees.type === 0) {
      return { parameterId: fees.parameterId, amount: fees.fee }
    } else if (fees.type === 1) {
      return {
        parameterId: fees.parameterId,
        amount: fees[major1[0].id],
      }
    } else if (fees.type === 2) {
      return {
        parameterId: fees.parameterId,
        amount: fees[major1[0].id][gender],
      }
    } else if (fees.type === 3) {
      return {
        parameterId: fees.parameterId,
        amount: fees[gender],
      }
    } else if (fees.type === 4) {
      let count = 0
      major1.map((item) => {
        if (fees.practicalSubjects.includes(item.id)) {
          count++
        }
      })
      let maj2 = typeof major2 == 'string' ? JSON.parse(major2) : major2
      if (fees.practicalSubjects.includes(maj2.id)) {
        count++
      }
      return {
        parameterId: fees.parameterId,
        amount: fees.fee[count][gender],
      }
    } else if (fees.type === 5) {
      let subject = null
      major2 = typeof major2 == 'string' ? JSON.parse(major2) : major2
      let bioSub = ['$sf17BALLBZoology', '$s6Zoology', '$s1Botany']
      let bioCheck = major1.some((item) => {
        return bioSub.includes(item.id) || bioSub.includes(major2.id)
      })
      if (bioCheck) {
        subject = 'BIO'
      } else {
        subject = 'MATHS'
      }
      return {
        parameterId: fees.parameterId,
        amount: fees.fee[subject][gender],
      }
    }
  } else {
    return null
  }
}

// "courseType" - To identify the student applied in (Graduation or Post-Graduation) or for cross-checking.
// "admissionYear" - To cross-check because (we are calculating merit of only 1st year students).
// "academicDetails" - For merit calculation (High School or Inter or Graduation) Percentage.
// "totalMeritCount" - Merit Points
// "major1" - In "Law" Course Type there is (Graduation & Post-Graduation) both course available
// So using "major1" we can identify the course.
// "bcom" - To check the 5 merit points to be added in only on students applied in Bcom
export function calculateMerit(
  courseType,
  admissionYear,
  academicDetails,
  totalMeritCount,
  major1,
  bcom
) {
  let merit = 0,
    highSchool,
    inter,
    graduation,
    meritPoints
  let meritCount = totalMeritCount === '' ? 0 : parseInt(totalMeritCount)
  if (admissionYear === '1' && courseType !== 'PGD') {
    if (
      (academicDetails.length === 2 &&
        academicDetails[0].percentage &&
        academicDetails[0].percentage &&
        major1.length > 0) ||
      (academicDetails.length > 2 &&
        academicDetails[1].percentage &&
        academicDetails[2].percentage &&
        major1.length > 0)
    ) {
      meritPoints =
        (bcom === 'YES' || bcom === 'true') && major1[0].id !== '21BCOM'
          ? parseInt(meritCount - 5)
          : parseInt(meritCount)
      if (
        academicDetails.length >= 2 &&
        (courseType === 'UG' ||
          ((courseType === 'LAW' || courseType === 'LLB') &&
            major1[0].id === '51BALLB'))
      ) {
        highSchool = parseFloat(academicDetails[0].percentage.split('%')[0] / 2)
        inter = parseFloat(academicDetails[1].percentage.split('%')[0])
        merit = (highSchool + inter + meritPoints).toFixed(2)
      } else if (
        academicDetails.length > 2 &&
        (courseType === 'PG' ||
          ((courseType === 'LAW' || courseType === 'LLB') &&
            (major1[0].id === '52LLB' || major1[0].id === '53LLM')))
      ) {
        inter = parseFloat(academicDetails[1].percentage.split('%')[0] / 2)
        graduation = parseFloat(academicDetails[2].percentage.split('%')[0])
        merit = (inter + graduation + meritPoints).toFixed(2)
      } else {
        merit = 'Incomplete Form'
      }
      return merit
    } else {
      return 'Incomplete Form'
    }
  } else {
    return 'N/A'
  }
}

// Tells number of selections of "majorSubjects"
export function checkMajorSelectionLimit() {
  return majorSelectionLimitStaticData[
    getUserDetail('course') + '-' + getUserDetail('admissionYear')
  ]
}

export function verifyString(text) {
  return text.replace(/[\n\r\s\t']+/g, ' ')
}

export function modifyKeys(arr) {
  if (arr && arr.length > 0) {
    return arr.map((obj) => {
      Object.keys(obj).forEach((key) => {
        if (key.trim() !== key) {
          obj[key.trim()] = obj[key]
          delete obj[key]
        }
      })
    })
  }
}

export function viewFile(fileLink) {
  ReactDOM.render(
    <DocumentView
      withDownload
      handleClose={() => closeFileViewerDialog()}
      aria-labelledby="customized-dialog-title"
      isOpen={true}
      fileLink={ASSETS.url + fileLink}
    />,
    document.getElementById('fileViewer')
  )
}

export function uploadViewer(fileLink) {
  let isStudent = getUserRole() === 'STUDENT' ? true : false
  return (
    <Success
      linkable={!isStudent}
      onClick={!isStudent ? () => viewFile(fileLink) : null}
    >
      {isStudent ? 'Uploaded' : 'View Uploaded File'}
    </Success>
  )
}

export function fixApiResponse(res) {
  let response = res
  Object.keys(response).map((item) => {
    if (
      response[item] === null ||
      response[item] === 'null' ||
      response[item] === 'false'
    ) {
      response[item] = ''
    }
  })
  return response
}

export function getCourseType(courseId) {
  return coursesStaticData.find((itm) => itm.courseId === courseId).courseType
}

export function getUserDetail(key) {
  return LocalStorage.getUser() && LocalStorage.getUser()[key]
}

export function convertedMajorSubjects(majorSubjects) {
  if (majorSubjects.length > 0) {
    let convertedMajorSubjects = []
    majorSubjects.map((itm) => {
      convertedMajorSubjects.push(
        majorSubjectsStaticData.find((itm2) => itm2.id === itm.id).name
      )
    })
    return convertedMajorSubjects
  } else {
    return []
  }
}

export function check_PracticalSubjects(majorSubjects) {
  let course = getUserDetail('course')
  let BA_practicalSubjects = [
    '08DSS',
    '10PHILOSOPHY',
    '11PS',
    '12PSCHYOLOGY',
    '13SOCIOLOGY',
    '14PE',
    '18DP',
    '19MUSIC',
    '20MATHS',
    '66ZOOLOGY',
    '67BOTANY',
    '68CHEM',
    '69PHY',
    '70STATS',
  ]
  let BSC_Bio_practicalSubjects = ['7ZBC', '40BOTANY', '41ZOOLOGY']
  if (course === '1BA') {
    let count_ba = 0
    BA_practicalSubjects.map((item) => {
      if (majorSubjects.find((itm) => itm.id === item)) {
        count_ba++
      }
    })
    return count_ba === 0
      ? '0'
      : count_ba === 1
      ? '1'
      : count_ba === 2
      ? '2'
      : '3'
  } else if (course === '6BSC') {
    let count_bsc = 0
    BSC_Bio_practicalSubjects.map((item) => {
      if (majorSubjects.find((itm) => itm.id === item)) {
        count_bsc++
      }
    })
    return count_bsc > 0 ? 'Bio' : 'Maths'
  }
}

export function getFeeDetails(feesData, majorSubjects, period) {
  let data = feesData.filter((item) => item.semester === period)
  if (data.length === 1) {
    return data[0]
  } else {
    let flag = check_PracticalSubjects(majorSubjects)
    if (getUserDetail('course') === '6BSC') {
      return data.find((item) => item.stream === flag)
    } else {
      return data.find((item) => item.practical === flag)
    }
  }
}

export function convertGender(value) {
  if (value === 'male') {
    return 'Male'
  } else if (value === 'female') {
    return 'Female'
  } else if (value === 'transgender') {
    return 'Transgender'
  }
}
//Orignal
// export function handleCGPA(year, course, i) {
//   if (
//     i == 2 &&
//     year == '2' &&
//     (course == '1BA' || course == '6BSC' || course == '8BCOM')
//   ) {
//     return 1
//   } else {
//     return 0
//   }
// }
//Changed by shivam
export function handleCGPA(year, course, i) {
  if (
    (i == 2 || i==3 || i==4) &&
    year <= '3' &&
    (course == '1BA' || course == '6BSC' || course == '8BCOM')
  ) {
    console.log(1);
    return 1
  } else {
    console.log(year,course,i);
    return 0
  }
}