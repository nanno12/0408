import API from '@techCommon/utils/httpUtils'

const url = 'http://172.17.1.211:20032'

export default {
  addPafListInfo (params) {
    return API.postJsonRequest(`${url}/clf/paf/addPafListInfo`, params)
  },
  updatePafListInfo (params) {
    return API.postJsonRequest(`${url}/clf/paf/addPafListInfo`, params)
  },
  sendPafListInfo (params) {
    return API.postJsonRequest(`${url}/clf/paf/sendPafListInfo`, params)
  },
  getPafListInfo (id) {
    return API.postJsonRequest(`${url}/clf/paf/getPafListInfo`, { id })
  },
  findPafLists (hospNo, createdAt) {
    return API.postJsonRequest(`${url}/clf/paf/findPafLists`, {
      HOSP_NO: hospNo,
      CREATED_AT: createdAt
    })
  },
  getPatUserInfo () {
    return API.postJsonRequest(`${url}/clf/pafbase/getPatUserInfo`)
  },
  getPafTemplateitems (params) {
    return API.postJsonRequest(`${url}/clf/pafbase/getPafTemplateitems`, params)
  },
  getPafTemplate () {
    return API.postJsonRequest(`${url}/clf/pafbase/getPafTemplate`)
  },
  getDictionaryData () {
    return API.postJsonRequest(`${url}/clf/pafbase/getDictionaryData`)
  },
  getSpecimenGatherers () {
    return API.postJsonRequest(`${url}/clf/pafbase/specimenGatherer`, {
      userCode: '0003'
    })
  },
  getSpecimenData () {
    return API.postJsonRequest(`${url}/clf/pafbase/findSpecimenDic`)
  },
  getPatUserEndoscopeInfo () {
    return API.postJsonRequest(`${url}/clf/pafbase/getPatUserEndoscopeInfo`, {
      HOSPITAL_CODE: '33',
      ENDOSCOPY_ID: 1
    })
  },
  getPatUserClinicalInfo () {
    return API.postJsonRequest(`${url}/clf/pafbase/getPatUserClinicalInfo`)
  },
  getHistoryCheck () {
    return API.postJsonRequest(`${url}/clf/pafbase/getHistoryCheck`, {
      HOSPITAL_CODE: '1',
      PATIENT_TYPE: 2,
      PATIENT_ID: 'dd',
      PATIENT_NAME: 'dd',
      SEX_NO: 'dd'
    })
  },
  getPatUserOperationInfo () {
    return API.postJsonRequest(`${url}/clf/pafbase/getPatUserOperationInfo`)
  },
  makeSpecimenLabelCode () {
    return API.postJsonRequest(`${url}/clf/pafbase/makeSpecimenLabelCode`)
  },
  deleteCheckSpecimen (id) {
    return API.postJsonRequest(`${url}/clf/paf/deleteCheckSpecimen`, {
      id: id
    })
  }
}
