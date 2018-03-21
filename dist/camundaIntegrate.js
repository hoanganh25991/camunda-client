"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})
exports.getTaskList = exports.validTaskFiltersFormat = exports.getTaskInfo = exports.transformCamundaDataToFormData = exports.submit = exports.transformFormDataToCamundaData = exports.getTaskFiltersEndpoint = exports.getTaskInfoEndpoint = exports.getStartProcessEndpoint = undefined

var _axios = require("axios")

var _axios2 = _interopRequireDefault(_axios)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments)
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }
        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value)
            },
            function(err) {
              step("throw", err)
            }
          )
        }
      }
      return step("next")
    })
  }
}

// Fetch by axios
const axios = _axios2.default.create({
  headers: { "Access-Control-Allow-Origin": "*" },
  timeout: 6000
})
const _ = console.log
const ACCEPTED_OPERATORS = ["eq", "neq", "gt", "gteq", "lt", "lteq", "like"]

// REST endpoints
const getStartProcessEndpoint = (exports.getStartProcessEndpoint = (restUrl, processId) =>
  `${restUrl}/process-definition/${processId}/submit-form`)
const getTaskInfoEndpoint = (exports.getTaskInfoEndpoint = (restUrl, taskId) =>
  `${restUrl}/task/${taskId}/form-variables`)
const getTaskFiltersEndpoint = (exports.getTaskFiltersEndpoint = restUrl => `${restUrl}/task`)

/**
 * Transform Form data to Camunda data shape
 * @param data
 * @return {{variables: *}}
 */
const transformFormDataToCamundaData = (exports.transformFormDataToCamundaData = data => {
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
})

/**
 * Submit to create Camunda Task
 * by start a process
 * @param restUrl
 * @param processId
 * @param data
 * @return {Promise.<null>}
 */
const submit = (exports.submit = (() => {
  var _ref = _asyncToGenerator(function*(restUrl, processId, data) {
    const endpoint = getStartProcessEndpoint(restUrl, processId)
    const postData = transformFormDataToCamundaData(data)
    _("[endpoint, postData]", endpoint, postData)

    try {
      const res = yield axios({
        method: "POST",
        url: endpoint,
        data: postData
      })
      return res.data
    } catch (err) {
      _("[submit][ERR]", err.message)
      return null
    }
  })

  return function submit(_x, _x2, _x3) {
    return _ref.apply(this, arguments)
  }
})())

/**
 * Transform Camunda data to Form data
 * @param camundaData
 * @return {*}
 */
const transformCamundaDataToFormData = (exports.transformCamundaDataToFormData = camundaData => {
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
})

/**
 * Get Task Info
 * @param restUrl
 * @param taskId
 * @return {Promise.<null>}
 */
const getTaskInfo = (exports.getTaskInfo = (() => {
  var _ref2 = _asyncToGenerator(function*(restUrl, taskId) {
    const endpoint = getTaskInfoEndpoint(restUrl, taskId)

    try {
      const res = yield axios.get(endpoint)
      const taskVariables = res.data
      return transformCamundaDataToFormData(taskVariables)
    } catch (err) {
      _("[getTaskInfo][ERR]", err.message)
      return null
    }
  })

  return function getTaskInfo(_x4, _x5) {
    return _ref2.apply(this, arguments)
  }
})())

/**
 * Check if Task's filters in right format
 * @see getTaskList
 * @param filters
 * @return boolean
 */
const validTaskFiltersFormat = (exports.validTaskFiltersFormat = filters => {
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
})

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
const getTaskList = (exports.getTaskList = (() => {
  var _ref3 = _asyncToGenerator(function*(restUrl, { processId, filters, sorting }) {
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
      const res = yield axios({
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
  })

  return function getTaskList(_x6, _x7) {
    return _ref3.apply(this, arguments)
  }
})())
