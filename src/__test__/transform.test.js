import { transformFormDataToCamundaData } from "../camundaIntegrate"

const data = { name: "anh", age: 25 }
const dataVariables = transformFormDataToCamundaData(data)
console.log(dataVariables)

const data2 = {
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
console.log(transformFormDataToCamundaData(data2))
