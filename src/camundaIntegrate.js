import Oaxios from "axios"

// Fetch by axios
const axios = Oaxios.create({ timeout: 6000 })
const _ = console.log

// REST endpoints
export const getStartProcessEndpoint = (restUrl, processId) => `${restUrl}/process-definition/${processId}/submit-form`
export const getTaskInfoEndpoint = (restUrl, taskId) => `${restUrl}/task/${taskId}/form-variables`

/**
 * Transform Form data to Camunda data shape
 * @param data
 * @return {{variables: *}}
 */
export const transformFormDataToCamundaData = data => {
  // Sanity check
  const isObj = typeof data === "object"
  if (!isObj) {
    throw new Error("Please submit data obj")
  }

  // Do transformFormDataToCamundaData
  const variables = Object.keys(data).reduce((carry, key) => {
    const _val = data[key]
    const isStr = typeof _val === "string"
    const val = isStr ? _val : JSON.stringify(_val)
    const valObj = {
      value: val,
      type: "String",
      valueInfo: {}
    }
    carry[key] = valObj
    return carry
  }, {})

  return { variables }
}

/**
 * Submit to create Camunda Task
 * by start a process
 * @param restUrl
 * @param processId
 * @param data
 * @return {Promise.<null>}
 */
export const submit = async (restUrl, processId, data) => {
  const endpoint = getStartProcessEndpoint(restUrl, processId)
  const postData = transformFormDataToCamundaData(data)
  _("[endpoint, postData]", endpoint, postData)

  try {
    const res = await axios({
      method: "GET",
      url: endpoint,
      data: postData,
      headers: { "Access-Control-Allow-Origin": "*" }
    })
    return res.data
  } catch (err) {
    _("[submit][ERR]", err.message)
    return null
  }
}

export const transformCamundaDataToFormData = camundaData => {
  try {
    return Object.keys(camundaData).reduce((carry, key) => {
      const valObj = camundaData[key]["value"]
      let realVal = valObj
      try {
        realVal = JSON.parse(valObj)
      } catch (err) {}

      carry[key] = realVal
      return carry
    }, {})
  } catch (err) {
    _("[transformCamundaDataToFormData][ERR]", err.message)
    return null
  }
}

/**
 * Get Task Info
 * @param restUrl
 * @param taskId
 * @return {Promise.<null>}
 */
export const getTaskInfo = async (restUrl, taskId) => {
  const endpoint = getTaskInfoEndpoint(restUrl, taskId)

  try {
    const taskVariables = await axios.get(endpoint)
    return transformCamundaDataToFormData(taskVariables)
  } catch (err) {
    _("[getTaskInfo][ERR]", err.message)
    return null
  }
}
