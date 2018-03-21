import Oaxios from "axios"

const axios = Oaxios.create({
  timeout: 6000
})

const _ = console.log

export const transform = data => {
  // Sanity check
  const isObj = typeof data === "object"
  if (!isObj) {
    throw new Error("Please submit data obj")
  }

  // Do transform
  const variables = Object.keys(data).reduce((carry, key) => {
    const _val = data[key]
    const isStr = typeof _val === "string"
    const val = isStr ? _val : JSON.stringify(_val)
    const valObj = {
      value: val,
      type: "String",
      valueInfo: {}
    }
    carry[key] = valObj
    return carry
  }, {})

  return { variables }
}

export const getTaskVariablesEndpoint = (restUrl, taskId) => `${restUrl}/task/${taskId}/form-variables`

export const submit = async (restUrl, taskId, data) => {
  const endpoint = getTaskVariablesEndpoint(restUrl, taskId)
  console.log("[endpoint]", endpoint)

  try {
    const res = await axios({
      method: "GET",
      url: endpoint,
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    const data = res.data
    _("[data]", data)
  } catch (err) {
    console.log("[submit][ERR]", err.message)
    return null
  }
}
