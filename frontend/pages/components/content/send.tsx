// Imports
import { useState } from 'react';
import { Button, Grid } from '@nextui-org/react';


// Local Imports
import SendForm from "../sendform/sendform";

type Tab = {
    label: string;
    content: React.ReactNode;
};


interface sendProps {
    address: string | undefined;
    setAddress: (address: string) => void;
    sendEther: (address: string, amount: string) => Promise<void>;
    tabs: Tab[];
}

const Send:React.FC<sendProps> = ({
    address,
    setAddress,
    sendEther,
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