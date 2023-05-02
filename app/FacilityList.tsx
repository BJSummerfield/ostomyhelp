import { Facility } from "./types";

interface InfoItemProps {
  header: string;
  value: string;
}

interface FacilityListProps {
  facility: Facility
}
const InfoItem = ({ header, value }: InfoItemProps) => {
  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="font-semibold mt-2">{header}:</div>
        <div className="mt-2">{value}</div>
      </div>
    </>
  )
}

export default function FacilityList({ facility }: FacilityListProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl leading-6 font-medium text-gray-900">{facility.name}</h3>
            <div className="mt-1 max-w-xl text-sm text-gray-500">
              <p>{facility.address}</p>
              <p>{facility.phone}</p>
              <p>{facility.distance.text}</p>
            </div>
            {/* Add the image below the outpatient information here */}
          </div>
          <div>
            <InfoItem header={"Facility"} value={facility.facility} />
            <InfoItem header={"Outpatient"} value={facility.outPatient ? 'Yes' : 'No'} />
            <InfoItem header={"Persistent Appointment"} value={facility.persistantAppt} />
            <InfoItem header={"Home Services"} value={facility.homeServices} />
            <InfoItem header={"Appointment Requirements"} value={facility.apptRequired} />
            <InfoItem header={"Additional Services"} value={facility.additionalService || "N/A"} />
          </div>
        </div>
      </div>
    </div>
  )
}
