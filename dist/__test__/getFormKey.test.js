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
  const TEST_CASE = "Get Form Key"
  const restUrl = "http://localhost:8080/engine-rest"
  const taskId = "37263cc0-2cb7-11e8-9f17-e09d312afda0"
  let pass = true

  try {
    const formKey = yield (0, _camundaIntegrate.getFormKey)(restUrl, taskId)
    _("[formKey]", formKey)
    pass = formKey === "embedded:app:forms/start-form.html"
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
