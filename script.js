if (!window.localStorage) {
    alert('Seu navegador não suporta armazenamento local, por favor trocar.')
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.length > 0) {
        populateTable()
    } else {
        document.querySelector('#user_list tbody').appendChild(`
            <td>-</td>
            <td>-</td>
            <td>-</td>
        `)
    }
})

const populateTable = () => {
    const tableBody = document.querySelector('#user_list tbody')

    tableBody.innerHTML = ''

    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index)
        let user = JSON.parse(localStorage.getItem(key))

        const row = document.createElement('tr')

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.birthday}</td>
        `
        tableBody.appendChild(row)
    }

}
const validateDupKey = (key) => {
    for (let index = 0; index < localStorage.length; index++) {
        value = JSON.parse(localStorage.getItem(localStorage.key(index)))

        if (key === value.email) {
            return true
        }
    }
    return false
}

const saveLocal = (user) => {
    if (validateDupKey(user.email)) {
        alert('Email já está em uso')
        return
    }

    localStorage.setItem(user.email, JSON.stringify({
        name: user.name,
        email: user.email,
        birthday: user.birthday
    }))
}

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()

    let username = document.getElementById('name').value
    let useremail = document.getElementById('email').value
    let userbirthday = document.getElementById('birthday').value
    let obj = { name: username, email: useremail, birthday: userbirthday }

    saveLocal(obj)
    populateTable()
})



