import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import axios from 'axios';

type ContractFormProps = {
    address: string | undefined;
};

const ContractForm:React.FC<ContractFormProps> = ({
    address
}) => {
    return (
    <form
    >
        
        <Input
            label="Contract Address"
            placeholder=""
            value=""
            // onChange={() => handleTitleChange}
        />
        <Button type="submit">Submit</Button>
    
    </form>
    );
};

export default ContractForm;