import { companyData } from '../dataGenerator/company'

const location = ([...new Set(companyData.map((data) => data["Manufacturer Locations"]))])
export const sectors = location.map(sector => ({ id: sector, name: sector }));

