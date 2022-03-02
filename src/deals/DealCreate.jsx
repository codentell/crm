import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    NumberInput,
    ReferenceInput,
    AutocompleteInput,
    required,
    useRedirect,
    useDataProvider,
} from 'react-admin';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { stageChoices } from './stages';
import { typeChoices } from './types';


const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

export const DealCreate = ({ open }) => {
    const classes = useStyles();
    const redirect = useRedirect();
    const dataProvider = useDataProvider();

    const handleClose = () => {
        redirect('/deals');
    };

    const onSuccess = ({ data: deal }) => {
        redirect('/deals');
        // increase the index of all deals in the same stage as the new deal
        dataProvider
            .getList('deals', {
                pagination: { page: 1, perPage: 50 },
                sort: { field: 'id', order: 'ASC' },
                filter: { stage: deal.stage },
            })
            .then(({ data: deals }) =>
                Promise.all(
                    deals
                        .filter(oldDeal => oldDeal.id !== deal.id)
                        .map(oldDeal =>
                            dataProvider.update('deals', {
                                id: oldDeal.id,
                                data: { index: oldDeal.index + 1 },
                                previousData: oldDeal,
                            })
                        )
                )
            );
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Create
                resource="deals"
                basePath="/deals"
                className={classes.root}
                onSuccess={onSuccess}
            >
                <SimpleForm initialValues={{ index: 0 }}>
                    <TextInput
                        source="name"
                        label="Lead Name (e.g. Duopharma Biotech)*"
                        fullWidth
                        validate={[required()]}
                    />
                    <TextInput
                        source="contact"
                        label="Name of Contact (e.g. Feizril Nor bin Nurbi) *"
                        fullWidth
                        validate={[required()]}
                    />
                     <TextInput
                        source="location"
                        label="Date of Initial Contact*"
                        fullWidth
                        validate={[required()]}
                    />
                       <NumberInput source="Budget" fullWidth defaultValue={0} />


                    {/* <ReferenceInput
                        source="company_id"
                        reference="companies"
                        fullWidth
                        validate={[required()]}
                    >
                        <AutocompleteInput optionText="name" />
                    </ReferenceInput> */}
                    <SelectInput
                        source="stage"
                        choices={stageChoices}
                        fullWidth
                        validate={[required()]}
                        defaultValue="opportunity"
                    />
                    <SelectInput
                        source="Preferred Arrangement"
                        choices={typeChoices}
                        fullWidth
                    />
                  
                </SimpleForm>
            </Create>
        </Dialog>
    );
};
