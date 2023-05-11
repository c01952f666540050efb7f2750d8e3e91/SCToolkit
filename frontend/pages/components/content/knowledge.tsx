// Imports
import { Button, Grid, Textarea, Loading } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Showdown from 'showdown';

// Local Import

// Types

// Interfaces


function cleanUrlPatterns(url:string) {
    var patterns = [
        /(%3C\/p%3E|<\/p>|<\/li>|<\/p><\/li>|\.<\/p><\/li>|<\/p><\/li>\?docs=true|<\/p>\?docs=true)\?docs=true/g,
        /\.?support=true/g,
        /(\.)(\?docs=true)/g,
        /(\.)(\?support=true)/g,
        /(%3C(\/?[a-z]+)[^%]*%3E)/ig,
        /<\/p><\/li>/g,
        /<\/p>/g,
        /<\/li>/g,
        /<\p>/g,
        /<\li>/g,
        /<p>/g,
        /<li>/g,
    ];

    patterns.forEach(function (pattern) {
        url = url.replace(pattern, '');
    });

    return url;
}

function makeLinksClickable(text:string) {
    var urlPattern = /((https?:\/\/)|(www\.))[^\s]+/ig;
    return text.replace(urlPattern, function(match) {
        if (match.slice(-1) === '.') {
            match = match.slice(0, -1);
        }
        var cleanedUrl = cleanUrlPatterns(match);
        var prefix = /^https?:\/\//.test(cleanedUrl) ? '' : 'http://';
        return '<a href="' + prefix + cleanedUrl + '" target="_blank">' + cleanedUrl + '</a>';
    });
}


const Knowledge:React.FC = ({}) => {
    const [userInput, setUserInput] = useState("");
    const [botResponse, setBotResponse] = useState('');
    const [loading, setLoading] = useState(false);
    // const [displayText, setDisplayText] = useState('');

    var conv = new Showdown.Converter({simpleLineBreaks: true, excludeTrailingPunctuationFromURLs: true, smartIndentationFix: true});

    // useEffect(() => {
    //     if (botResponse) {
    //         setLoading(false);
    //         setDisplayText('');
    //         let index = 0;
    //     // var chatResponse = conv.makeHtml(response.data.output);
    //     //     chatResponse = makeLinksClickable(chatResponse)
    //     //     setBotResponse(chatResponse);
        

    //         const interval = setInterval(() => {
    //             setDisplayText(prev => prev + botResponse.charAt(index));
    //             index++;
    //             if (index === botResponse.length) {
    //             clearInterval(interval);
    //             }
    //         }, 0.1);

            
    //     }
    // }, [botResponse]);

    async function askBot() {
        // getResponse(event.target.value);
        setLoading(true)
        try {
            const response = await axios.post('http://127.0.0.1:8000/api', {
                "user_input": userInput
            });
            
            // TEST PRINT
            console.log("QUESTION");
            console.log(userInput);
            console.log("ANSWER:")
            console.log(response.data.output);
            var chatResponse = response.data.output
            // var chatResponse = conv.makeHtml(response.data.output);
            
            chatResponse = makeLinksClickable(chatResponse)
            setBotResponse(chatResponse);
            setLoading(false)
            
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    };

    return (
    <>
        <main>
            <form>

            
                <Grid.Container justify='center'>
                    <Grid><h1>Knowledge Bot</h1></Grid>
                </Grid.Container>
                <Grid.Container gap={2} justify='center'>
                    <Grid>
                        
                    </Grid>
                    <Grid alignItems='flex-end'>
                        <Textarea
                            label="What question would you like to ask?"
                            placeholder=""
                            value={userInput || ''}
                            onChange={(event) => setUserInput(event.target.value)}
                            width="100%"
                            
                        />
                    </Grid>
                </Grid.Container>
                <Grid.Container  justify='center'>
                    <Grid justify='space-around'>
                        <Button size='sm'
                            onPress={() => askBot()}
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                </Grid.Container>
            </form>
            <Grid.Container justify='center' gap={3}>
                <Grid>
                    {loading && <Loading size="lg" />}
                    <div>
                        <b>Response:</b><br />
                        <div dangerouslySetInnerHTML={{ __html: botResponse }} />
                        {/* <div dangerouslySetInnerHTML={{ __html: displayText }} /> */}
                        
                    </div>
                    
                </Grid>
            </Grid.Container>
        </main>
    </>
    )
}

export default Knowledge