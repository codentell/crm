
import { generateSales } from './sales';
import { generateTags } from './tags';
import { generateCompanies } from './companies';
import { generateContacts } from './contacts';
import { generateContactNotes } from './contactNotes';
import { generateTasks } from './tasks';
import { generateDeals } from './deals';
import { generateDealNotes } from './dealNotes';
import { finalize } from './finalize';
import { randomDate } from './utils';
import  { companyData }  from './company';
import {  random } from 'faker/locale/en_US';

console.log(companyData);
const sizes = [1, 10, 50, 250, 500];

const test = Array.from(Array(companyData.length).keys()).map(id => { 
    return {
        id,
        name: companyData[id]["Manufacturer"],
        logo: `/logos/${id}.png`,
        sector: companyData[id]["Manufacturer Locations"],
        size: random.arrayElement(sizes),
        linkedIn: `https://www.linkedin.com/company/${name
            .toLowerCase()}`,
        website: "",
        phone_number: "",
        address: "",
        zipcode: "",
        city: "",
        stateAbbr: "",
        nb_contacts: 0,
        nb_deals: 0,
        sales_id: 0,
        created_at: randomDate().toISOString(),
    }
});

console.log(test);

const d = [
    
    {
    id: 0,
    name: name,
    logo: `/logos/${0}.png`,
    sector: "1",
    size: "2",
    linkedIn: `https://www.linkedin.com/company/${name
        .toLowerCase()}`,
    website: "",
    phone_number: "",
    address: "",
    zipcode: "",
    city: "",
    stateAbbr: "",
    nb_contacts: 0,
    nb_deals: 0,
    sales_id: 0,
    created_at: randomDate().toISOString(),
}];



export default () => {
    const db = {} ;
    db.sales = generateSales(db);
    db.tags = generateTags(db);
    db.companies = test;
    db.contacts = generateContacts(db);
    db.contactNotes = generateContactNotes(db);
    db.deals = generateDeals(db);
    db.dealNotes = generateDealNotes(db);
    db.tasks = generateTasks(db);
    finalize(db);
    console.log(db);

    return db;
};
