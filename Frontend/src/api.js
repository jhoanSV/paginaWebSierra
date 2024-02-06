const API = 'http://192.168.1.102:3000/tasks';
//const API = process.env.API
//const API = 'http://localhost:3000/tasks';

export const validateUser = async(validateValueUser) => {
    /*Validate the user information and if it's correct return the data of the user
    you have to send a json of the form:
    {
        "EmailUser": "Pruebausuario1@gmail.com",
        "Password": "123456789"
    }*/
    try {
        const res = await fetch(`${API}/login`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(validateValueUser)
        })
        return await res.json()
    }catch(error) {
        console.log('TheError: '+ error)
    }
}

export const Changepassword = async(validateValueUser) => {
    /*Validate the user information and if it's correct change the password in the database
    you have to send a json of the form:
    {
        "CodUser": "493",
        "Password": "Actual password",
        "NewPassword": "New password"
    }*/
    try {
        const res = await fetch(`${API}/Changepassword`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(validateValueUser)
        })
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const products = async(validateLogIn) => {
    /*return the list of products deppending on if the user is logged in or not
    you have to send a json of the form:
    {
        "logged": false
    }*/
    try {
        const res = await fetch(`${API}/productsdataweb`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(validateLogIn)
        })
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const BottonCarousel = async(validateLogIn) => {
    /*return the list of products for the botton caroucel deppending on if the user is logged in or not
    you have to send a json of the form:
    {
        "logged": false,
        "CodUser": "494"
    }*/
    try {
        const res = await fetch(`${API}/BottonCaroucel`,{
            method: 'POST',
            headers: { Accept: 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify(validateLogIn)
        })
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}

export const Alias = async() => {
    /*Return the list of alias of the products*/
    try {
        const res = await fetch(`${API}/TAlias`, {
            method: 'GET'})
        return await res.json()
    }catch(error) {
        console.log(error)
    }
}
