import Oaxios from "axios"
import FormData from "form-data"

// Fetch by axios
const axios = Oaxios.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  timeout: 6000
})
const _ = console.log
const ACCEPTED_OPERATORS = ["eq", "neq", "gt", "gteq", "lt", "lteq", "like"]

// REST endpoints
export const getStartProcessEndpoint = (restUrl, processId) => `${restUrl}/process-definition/${processId}/submit-form`
export const getTaskInfoEndpoint = (restUrl, taskId) => `${restUrl}/task/${taskId}/form-variables`
export const getTaskFiltersEndpoint = restUrl => `${restUrl}/task`
export const getTaskBriefEndpoint = (restUrl, taskId) => `${restUrl}/task/${taskId}`
export const getStartFormEndpoint = (restUrl, processDefinitionId) =>
  `${restUrl}/process-definition/${processDefinitionId}/startForm`
export const getTaskListHistoryEndpoint = (restUrl, processInstanceId) =>
  `${restUrl}/history/task?processInstanceId=${processInstanceId}`
export const getSubmitTaskAttachmentEndpoint = (restUrl, taskId) => `${restUrl}/task/${taskId}/attachment/create`

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
 * @param postData
 * @return {Promise.<null>}
 */
export const submitTask = async (restUrl, processId, postData) => {
  const endpoint = getStartProcessEndpoint(restUrl, processId)

  try {
    const res = await axios({
      method: "POST",
      url: endpoint,
      data: postData
    })
    return res.data
  } catch (err) {
    _("[submit][ERR]", err.message)
    return null
  }
}

/**
 * Transform Camunda data to Form data
 * @param camundaData
 * @return {*}
 */
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
 * Get Task info
 * Task info actually task form variables
 * Task form variables is different from task's variables itself ^^
 * @see https://docs.camunda.org/manual/7.8/reference/rest/task/get-form-variables/
 * @param restUrl
 * @param taskId
 * @return {Promise.<null>}
 */
export const getTaskInfo = async (restUrl, taskId) => {
  const endpoint = getTaskInfoEndpoint(restUrl, taskId)

  try {
    const res = await axios.get(endpoint)
    const taskVariables = res.data
    return transformCamundaDataToFormData(taskVariables)
  } catch (err) {
    _("[getTaskInfo][ERR]", err.message)
    return null
  }
}

/**
 * Check if Task's filters in right format
 * @see getTaskList
 * @param filters
 * @return boolean
 */
export const validTaskFiltersFormat = filters => {
  const shouldBeArr = Array.isArray(filters)
  if (!shouldBeArr) {
    _("[validTaskFiltersFormat] filters should be array")
    return false
  }

  // Check filter shape
  return filters.reduce((carry, filter) => {
    const { name, value, operator } = filter
    const hasValue = typeof value !== "undefined"
    const isAcceptedOperator = ACCEPTED_OPERATORS.includes(operator)
    const isOk = name && hasValue && isAcceptedOperator
    return carry && isOk
  }, true)
}

/**
 * Get Task List
 * @see https://docs.camunda.org/manual/7.8/reference/rest/task/post-query/
 * @param restUrl
 * @param processId - Task under specific process
 * @param filters - Base on task's variables

 A JSON array to only include tasks that have variables with certain values.
 The array consists of JSON objects with three properties name, operator and value. name is the variable name, operator is the comparison operator to be used and value the variable value.
 value may be of type String, Number or Boolean.

 Valid operator values are:
    eq - equal to; neq - not equal to;
    gt - greater than; gteq - greater than or equal to;
    lt - lower than; lteq - lower than or equal to;
    like.
 * @param sorting
 */
export const getTaskList = async (restUrl, { processId, filters, sorting }) => {
  // Sanity check
  if (!processId) {
    _("[getTaskList] processId must have")
    return null
  }

  const isFiltersOk = validTaskFiltersFormat(filters)
  if (!isFiltersOk) {
    _("[getTaskList] filters is invalid shape format")
    return null
  }

  const defaultSort = [{ sortBy: "created", sortOrder: "desc" }]
  sorting = sorting || defaultSort

  const endpoint = getTaskFiltersEndpoint(restUrl)
  const data = {
    processDefinitionId: processId,
    // It's quite WEIRD that Camunda call processVariables
    // May be we start a process > task
    // Task's variables ONLY exist in task instance itself
    processVariables: filters,
    sorting
  }

  try {
    const res = await axios({
      method: "POST",
      url: endpoint,
      data
    })
    const taskList = res.data
    return taskList
  } catch (err) {
    _("[getTaskList][ERR]", err.message)
    return null
  }
}

/**
 * Get form key for specific task
 * We dont get formKey directly from task brief info
 * Bcs we actually need startForm key
 * @see https://docs.camunda.org/manual/7.8/reference/rest/process-definition/get-start-form-key/
 * @param restUrl
 * @param taskId
 * @return {Promise.<null>}
 */
export const getFormKey = async (restUrl, taskId) => {
  try {
    const endpoint = getTaskBriefEndpoint(restUrl, taskId)
    const res = await axios.get(endpoint)
    const { processDefinitionId } = res.data

    const startFormEndPoint = getStartFormEndpoint(restUrl, processDefinitionId)
    const res2 = await axios.get(startFormEndPoint)
    const { key: formKey } = res2.data

    return formKey
  } catch (err) {
    _("[getFormKey][ERR]", err.message)
    return null
  }
}

/**
 * Get task list history
 * Task is single step in process instance
 * Find out task list history base on process instasnce id
 * @see https://docs.camunda.org/manual/7.8/reference/rest/history/task/get-task-query/
 * @param restUrl
 * @param taskId
 * @return {Promise.<null>}
 */
export const getTaskListHistory = async (restUrl, taskId) => {
  try {
    const endpoint = getTaskBriefEndpoint(restUrl, taskId)
    const res = await axios.get(endpoint)
    const { processInstanceId } = res.data

    const taskListEndpoint = getTaskListHistoryEndpoint(restUrl, processInstanceId)
    const res2 = await axios.get(taskListEndpoint)
    const taskList = res2.data

    return taskList
  } catch (err) {
    _("[getTaskListHistory][ERR]", err.message)
    return null
  }
}

/**
 * Submit task file attachment
 * @see https://docs.camunda.org/manual/7.8/reference/rest/task/attachment/post-task-attachment/
 * @param restUrl
 * @param taskId
 * @param attachmentInfo
 * @param file
 * @return {Promise.<void>}
 */
export const submitTaskAttachment = async (restUrl, { taskId, attachmentInfo, file }) => {
  try {
    const endpoint = getSubmitTaskAttachmentEndpoint(restUrl, taskId)
    const formData = new FormData()
    formData.append("attachmentInfo", JSON.stringify(attachmentInfo))
    formData.append("content", file)
    const res = await axios({
      method: "POST",
      url: endpoint,
      data: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }
    })
    const attachment = res.data
    return attachment
  } catch (err) {
    _("[submitTaskAttachment][ERR]", err.message)
    return null
  }
}

/**
 * Submit form files to task id
 * @param taskId
 * @param formData
 * @return formData
 */
export const loopSubmitFormFilesToTaskId = (taskId, formData) => {
  /* Updated formData */
  return formData
}

/**
 * Submit Task & Attachment
 * by start a process
 * @param restUrl
 * @param processId
 * @param data
 * @return {Promise.<null>}
 */
export const submit = async (restUrl, processId, data) => {
  const postData = transformFormDataToCamundaData(data)

  try {
    /* 1. Submit Task */
    const taskBrief = await submitTask(restUrl, processId, postData)
    const { id: taskId } = taskBrief

    /* 2. Submit attachment based on task id */

    /* 3. Update task with new attachment URL */

    return udpatedTaskBrief
  } catch (err) {
    _("[submit][ERR]", err.message)
    return null
  }
}
