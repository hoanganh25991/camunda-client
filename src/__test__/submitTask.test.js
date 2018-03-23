import { submitTask } from "../camundaIntegrate"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Start Process to create task"
  const restUrl = "http://localhost:8080/engine-rest"
  const processId = "Process_1:1:358277ac-2cb7-11e8-9f17-e09d312afda0"
  const data = { variables: { jsonString: '{"q":12345}' } }
  let pass = true

  try {
    const resData = await submitTask(restUrl, processId, data)
    _("[resData]", resData)

    pass = !!resData
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
