if(window.matchMedia("(prefers-color-scheme: light)").matches && !window.localStorage.dl_local_theme) {
    window.localStorage.setItem('dl_local_theme', 'light');
    toggleTheme('light');
}
if(window.matchMedia("(prefers-color-scheme: dark)").matches && !window.localStorage.dl_local_theme) {
    window.localStorage.setItem('dl_local_theme', 'dark');
    toggleTheme('dark');
}
if(window.localStorage.dl_local_theme && window.localStorage.dl_local_theme === 'light') {
    toggleTheme('light');
}
if(window.localStorage.dl_local_theme && window.localStorage.dl_local_theme === 'dark') {
    toggleTheme('dark');
}


function toggleTheme(theme) {
    let newTheme = theme;
    window.localStorage.dl_local_theme = document.documentElement.dataset.theme = newTheme;
}

window.onload = (event) => {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('change', () => {
        (document.documentElement.dataset.theme === "dark") ? toggleTheme('light') : toggleTheme('dark');
    });

    if(window.sessionStorage.dl_session_visited) {
        document.body.dataset.state = "loaded";
        return;
    }
    if(document.body.dataset.state && document.body.dataset.state === "loading") {
        document.body.dataset.state = "first-load";
        setTimeout(() => {
            document.body.dataset.state = "loaded";
            window.sessionStorage.setItem('dl_session_visited', true);
        }, 5000);
    }
}
