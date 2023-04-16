// Imports
import { useState } from 'react';
import { Button, Grid } from '@nextui-org/react';

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
    {/* <div style={{ display: 'flex', justifyContent: 'flex-start' }}></div> */}
    return (
    <>
        <main>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid.Container gap={1}>
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