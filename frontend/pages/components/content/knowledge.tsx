// Imports
import { Button, Grid, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import axios from 'axios';

// Local Import

// Types

// Interfaces
// interface ButtonProps {
//     onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
// }

// function cleanUrlPatterns(url:string) {
//     var patterns = [
//         /(%3C\/p%3E|<\/p>|<\/li>|<\/p><\/li>|\.<\/p><\/li>|<\/p><\/li>\?docs=true|<\/p>\?docs=true)\?docs=true/g,
//         /\.?support=true/g,
//         /(\.)(\?docs=true)/g,
//         /(\.)(\?support=true)/g,
//         /(%3C(\/?[a-z]+)[^%]*%3E)/ig,
//         /<\/p><\/li>/g,
//         /<\/p>/g,
//         /<\/li>/g,
//         /<\p>/g,
//         /<\li>/g,
//         /<p>/g,
//         /<li>/g,
//     ];

//     patterns.forEach(function (pattern) {
//         url = url.replace(pattern, '');
//     });

//     return url;
// }

// function scrollToBottom() {
//     var conversationContainer = document.getElementById('conversation-container');
//     // TODO - Adjust to typescript - copied from dan's js
//     conversationContainer.scrollTop = conversationContainer.scrollHeight;
// }

// function makeLinksClickable(text:string) {
//     var urlPattern = /((https?:\/\/)|(www\.))[^\s]+/ig;
//     return text.replace(urlPattern, function(match) {
//         if (match.slice(-1) === '.') {
//             match = match.slice(0, -1);
//         }
//         var cleanedUrl = cleanUrlPatterns(match);
//         var prefix = /^https?:\/\//.test(cleanedUrl) ? '' : 'http://';
//         return '<a href="' + prefix + cleanedUrl + '" target="_blank">' + cleanedUrl + '</a>';
//     });
// }
// function typewriterEffect(chatbot_output:string, response_div, callback) {
//     let i = 0;
//     let isTag = false;
//     let text = "";

//     function typeNextChar() {
//         if (i < chatbot_output.length) {
//             let char = chatbot_output.charAt(i);
//             i++;

//             if (char === "<") {
//                 isTag = true;
//             } else if (char === ">") {
//                 isTag = false;
//             }

//             text += char;
//             response_div.innerHTML = text;

//             if (isTag) {
//                 setTimeout(typeNextChar, 10);
//             } else {
//                 setTimeout(typeNextChar, 10);
//             }
//         } else {
//             if (typeof callback === "function") {
//                 callback();
//             }
//         }
//     }

//     typeNextChar();
// }


// function updateConversation(user_input:string, chatbot_output:string) {
//     var response_container = document.createElement("div");
//     response_container.classList.add("response-container");

//     var user_input_div = document.createElement("div");
//     user_input_div.classList.add("user-input");
//     user_input_div.innerHTML = user_input;

//     var response_div = document.createElement("div");
//     response_div.classList.add("response");

//     response_container.appendChild(user_input_div);
//     response_container.appendChild(response_div);
//     document.getElementById("conversation-container").appendChild(response_container);

//     typewriterEffect(chatbot_output, response_div, scrollToBottom);
// }


// function updateUrls(text) {
//     var urlPattern = /((https?:\/\/)|(www\.))[^\s]+/ig;
//     return text.replace(urlPattern, function(match) {
//         var cleanedUrl = cleanUrlPatterns(match);
//         var prefix = /^https?:\/\//.test(cleanedUrl) ? '' : 'http://';
//         return '<a href="' + prefix + cleanedUrl + '" target="_blank">' + cleanedUrl + '</a>';
//     });
// }

const Knowledge:React.FC = ({}) => {
    

    async function askBot() {
        // getResponse(event.target.value);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api', {
                "user_input": "How do I add an account in Ledger Live?"
            });
            // console.log(address);
            console.log(response.data);
            // do something with the response
        } catch (error) {
            console.error(error);
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
        </main>
    </>
    )
}

export default Knowledge