export function setupLangSwitcher(){
    const langSelector = document.querySelector('.language-selector');

    if(!langSelector) return;

    const currentLangButton = langSelector.querySelector('.current-lang');

    currentLangButton.addEventListener('click', (event) => {
        event.stopPropagation();
        langSelector.classList.toggle('open');
        
        const isExpanded = langSelector.classList.contains('open');
        currentLangButton.setAttribute('aria-expanded', isExpanded);
    });

    document.addEventListener('click', () => {
        if(langSelector.classList.contains('open')){
            langSelector.classList.remove('open');
            currentLangButton.setAttribute('aria-expanded', 'false');
        }
    });
}
