if (!window.localStorage) {
    alert('Seu navegador não suporta armazenamento local. Por favor, troque.')
}

const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const birthdayInput = document.getElementById('birthday')

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
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.birthday}</td>
            <td>
                <button onclick='editLocal(this)'>Edit</button>
            </td>
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
    isEdit = user.id > 0

    if (!isEdit) {
        newID = localStorage.length + 1
        localStorage.setItem(newID, JSON.stringify({
            id: newID,
            name: user.name,
            email: user.email,
            birthday: user.birthday
        }))
    } else {
        for (let index = 0; index < localStorage.length; index++) {
            value = JSON.parse(localStorage.getItem(localStorage.key(index)))

            if (user.id == value.id) {
                localStorage.setItem(value.id, JSON.stringify(user))
            }
        }
    }
    populateTable()

}

const editLocal = (button) => {
    let row = button.parentNode.parentNode
    let idCell = row.cells[0]
    let nameCell = row.cells[1]
    let emailCell = row.cells[2]
    let birthdayCell = row.cells[3]

    nameInput.value = nameCell.innerHTML
    emailInput.value = emailCell.innerHTML
    birthdayInput.value = birthdayCell.innerHTML

    emailInput.setAttribute('readonly', true)
}

const getByEmail = (email) => {
    for (let index = 0; index < localStorage.length; index++) {
        value = JSON.parse(localStorage.getItem(localStorage.key(index)))

        if (email == value.email) {
            return value
        }
    }
    return null
}

const clearInputs = () => {
    nameInput.value = ''
    emailInput.value = ''
    birthdayInput.value = ''
}

let form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let id = 0
    let username = document.getElementById('name').value
    let useremail = document.getElementById('email').value
    let userbirthday = document.getElementById('birthday').value
    let obj = {
        id: id, name: username,
        email: useremail, birthday: userbirthday
    }

    if (validateDupKey(useremail)) {
        user = getByEmail(useremail)

        if (user != null) {
            obj.id = user.id
        }
    }

    saveLocal(obj)
    clearInputs()
})





