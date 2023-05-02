export interface Facility{
  name: string;
  outPatient: boolean;
  address: string;
  phone: string;
  facility: string;
  persistantAppt: string;
  homeServices: string;
  apptRequired: string;
  additionalService?: string;
  distance: Distance
}

interface Distance {
  text: string;
  value?: number;
}
