
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
import { locations } from './locations';


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
                {locations.map(l => (
                    <FilterListItem
                        key={l.id}
                        label={l.name}
                        value={{ location: l.id }}
                    />
                ))}
            </FilterList>
        </Box>
    );
};
