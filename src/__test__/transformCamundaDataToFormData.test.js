import { transformCamundaDataToFormData } from "../camundaIntegrate"

const camundaData = {
  amount: {
    type: "Double",
    value: 30,
    valueInfo: {}
  },
  approverGroups: {
    type: "Object",
    value: ["accounting", "sales"],
    valueInfo: {
      objectTypeName: "java.util.ArrayList",
      serializationDataFormat: "application/x-java-serialized-object"
    }
  },
  invoiceNumber: {
    type: "String",
    value: "GPFE-23232323",
    valueInfo: {}
  },
  invoiceDocument: {
    type: "File",
    value: null,
    valueInfo: {
      filename: "invoice.pdf",
      mimeType: "application/pdf"
    }
  },
  creditor: {
    type: "String",
    value: "Great Pizza for Everyone Inc.",
    valueInfo: {}
  },
  invoiceCategory: {
    type: "String",
    value: "Travel Expenses",
    valueInfo: {}
  }
}

console.log(transformCamundaDataToFormData(camundaData))
