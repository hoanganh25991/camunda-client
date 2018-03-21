import { transformFormDataToCamundaData } from "../camundaIntegrate"

const _ = console.log
const infoTestStatus = (pass, testCase) =>
  pass ? _(`\x1b[42m[PASS]\x1b[0m ${testCase}`) : _(`\x1b[41m[FAIL]\x1b[0m ${testCase}`)

// Run test
;(async () => {
  const TEST_CASE = "Transform Form data > Camunda data"
  let pass = true

  try {
    const formData = {
      department: "technologyBusinessDevelopment",
      category: "salesContract",
      subCategory: "moreThan24MillionYen430MillionVndPerCase",
      tab: "checklist",
      grandToal: 0,
      grandTotalCurrency: "$",
      refTotalCurrency: "$",
      acttachment: [],
      cancel: false,
      employeeId: "fgh@sdfsdf.vn",
      employeeName: "",
      dueDate: "2018-03-22T02:36:45.000Z",
      subject: "hjghjgh",
      companyCode: "",
      termsFrom: "2018-03-15T02:36:45.000Z",
      companyName: "",
      termsTo: "2018-03-15T02:36:45.000Z",
      refTotal: "",
      objective: "",
      scopOfWork: "",
      responsibilityOfOurCompany: "",
      responsibilityOfTheParty: "",
      responsibilityOfSubcontractors: "",
      indemnification: "",
      renewals: "",
      termination: "",
      notes: "",
      referenceProposal: "",
      referencePurchase: "",
      referenceLegalCheck: "",
      alertChecklist: {
        approvalAfterTheTransaction: false,
        theScopeOfWorksAreNotClarified: false,
        thereIsNoProvisionOfSettingASpecificationDocuments: false,
        inCaseOfProvidingServiceImpossibleSlaOrKpiIsEnacted: true,
        thereIsNoProvisionOfSettingACriteriaOnAcceptanceInspection: false,
        inCaseOfServiceDealingWithConfidentialInformationOrPersonalInformationThereIsNoGuidelineOrRules: false,
        intellectualPropertyRightIsNotBelongingToTciOrTheTciGroup: true,
        theTermOfTheLiabilityForDefectWarrantyIsMoreThan6Months: false,
        thereIsNoLimitationOnLiabilityForDamages: false,
        thereIsAProvisionForAPenaltyWhichIsMoreThanTheTotalAmountOfAConsideration: false,
        thereIsNoProvisionForTheChangingProcessAndNoReasonsForNoProvisionOfIt: false,
        thereIsNoRightOfTermination: false,
        thereIsTheProvisionOfNonCompetition: false,
        other: false
      },
      comment: ""
    }

    const camundaData = transformFormDataToCamundaData(formData)
    const expectedVal =
      '{"variables":{"department":{"value":"technologyBusinessDevelopment","type":"String","valueInfo":{}},"category":{"value":"salesContract","type":"String","valueInfo":{}},"subCategory":{"value":"moreThan24MillionYen430MillionVndPerCase","type":"String","valueInfo":{}},"tab":{"value":"checklist","type":"String","valueInfo":{}},"grandToal":{"value":"0","type":"String","valueInfo":{}},"grandTotalCurrency":{"value":"$","type":"String","valueInfo":{}},"refTotalCurrency":{"value":"$","type":"String","valueInfo":{}},"acttachment":{"value":"[]","type":"String","valueInfo":{}},"cancel":{"value":"false","type":"String","valueInfo":{}},"employeeId":{"value":"fgh@sdfsdf.vn","type":"String","valueInfo":{}},"employeeName":{"value":"","type":"String","valueInfo":{}},"dueDate":{"value":"2018-03-22T02:36:45.000Z","type":"String","valueInfo":{}},"subject":{"value":"hjghjgh","type":"String","valueInfo":{}},"companyCode":{"value":"","type":"String","valueInfo":{}},"termsFrom":{"value":"2018-03-15T02:36:45.000Z","type":"String","valueInfo":{}},"companyName":{"value":"","type":"String","valueInfo":{}},"termsTo":{"value":"2018-03-15T02:36:45.000Z","type":"String","valueInfo":{}},"refTotal":{"value":"","type":"String","valueInfo":{}},"objective":{"value":"","type":"String","valueInfo":{}},"scopOfWork":{"value":"","type":"String","valueInfo":{}},"responsibilityOfOurCompany":{"value":"","type":"String","valueInfo":{}},"responsibilityOfTheParty":{"value":"","type":"String","valueInfo":{}},"responsibilityOfSubcontractors":{"value":"","type":"String","valueInfo":{}},"indemnification":{"value":"","type":"String","valueInfo":{}},"renewals":{"value":"","type":"String","valueInfo":{}},"termination":{"value":"","type":"String","valueInfo":{}},"notes":{"value":"","type":"String","valueInfo":{}},"referenceProposal":{"value":"","type":"String","valueInfo":{}},"referencePurchase":{"value":"","type":"String","valueInfo":{}},"referenceLegalCheck":{"value":"","type":"String","valueInfo":{}},"alertChecklist":{"value":"{\\"approvalAfterTheTransaction\\":false,\\"theScopeOfWorksAreNotClarified\\":false,\\"thereIsNoProvisionOfSettingASpecificationDocuments\\":false,\\"inCaseOfProvidingServiceImpossibleSlaOrKpiIsEnacted\\":true,\\"thereIsNoProvisionOfSettingACriteriaOnAcceptanceInspection\\":false,\\"inCaseOfServiceDealingWithConfidentialInformationOrPersonalInformationThereIsNoGuidelineOrRules\\":false,\\"intellectualPropertyRightIsNotBelongingToTciOrTheTciGroup\\":true,\\"theTermOfTheLiabilityForDefectWarrantyIsMoreThan6Months\\":false,\\"thereIsNoLimitationOnLiabilityForDamages\\":false,\\"thereIsAProvisionForAPenaltyWhichIsMoreThanTheTotalAmountOfAConsideration\\":false,\\"thereIsNoProvisionForTheChangingProcessAndNoReasonsForNoProvisionOfIt\\":false,\\"thereIsNoRightOfTermination\\":false,\\"thereIsTheProvisionOfNonCompetition\\":false,\\"other\\":false}","type":"String","valueInfo":{}},"comment":{"value":"","type":"String","valueInfo":{}}}}'
    pass = expectedVal === JSON.stringify(camundaData)
  } catch (err) {
    _(`[${TEST_CASE}][ERR]`, err.message)
    pass = false
  } finally {
    infoTestStatus(pass, TEST_CASE)
  }
})()
