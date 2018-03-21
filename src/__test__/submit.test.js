import { submit } from "../camundaIntegrate"

const restUrl = "http://localhost:8080/engine-rest"
const processId = "ExternalJsExample:1:fe933194-2756-11e8-a306-0a0027000004"
const data = { jsonString: '{"q":12345}' } // Test go here
;(async () => {
  const resData = await submit(restUrl, processId, data)
  console.log("[resData]", resData)
})()
