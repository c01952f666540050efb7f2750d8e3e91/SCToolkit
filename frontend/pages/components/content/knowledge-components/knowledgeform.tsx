import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import axios from 'axios';

type knowledgeProps = {
    address: string | undefined;
};

const KnowledgeForm:React.FC<knowledgeProps> = ({
    address
}) => {
    return (
    <form
    >
        
        <Input
            label="Title"
            placeholder="Enter title"
            // value={title}
            // onChange={() => handleTitleChange}
        />
        <Input
            label="Content"
            placeholder="Enter content"
            // value={content}
            // onChange={() => handleContentChange}
        />
        <Button type="submit">Submit</Button>
    
    </form>
    );
};

export default KnowledgeForm;