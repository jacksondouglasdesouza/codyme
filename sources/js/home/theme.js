export function setupThemeSwitcher(){

    const lightModeButton = document.querySelector('.light-mode');
    const darkModeButton = document.querySelector('.dark-mode');
    const htmlElement = document.documentElement;

    if(!lightModeButton || !darkModeButton){
        console.log('🛸 Looks like a UFO passed by and took the theme switch buttons...');
        return;
    }

    const applySavedTheme = ()=>{
        
        const savedTheme = localStorage.getItem('theme');

        if(savedTheme == 'light'){
            htmlElement.classList.add('light-mode');
        } else {
            htmlElement.classList.remove('light-mode');
        }
    };

    lightModeButton.addEventListener('click', ()=>{
        htmlElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    });

    darkModeButton.addEventListener('click', ()=>{
        htmlElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    });

    applySavedTheme();

}