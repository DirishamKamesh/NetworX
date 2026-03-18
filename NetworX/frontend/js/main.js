const loginForm = document.getElementById('loginForm');

if(loginForm){
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        alert(data.message);
        if(data.user){
            localStorage.setItem('networx_user', JSON.stringify(data.user));
            window.location.href = 'profile.html';
        }
    });
}
