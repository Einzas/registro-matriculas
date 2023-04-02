window.addEventListener('load', () => {
    const token = localStorage.getItem('token');
    const tokenDecoder = (token) => {
        if (!token) {
            window.location.href = '../login.html';
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
    if(tokenDecoder(token).exp < (Date.now() / 1000)){
        localStorage.removeItem('token');
        window.location.href = '../login.html';
    }
    if (!token) {
        window.location.href = '../login.html';

    }

    const title = document.querySelector('.nombre');
    
    if (token) {
        const nombre = tokenDecoder(token).name;
        title.innerHTML = `Bienvenido ${nombre}`;
    }
});