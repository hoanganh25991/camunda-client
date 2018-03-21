import { getTaskInfo } from "../camundaIntegrate"

const _ = console.log
const restUrl = "http://localhost:8080/engine-rest"
const taskId = "e75af187-271a-11e8-afab-e09d312afda0"
;(async () => {
  const taskInfo = await getTaskInfo(restUrl, taskId)
  _("[taskInfo]", taskInfo)
})()
