"use strict"

var _camundaIntegrate = require("../camundaIntegrate")

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

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
_asyncToGenerator(function*() {
  const TEST_CASE = "Get Task List"
  const restUrl = "http://localhost:8080/engine-rest"
  const processId = "invoice:3:3580f10a-2cb7-11e8-9f17-e09d312afda0"
  const filters = [{ name: "invoiceNumber", value: "BOS%", operator: "like" }]
  let pass = true

  try {
    const resData = yield (0, _camundaIntegrate.getTaskList)(restUrl, { processId, filters })
    _("[resData]", resData)
    pass = Array.isArray(resData) && !!resData
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
