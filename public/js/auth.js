// REGISTER
const registerForm =
    document.getElementById('registerForm');

if(registerForm){

    registerForm.addEventListener('submit',
    async (e) => {

        e.preventDefault();

        const name =
            document.getElementById('registerName').value;

        const email =
            document.getElementById('registerEmail').value;

        const password =
            document.getElementById('registerPassword').value;

        const response =
            await fetch('/registerUser', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            });

        const data =
            await response.json();

        alert(data.message);

        if(data.success){

            window.location.href = '/login';

        }

    });

}



// LOGIN
const loginForm =
    document.getElementById('loginForm');

if(loginForm){

    loginForm.addEventListener('submit',
    async (e) => {

        e.preventDefault();

        const email =
            document.getElementById('loginEmail').value;

        const password =
            document.getElementById('loginPassword').value;

        const response =
            await fetch('/loginUser', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

        const data =
            await response.json();

        alert(data.message);

        if(data.success){

            window.location.href =
                '/dashboard';

        }

    });

}