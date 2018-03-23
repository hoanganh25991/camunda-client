import { submitTaskAttachment } from "../camundaIntegrate"
import fs from "fs"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Submit Task attachment"
  let pass = true

  try {
    _(`\x1b[43m[INFO]\x1b[0m Please test this feature in client folder`)
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
