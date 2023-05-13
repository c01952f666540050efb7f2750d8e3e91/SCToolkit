// Import
import { Grid } from '@nextui-org/react';

// Local Import
import ContractForm from './contract-components/contractForm';

export default function Contract() {
    return (
    <>
        <Grid.Container gap={2}>
            <Grid>
                <h3>Contract Function Call</h3>
            </Grid>
        </Grid.Container>
        <Grid.Container gap={2}>
            
            <Grid>
                <ContractForm address="test"/>
            </Grid>
            
        </Grid.Container>
    </>
    )
}