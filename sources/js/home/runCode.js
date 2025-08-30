export function setupCodyBox(){
        
    const codeTextArea = document.getElementById('c-code');

    if(!codeTextArea) {
        console.error('Sorry, but it looks like the IDE was abducted by a UFO 🛸...');
        return;
    }

    const editor = CodeMirror.fromTextArea(codeTextArea,{
        lineNumbers: true,
        mode: 'text/x-csrc',
        theme: 'dracula',
        autoCloseBrackets: true
    });

    //--

    const runButton = document.getElementById('run-button');
    const outputArea = document.getElementById('output');

    //--

    const rapidApikey = '*************************';
    const rapidApiHost = 'judge0-ce.p.rapidapi.com';
    const apiUrl = `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*`;

    //- RUN CODE -- //
    const runCode = async () => {
        const userCode = editor.getValue();

        if(userCode.length > 10000){
            outputArea.textContent = '⚠️Error: The code is too long! Please use smaller snippets.⚠️';
            return;
        }

        if(!userCode.trim()){
            outputArea.textContent = 'Please write some code to execute.';
            return;
        }

        outputArea.textContent = 'Compiling and running...';
        runButton.disabled = true;
        runButton.textContent = 'Please wait...';

        const encodedCode = btoa(userCode);

        const options = {
            method: 'POST',
            headers:{
                'content-type' : 'application/json',
                'X-RapidAPI-Key' : rapidApikey,
                'X-RapidAPI-Host' : rapidApiHost
            },
            body: JSON.stringify({
                language_id: 52,
                source_code: encodedCode
            })
        };

        try{
            const response = await fetch(apiUrl, options);
            const submission = await response.json();

            if(submission.token){
                setTimeout(() => {
                    checkStatus(submission.token);
                }, 2000);
            } else {
                throw new Error('😊 Failed to submit the code. Please inform the developer about the ERROR in the application\'s API key.');
            }
        }catch(error){
            console.log('Error: ', error);
            outputArea.textContent = `Error connecting to the API: ${error.message}`;
            resetButton();
        }
    }; //-- END RUN CODE


    const checkStatus = async(token) => {
        const statusUrl = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key' : rapidApikey,
                'X-RapidAPI-Host' : rapidApiHost
            }
        };

        try{
            const response = await fetch(statusUrl, options);
            const result = await response.json();

            if(result.status.id <= 2){
                setTimeout(() => {
                    checkStatus(token);
                }, 2000);
                return;
            }

            let finalOutput = '';

            if(result.stdout){
                finalOutput += atob(result.stdout);
            }
            if(result.stderr){
                finalOutput += `\n[EXECUTION ERROR! 👽🛸⚡ It seems a UFO is passing through the network right now. EXECUTION ERROR]\n${atob(result.stderr)}`;
            }
            if(result.compile_output){
                finalOutput += `\n[COMPILATION ERROR! 👽🛸⚡ It seems the code was abducted mid-compile!]\n${atob(result.compile_output)}`;
            }
            outputArea.textContent = finalOutput || `\n[EXECUTION COMPLETE! 👽🛸⚡ The alien abducted your code’s output! Nothing appeared on the screen.]`;
            resetButton();
        } catch(error){
            console.log('Error: ', error);
            outputArea.textContent = `Error connecting to the API: ${error.message}`;
            resetButton();
        }
    }; // -- END CHECK STATUS

    const resetButton = () => {
        runButton.disabled = false;
        runButton.textContent = 'Run Code';
    };

    runButton.addEventListener('click', runCode);
} // -- END SETUP CODE BOX