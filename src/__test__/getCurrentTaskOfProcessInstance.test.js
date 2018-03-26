import { getCurrentTaskOfProcessInstance } from "../camundaIntegrate"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Get Form Key"
  const restUrl = "http://localhost:8080/engine-rest"
  const processInstanceId = "d8f15dbb-3094-11e8-ac15-e09d312afda0"
  let pass = true

  try {
    const task = await getCurrentTaskOfProcessInstance(restUrl, processInstanceId)
    _("[task]", task)
    pass = task.id === "d8f52e53-3094-11e8-ac15-e09d312afda0"
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
