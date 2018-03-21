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
  const TEST_CASE = "Transform Camunda data > Form data"
  let pass = true

  try {
    const camundaData = {
      amount: {
        type: "Double",
        value: 30,
        valueInfo: {}
      },
      approverGroups: {
        type: "Object",
        value: ["accounting", "sales"],
        valueInfo: {
          objectTypeName: "java.util.ArrayList",
          serializationDataFormat: "application/x-java-serialized-object"
        }
      },
      invoiceNumber: {
        type: "String",
        value: "GPFE-23232323",
        valueInfo: {}
      },
      invoiceDocument: {
        type: "File",
        value: null,
        valueInfo: {
          filename: "invoice.pdf",
          mimeType: "application/pdf"
        }
      },
      creditor: {
        type: "String",
        value: "Great Pizza for Everyone Inc.",
        valueInfo: {}
      },
      invoiceCategory: {
        type: "String",
        value: "Travel Expenses",
        valueInfo: {}
      }
    }

    const formData = (0, _camundaIntegrate.transformCamundaDataToFormData)(camundaData)
    const expectedVal =
      '{"amount":30,"approverGroups":["accounting","sales"],"invoiceNumber":"GPFE-23232323","invoiceDocument":null,"creditor":"Great Pizza for Everyone Inc.","invoiceCategory":"Travel Expenses"}'
    pass = expectedVal === JSON.stringify(formData)
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
