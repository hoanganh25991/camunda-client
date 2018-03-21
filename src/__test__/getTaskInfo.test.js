import { getTaskInfo } from "../camundaIntegrate"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Get Task Info"
  const restUrl = "http://localhost:8080/engine-rest"
  const taskId = "e75af187-271a-11e8-afab-e09d312afda0"
  let pass = true

  try {
    await getTaskInfo(restUrl, taskId)
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
