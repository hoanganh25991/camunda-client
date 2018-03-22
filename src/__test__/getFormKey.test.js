import { getFormKey } from "../camundaIntegrate"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Get Form Key"
  const restUrl = "http://localhost:8080/engine-rest"
  const taskId = "37263cc0-2cb7-11e8-9f17-e09d312afda0"
  let pass = true

  try {
    const formKey = await getFormKey(restUrl, taskId)
    _("[formKey]", formKey)
    pass = formKey === "embedded:app:forms/start-form.html"
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
