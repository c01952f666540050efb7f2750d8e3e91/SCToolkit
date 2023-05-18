// Imports
import { useState } from 'react';
import { Button, Grid, Dropdown } from '@nextui-org/react';

type Tab = {
    label: string;
    content: React.ReactNode;
};


interface sendProps {
    tabs: Tab[];
}

const Send:React.FC<sendProps> = ({
    tabs
}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    return (
    <>
        <main>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                
                <Grid.Container gap={0.5}>
                    {
                        tabs.map((tab, index) => (
                                <Grid key={index}>
                                    <Button
                                        key={index}
                                        auto 
                                        type="button"   
                                        onPress={() => setActiveTabIndex(index)}
                                    >
                                        {tab.label}
                                    </Button>
                                </Grid>
                            )
                        )
                    }
                </Grid.Container>
            </div>
            <div>
                {tabs[activeTabIndex].content}
            </div>
        </main>
    </>
    )
}

export default Send;