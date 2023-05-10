import config from 'myconfig'

const ROLES_KEY = {}
config.ROLES.forEach(function (key) {
  ROLES_KEY[key] = key
})
const ASSETS = {
  url: config.APIURL,
  PROSPECTUS: 'Prospectus.pdf',
  STUDENTPERFORMA: 'StudentPerforma.pdf',
  // ANNOUNCEMENTS:'announcement.json',
}
const PAYMENT = {
  DONE: '1',
  NOT_DONE: '0',
}
const FORM = {
  SUBMITTED: '1',
  NOT_SUBMITTED: '0',
}

const FORM_ACTION = {
  USER_SUB_DETAILS: 0,
  ADVANCED_DETAILS: 1,
  ACADEMIC_FACULTY_DETAILS: 2,
  UPLOAD_DOCUMENTS: 3,
  MERIT_DETAILS: 4,
  DECLARATION: 5,
}

const FLAGS = {
  ENABLED: '1',
  DISABLED: '0',
}

module.exports = {
  ROLES_KEY: ROLES_KEY,
  ASSETS: ASSETS,
  FORM: FORM,
  PAYMENT: PAYMENT,
  FORM_ACTION: FORM_ACTION,
  FLAGS: FLAGS,
}
