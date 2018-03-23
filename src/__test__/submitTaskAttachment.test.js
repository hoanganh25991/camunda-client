import { submitTaskAttachment } from "../camundaIntegrate"
import attachmentInfo from "./attachmentInfo.json"
import fs from "fs"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Submit Task attachment"
  const restUrl = "http://localhost:8080/engine-rest"
  const taskId = "112e6ba8-2cce-11e8-8903-e09d312afda0"
  const attachmentInfo = {
    attachmentName: "test.xlsx",
    attachmentDescription: "ac",
    attachmentType: "application/xxx",
    documentType: "receipt"
  }
  let pass = true

  try {
    const filePath = `${__dirname}/attachmentFile.txt`
    const fileStream = fs.createReadStream(filePath)
    const attachment = await submitTaskAttachment(restUrl, { taskId, attachmentInfo, file: fileStream })
    _("[attachment]", attachment)
    pass = attachment
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
