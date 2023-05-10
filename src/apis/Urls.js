import config from 'myconfig'
const BASE_URL = config.BASE_URL
const API_URL = config.APIURL

const URLS = {
  BASE_URL: BASE_URL,
  LOGIN: API_URL + 'Login.php',

  STUDENTREGISTER: API_URL + 'StudentApi/StudentRegister.php',
  PREVIOUS_SESSION_CHECK: API_URL + 'StudentApi/PreviousSessionCheck.php',
  FORGOT_REGISTRATION: API_URL + 'StudentApi/ForgotRegistration.php',
  FETCHPAYMENTDETAILS: API_URL + 'StudentApi/FetchPaymentDetails.php',
  FETCHPAYMENTRECEIPTS: API_URL + 'FetchPaymentReceipts.php',

  CHECKSUM: API_URL + 'checksum.php',

  FORM_API: API_URL + 'StudentApi/ManageForm.php',
  FETCH_FULL_USER_FORM: API_URL + 'StudentApi/FetchFullForm.php',

  COURSE_FEE: API_URL + 'StudentApi/CourseFee.php',

  ANNOUNCEMENTS: API_URL + 'AdminApi/ManageAnnouncements.php',
}

export default URLS
