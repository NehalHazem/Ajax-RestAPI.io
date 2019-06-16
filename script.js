// Toggle Form

const url = 'https://jsonplaceholder.typicode.com/users';
const newBtn = document.querySelector('.newBtn');
const form = document.querySelector('.form');
const saveBtn = document.querySelector('.saveBtn');
const email = document.querySelector('#emailField');
const username = document.querySelector('#username');
const optionsBtn = document.querySelector('.output');
let isEditing;
let idGet;
let usernameGetPut;
let emailGetPut;

newBtn.addEventListener('click', toggleForm);

function toggleForm() {
    form.classList.toggle('show');
}

// Get Users

window.addEventListener('load', getUsers);

function getUsers() {
    
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${url}`, true);

    xhr.onload = function() {
        if(this.status === 200) {
            let users = JSON.parse(this.responseText);
            users.forEach(user => {
                document.querySelector('.output').innerHTML += `
                    <tr class="table">
                        <th scope="row">${user.id}</th>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td><a class="btn my-btn edit"><i class="fas fa-user-edit"></i></a></td>
                        <td><a class="btn my-btn delete"><i class="fas fa-user-minus"></i></a></td>
                    </tr>   
                `
            });

            document.querySelector('.alert').innerHTML =  `
                <strong id="note">Request Method: GET, &nbsp  Status Code: ${this.status}</strong>
            `;
        }
    }

    xhr.onerror = function() {
        document.querySelector('.alert').innerHTML = `
            <strong id="note">Request Method: GET, &nbsp  Status Code: ${this.status}</strong>
        `;
    }

    xhr.send();
}

// Get User

optionsBtn.addEventListener('click', getUser);

function getUser(e) {
    if(e.target.parentElement.classList.contains('edit')) {
        let id = e.target.parentElement.parentElement.parentElement.children[0].innerHTML;
        usernamePut = e.target.parentElement.parentElement.parentElement.children[1].innerHTML;
        emailPut = e.target.parentElement.parentElement.parentElement.children[2].innerHTML;

       const xhr = new XMLHttpRequest();

       xhr.open('GET', `${url}/${id}`, true);

       xhr.onload = function() {
            if (this.status === 200) {
                let result = JSON.parse(this.responseText);
                usernameRes = result.username;
                emaiRes = result.email;
                username.value = usernameRes;
                email.value = emaiRes;
                form.classList.add('show');
                isEditing = true;
                idGet = id;
                usernameGetPut = e.target.parentElement.parentElement.parentElement.children[1];
                emailGetPut = e.target.parentElement.parentElement.parentElement.children[2];
            }
       }

       xhr.send();
    }
}

// Submit User

saveBtn.addEventListener('click', submitUser);

function submitUser(e) {
    if (isEditing) {    // Put

        if(username.value !== '' && email.value !== '' && emailField.checkValidity()) {

            const xhr = new XMLHttpRequest();
            
            xhr.open('PUT', `${url}/${idGet}`, true);
            
            xhr.onload = function() {
            usernameGetPut.innerHTML = username.value;
            emailGetPut.innerHTML = email.value;

            username.value = '';
            email.value = '';
            isEditing = false;

            document.querySelector('.alert').innerHTML =  `
                <strong id="note">Request Method: PUT, &nbsp  Status Code: ${this.status}</strong>
            `;

            document.getElementById('inValid').style.display = 'none';

            }

            xhr.onerror = function() {
                document.querySelector('.alert').innerHTML = `
                    <strong id="note">Request Method: PUT, &nbsp  Status Code: ${this.status}</strong>
                `;
            }
                
            xhr.send(); 

        } else {document.getElementById('inValid').style.display = 'block'}
        
    } else {            // Post

        if(username.value !== '' && email.value !== '' && emailField.checkValidity()) {
        
            const xhr = new XMLHttpRequest();
            
            xhr.open('POST', `${url}`, true);
            
            xhr.onload = function() {
                let id = JSON.parse(this.responseText);
                let usernameValue = username.value;
                let emailValue = email.value;
                document.querySelector('.output').innerHTML += `
                    <tr class="table">
                        <th scope="row">${id.id}</th>
                        <td>${usernameValue}</td>
                        <td>${emailValue}</td>
                        <td><a class="btn my-btn edit"><i class="fas fa-user-edit"></i></a></td>
                        <td><a class="btn my-btn delete"><i class="fas fa-user-minus"></i></a></td>
                    </tr>   
                        `
                username.value = '';
                email.value = '';

                document.querySelector('.alert').innerHTML =  `
                    <strong id="note">Request Method: POST, &nbsp  Status Code: ${this.status}</strong>
                `;

                document.getElementById('inValid').style.display = 'none';
            }

            xhr.onerror = function() {
                document.querySelector('.alert').innerHTML = `
                    <strong id="note">Request Method: POST, &nbsp  Status Code: ${this.status}</strong>
                `;
            }
                    
            xhr.send();
            
        } else {document.getElementById('inValid').style.display = 'block'}
    }
    e.preventDefault();
}

// Delete User

optionsBtn.addEventListener('click', deleteUser);

function deleteUser(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        let id = e.target.parentElement.parentElement.parentElement.children[0].innerHTML;

       const xhr = new XMLHttpRequest();

       xhr.open('DELETE', `${url}/${id}`, true);

       xhr.onload = function() {
            if (this.status === 200) {
                e.target.parentElement.parentElement.parentElement.style.textDecoration = 'line-through';
                e.target.parentElement.parentElement.parentElement.children[3].style.display = 'none';
                e.target.parentElement.parentElement.parentElement.children[4].style.display = 'none';

                document.querySelector('.alert').innerHTML =  `
                <strong id="note">Request Method: DELETE, &nbsp  Status Code: ${this.status}</strong>
                `;
            }
       }

       xhr.onerror = function() {
            document.querySelector('.alert').innerHTML = `
                <strong id="note">Request Method: DELETE, &nbsp  Status Code: ${this.status}</strong>
            `;
    }

       xhr.send();
    }
}



// Responsivness 
