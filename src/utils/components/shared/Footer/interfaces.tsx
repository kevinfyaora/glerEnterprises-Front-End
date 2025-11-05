export interface Address {
    addressLine1: string;
    addressLine2: string;
    postcode: string;
    townBorough: string;
    city: string;
    buildingNumber: string;
}
export interface account {
    accountType: "personal" | "business";
    homeAddress: Address;
    registerAddress: Address;
    businessAddress: Address;
    billingAddress: Address;
    personalInformation: personalInformation;
    businessInformation: businessInformation;
    bankDetails: bankDetails;
    paymentDetails: paymentDetails;
    identityVerification: identityVerification;
    certification: certification;
}
export interface personalInformation {
    title: string;
    firstName: string;
    middleName: string;
    surname: string;
    dateOfBirth: string;
    ethnicity: string;
    nationality: string;
    gender: string;
}
export interface businessInformation {
    UTRNumber: string;
    VATNumber: string;
}
export interface paymentDetails {
    country: string;
    companyInformation: string;
    businessName: string;
}
export interface bankDetails {
    bankName: string;
    accountNumber: string;
    sortCode: string;
    fullNameOnCard: string;
}
export interface paymentDetails {
    bankName: string;
    fullNameOnCard: string;
    cardNumber: string;
    expiryDate: string;
    securityCode: string;
}
export interface identityVerification {
    verificationType: "nationalId" | "drivingLicense" | "passport";
    pictureOfDocument: string;
    issuingCountry: string;
    expiryDate: string;
    selfiePicture: string;
}
export interface certification {
    shareCode: string;
    status: string;
    documentFile: string;
    insuranceNumber: string;
    insuranceProvider: string;
    insuranceFile: string;
    DBSNumber: string;
    DBSFile: string;
    dateOfIssue: string;
}
