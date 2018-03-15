import Oaxios from "axios"

const axios = Oaxios.create({
  timeout: 6000
})

export const transform = data => {
	// Sanity check
	const isObj = typeof data === "object"
	if(!isObj) {
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

  return {variables}
}

export const getStartProcessEndpoint = (restUrl, processId) => `${restUrl}/process-definition/${processId}/submit-form`

export const submit = async (restUrl, processId, data) => {

  const endpoint = getStartProcessEndpoint(restUrl, processId)
  const postData = transform(data)
  console.log("[endpoint, postData]", endpoint, postData)

  try{
    const res = await axios.post(endpoint, postData)
    return res.data
  }catch(err){
    console.log("[submit][ERR]", err.message)
    return null
  }
}

