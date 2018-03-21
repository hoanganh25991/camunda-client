import { submit } from "../camundaIntegrate"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Start Process to create task"
  const restUrl = "http://localhost:8080/engine-rest"
  const processId = "ExternalJsExample:1:fe933194-2756-11e8-a306-0a0027000004"
  const data = { jsonString: '{"q":12345}' }
  let pass = true

  try {
    const resData = await submit(restUrl, processId, data)
    _("[resData]", resData)

    pass = !!resData
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
