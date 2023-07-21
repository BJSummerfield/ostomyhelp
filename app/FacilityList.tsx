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
      <div className="flex flex-row gap-4 pt-1">
        <div className="font-semibold">{header}:</div>
        <div>{value}</div> 
      </div>
    </>
  )
}

export default function FacilityList({ facility }: FacilityListProps) {
  const formattedAddress = facility.address.replace(/ /g, '+');
  const mapsUrl = `https://www.google.com/maps?q=${formattedAddress}`;

  return (
    <div className="bg-white overflow-hidden shadow-xl rounded-lg mx-3">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl leading-6 font-medium text-gray-900">{facility.name}</h3>
            <div className="pt-1 max-w-xl text-sm text-gray-500">
              <a href={mapsUrl} target="_blank" className="text-blue-500 underline visited:text-purple-500">
                {facility.address}
              </a>
              <p>
                <a href={`tel:${facility.phone}`} className="text-blue-500 hover:text-indigo-900">
                  {facility.phone}
                </a>
              </p>
              <p>{facility.distance.text}</p>
            </div>
            <br />
            <InfoItem header={"Facility type"} value={facility.facility} />
            <InfoItem header={"Additional Services"} value={facility.additionalService || "N/A"} />
          </div>
          <div>
            <h3 className="text-xl leading-6 font-medium py-5 md:py-0 text-gray-900">Appointments types available</h3>
            <InfoItem header={"Clinic"} value={facility.clinic ? 'Yes' : 'No'} />
            <InfoItem header={"Home Care"} value={facility.homeCare ? 'Yes' : 'No'} />
            <InfoItem header={"Tele-Health"} value={facility.homeServices? 'Yes' : 'No'} />
            <br />
            <InfoItem header={"Appointment Requirements"} value={facility.apptRequired} />
          </div>
        </div>
      </div>
    </div>
  )
}
