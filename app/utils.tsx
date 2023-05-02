enum Facility {
  "OutWound" = "OutPatient office / Wound Care Center",
  "Hospital" = "Hospital Ambulatory Area / Clinic",
  "NonClinic" = "Non-clinic / Home Health resource",
}

enum HomeServices {
  "noClinic" = "No, Clinic only",
  "homeHealth" = "Yes, Home Health",
  "teleHealth" = "Yes, Telehealth",
}
export const data = [
  {
    name: "Advocate Aurora",
    outPatient: true,
    address: "450 W. Highway22, Barrington IL",
    phone: "847-842-4372",
    facility: Facility.OutWound, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: null
  },
  {
    name: "Advocate Good Samaritan",
    outPatient: false,
    address: "3815 Highland Ave, Downers Grove IL",
    phone: "630-275-4303",
    facility: Facility.Hospital, 
    persistantAppt: "No",
    homeServices: HomeServices.noClinic,
    apptRequired: "A recent ostomy surgery at this location & a physician with privileges at this facility/location",
    additionalService: "Accepts supply donations" 
  },
  {
    name: "Advocate Lutheran General",
    outPatient: true,
    address: "1775 Dempster st. Park Ridge IL",
    phone: "847-723-8815",
    facility: Facility.Hospital, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: "Accepts supply donations" 
  },
  {
    name: "Advocate Aurora",
    outPatient: true,
    address: "450 W. Highway22, Barrington IL",
    phone: "847-842-4372",
    facility: Facility.OutWound, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: null
  },
  {
    name: "Advocate Good Samaritan",
    outPatient: false,
    address: "3815 Highland Ave, Downers Grove IL",
    phone: "630-275-4303",
    facility: Facility.Hospital, 
    persistantAppt: "No",
    homeServices: HomeServices.noClinic,
    apptRequired: "A recent ostomy surgery at this location & a physician with privileges at this facility/location",
    additionalService: "Accepts supply donations" 
  },
  {
    name: "Advocate Lutheran General",
    outPatient: true,
    address: "1775 Dempster st. Park Ridge IL",
    phone: "847-723-8815",
    facility: Facility.Hospital, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: "Accepts supply donations" 
  },
  {
    name: "Advocate Aurora",
    outPatient: true,
    address: "450 W. Highway22, Barrington IL",
    phone: "847-842-4372",
    facility: Facility.OutWound, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: null
  },
  {
    name: "Advocate Good Samaritan",
    outPatient: false,
    address: "3815 Highland Ave, Downers Grove IL",
    phone: "630-275-4303",
    facility: Facility.Hospital, 
    persistantAppt: "No",
    homeServices: HomeServices.noClinic,
    apptRequired: "A recent ostomy surgery at this location & a physician with privileges at this facility/location",
    additionalService: "Accepts supply donations" 
  },
  {
    name: "Advocate Lutheran General",
    outPatient: true,
    address: "1775 Dempster st. Park Ridge IL",
    phone: "847-723-8815",
    facility: Facility.Hospital, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: "Accepts supply donations" 
  },
  {
    name: "Advocate Aurora",
    outPatient: true,
    address: "450 W. Highway22, Barrington IL",
    phone: "847-842-4372",
    facility: Facility.OutWound, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: null
  },
  {
    name: "Advocate Good Samaritan",
    outPatient: false,
    address: "3815 Highland Ave, Downers Grove IL",
    phone: "630-275-4303",
    facility: Facility.Hospital, 
    persistantAppt: "No",
    homeServices: HomeServices.noClinic,
    apptRequired: "A recent ostomy surgery at this location & a physician with privileges at this facility/location",
    additionalService: "Accepts supply donations" 
  },
  {
    name: "Advocate Lutheran General",
    outPatient: true,
    address: "1775 Dempster st. Park Ridge IL",
    phone: "847-723-8815",
    facility: Facility.Hospital, 
    persistantAppt: "Yes",
    homeServices: HomeServices.noClinic,
    apptRequired: "Physician Order",
    additionalService: "Accepts supply donations" 
  },
]
