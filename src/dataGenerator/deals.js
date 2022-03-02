import { random, lorem } from 'faker/locale/en_US';
import { add } from 'date-fns';
import { randomDate } from './utils';
import  { companyData } from './company';


const type = [
    'Other',
    'Copywriting',
    'Print project',
    'UI Design',
    'Website design',
];
const stages = [
    'new-opportunity',
    'team-assessment',
    'tech-transfer',
    'proposal',
    'bid',
    'contract',
];
//const tags = ["new deal", "upsell", "SAV"];



export const generateDeals = (db) => {
    const deals = Array.from(Array(10).keys()).map((id,index) => {
        const company = random.arrayElement(db.companies);
        console.log("Deals")
        console.log(company);
        company.nb_deals++;
        const contacts = random.arrayElements(
            db.contacts.filter(contact => contact.company_id === company.id),
            random.number({ min: 1, max: 3 })
        );
        const lowercaseName = lorem.words();
        const created_at = randomDate(
            new Date(company.created_at)
        ).toISOString();
        return {
            id,
            name: companyData[index]["Manufacturer"],
            company_id: company.id,
            contact_ids: contacts.map(contact => contact.id),
            type: companyData[index]["Manufacturer Type"],
            stage: random.arrayElement(stages),
            description: `Manufacturer Type : ${companyData[index]["Manufacturer Type"]}, Founded: ${companyData[index]["Founded"]}`,
            amount: "",
            created_at: created_at,
            updated_at: randomDate(new Date(created_at)).toISOString(),
            start_at: randomDate(
                new Date(),
                add(new Date(), { months: 6 })
            ).toISOString(),
            sales_id: company.sales_id,
            index: 0,
            nb_notes: 0,
        };
    });
    // compute index based on stage
    stages.forEach(stage => {
        deals
            .filter(deal => deal.stage === stage)
            .forEach((deal, index) => {
                deals[deal.id].index = index;
            });
    });
    return deals;
};
