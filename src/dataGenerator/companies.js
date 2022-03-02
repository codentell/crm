import { company, internet, address, phone, random } from 'faker/locale/en_US';
import { randomDate } from './utils';
import { companyData } from './company'


const sectors = [
    'Communication Services',
    'Consumer Discretionary',
    'Consumer Staples',
    'Energy',
    'Financials',
    'Health Care',
    'Industrials',
    'Information Technology',
    'Materials',
    'Real Estate',
    'Utilities',
];

const sizes = [1, 10, 50, 250, 500];

const regex = /\W+/;



export const generateCompanies = (db) => {
    return Array.from(Array(55).keys()).map(id => {
        const name = companyData[0]["Manufacturer"];
        return {
            id,
            name: name,
            logo: `/logos/${id}.png`,
            sector: random.arrayElement(sectors),
            size: random.arrayElement(sizes),
            linkedIn: `https://www.linkedin.com/company/${name
                .toLowerCase()
                .replace(regex, '_')}`,
            website: internet.url(),
            location: companyData[id]["Manufacturer"],
            phone_number: phone.phoneNumber(),
            address: address.streetAddress(),
            zipcode: address.zipCode(),
            city: address.city(),
            stateAbbr: address.stateAbbr(),
            nb_contacts: 0,
            nb_deals: 0,
            // at least 1/3rd of companies for Jane Doe
            sales_id:
                random.number(2) === 0 ? 0 : random.arrayElement(db.sales).id,
            created_at: randomDate().toISOString(),
        };
    });
};
