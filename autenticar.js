// registro

const signupForm = document.querySelector('#registro-usuario');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#pass').value;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then (userCredential => {
            // clear the form
            //signupForm.reset();

            // cerrar modal
            //$('#registro-usuario').modal('hide')

        })

    
});

// SingIn

const signinForm = document.querySelector('#ingreso-usuario');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then (userCredential => {
            // clear the form
            //signinForm.reset();

            // cerrar modal
            //$('#registro-usuario').modal('hide')

        })

    
});

// Logout

const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
    auth.signOut().then(() => {
        console.log("logout")
    })
});
