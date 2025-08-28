    /* SLEEPING ... ... ... */

    const codeTextArea = document.getElementById('c-code');

    const editor = codeMirror.fromTexArea(codeTextArea,{
        lineNumbers: true,
        mode: 'text/x-csrc',
        theme: 'dracula',
        autoCloseBrackets: true
    });

    //--

    const runButton = document.getElementById('run-button');
    const outputArea = document.getElementById('output');

    //--

    const rapidApikey = '********************************************************';
    const rapidApiHost = 'judge0-ce.p.rapidapi.com';
    const apiUrl = `https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*`;

    //- RUN CODE -- //
    const runCode = async () => {
        const userCode = editor.getValue();
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
                checkStatus(submission.token);
            } else {
                throw new Error('Failed to submit the code.');
            }
        }catch(error){
            console.log('Error: ', error);
            outputArea.textContent = `Error connecting to the API: ${error.message}`;
            resetButton();
        }

    }; //-- END RUN CODE