
import * as React from 'react';
import {
    FilterList,
    FilterLiveSearch,
    FilterListItem,
    useGetIdentity,
} from 'react-admin';
import { Box } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import LocationOnIcon from '@material-ui/icons/LocationOn';


import { sizes } from './sizes';
import { sectors } from './sectors';

export const CompanyListFilter = () => {
    const { identity } = useGetIdentity();
    return (
        <Box width="15em" order="-1" marginRight="1em">
            <FilterLiveSearch />

            <FilterList label="Size" icon={<BusinessIcon />}>
                {sizes.map(size => (
                    <FilterListItem
                        key={size.id}
                        label={size.name}
                        value={{ size: size.id }}
                    />
                ))}
            </FilterList>

            <FilterList label="Location" icon={<LocationOnIcon/>  }>
                {sectors.map(sector => (
                    <FilterListItem
                        key={sector.id}
                        label={sector.name}
                        value={{ sector: sector.id }}
                    />
                ))}
            </FilterList>
        </Box>
    );
};
