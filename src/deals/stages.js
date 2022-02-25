export const stages = [
    'new-opportunity',
    'team-assessment',
    'tech-transfer',
    'proposal',
    'bid',
    'contract',
];

export const stageNames = {
    'new-opportunity': 'New Opportunity',
    'team-assessment': 'Team Assessment',
    'tech-transfer': 'Tech Transfer',
    proposal: 'Proposal',
    bid: 'Bid',
    contract: 'Contract',
};

export const stageChoices = stages.map(type => ({
    id: type,
    /* @ts-ignore */
    name: stageNames[type],
}));
