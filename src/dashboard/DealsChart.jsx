import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useGetList } from 'react-admin';
import { startOfMonth, format } from 'date-fns';
import { ResponsiveBar } from '@nivo/bar';

//import { Deal } from '../types';

const multiplier = {
    'new-opportunity': 0.2,
    'team-assessment': 0.5,
    'tech-transfer': 0.8,
    delayed: 0.3,
};

export const DealsChart = () => {
    const { data, ids, loaded } = useGetList(
        'deals',
        { perPage: 100, page: 1 },
        {
            field: 'start_at',
            order: 'ASC',
        }
    );
    const [months, setMonths] = useState([]);

    useEffect(() => {
        const deals = ids.map(id => data[id]);

        const dealsByMonth = deals.reduce((acc, deal) => {
            const month = startOfMonth(new Date(deal.start_at)).toISOString();
            if (!acc[month]) {
                acc[month] = [];
            }
            acc[month].push(deal);
            return acc;
        }, {} );

        const amountByMonth = Object.keys(dealsByMonth).map(month => {
            return {
                date: format(new Date(month), 'MMM'),
                proposal: dealsByMonth[month]
                    .filter((deal) => deal.stage === 'proposal')
                    .reduce((acc, deal) => {
                        acc += deal.amount;
                        return acc;
                    }, 0),
                pending: dealsByMonth[month]
                    .filter(
                        (deal) => !['proposal', 'bid'].includes(deal.stage)
                    )
                    .reduce((acc, deal) => {
                     
                        acc += deal.amount * multiplier[deal.stage];
                        return acc;
                    }, 0),
                bid: dealsByMonth[month]
                    .filter((deal) => deal.stage === 'bid')
                    .reduce((acc, deal) => {
                        acc -= deal.amount;
                        return acc;
                    }, 0),
            };
        });

        setMonths(amountByMonth);
    }, [ids, data]);

    if (!loaded) return null; // FIXME return skeleton instead

    const range = months.reduce(
        (acc, month) => {
            acc.min = Math.min(acc.min, month.bid);
            acc.max = Math.max(acc.max, month.proposal + month.pending);
            return acc;
        },
        { min: 0, max: 0 }
    );

    return (
        <>
            <Box display="flex" alignItems="center">
                <Box ml={2} mr={2} display="flex">
                    <AttachMoneyIcon color="disabled" fontSize="large" />
                </Box>
                <Link
                    underline="none"
                    variant="h5"
                    color="textSecondary"
                    component={RouterLink}
                    to="/deals"
                >
                    Upcoming Deal Revenue
                </Link>
            </Box>
            <Box height={500}>
                <ResponsiveBar
                    data={months}
                    indexBy="date"
                    keys={['', 'pending', 'bid']}
                    colors={['#61cdbb', '#97e3d5', '#e25c3b']}
                    margin={{ top: 50, right: 50, bottom: 50, left: 0 }}
                    padding={0.3}
                    valueScale={{
                        type: 'linear',
                        min: range.min * 1.2,
                        max: range.max * 1.2,
                    }}
                    indexScale={{ type: 'band', round: true }}
                    enableGridX={true}
                    enableGridY={false}
                    enableLabel={false}
                    axisTop={{
                        tickSize: 0,
                        tickPadding: 12,
                    }}
                    axisBottom={{
                        legendPosition: 'middle',
                        legendOffset: 50,
                        tickSize: 0,
                        tickPadding: 12,
                    }}
                    axisLeft={null}
                    axisRight={{
                        format: (v) => `${Math.abs(v / 1000)}k`,
                        tickValues: 8,
                    }}
                    markers={
                        [
                            {
                                axis: 'y',
                                value: 0,
                                lineStyle: { strokeOpacity: 0 },
                                textStyle: { fill: '#2ebca6' },
                                legend: 'Proposal',
                                legendPosition: 'top-left',
                                legendOrientation: 'vertical',
                            },
                            {
                                axis: 'y',
                                value: 0,
                                lineStyle: {
                                    stroke: '#f47560',
                                    strokeWidth: 1,
                                },
                                textStyle: { fill: '#e25c3b' },
                                legend: 'Bid',
                                legendPosition: 'bottom-left',
                                legendOrientation: 'vertical',
                            },
                        ] 
                    }
                />
            </Box>
        </>
    );
};
