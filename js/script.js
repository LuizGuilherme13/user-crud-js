if (!window.localStorage) {
    alert('Seu navegador não suporta armazenamento local. Por favor, troque.')
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

document.getElementById('form').addEventListener('submit', (e) => {
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
        user = findByEmail(useremail)

        if (user != null) {
            obj.id = user.id
        }
    }

    addUser(obj)
    populateTable()
    clearInputs()
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
                <button onclick='editUser(this)'>
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button onclick='deleteUser(this)'>
                    <i class="fa-light fa-x" style="color: red;"></i>
                </button>
            </td>
        `
        tableBody.appendChild(row)
    }

}

const addUser = (user) => {
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
}

const editUser = (button) => {
    let row = button.parentNode.parentNode
    let nameCell = row.cells[1].innerHTML
    let emailCell = row.cells[2].innerHTML
    let birthdayCell = row.cells[3].innerHTML

    document.getElementById('name').value = nameCell
    document.getElementById('email').value = emailCell
    document.getElementById('birthday').value = birthdayCell

    document.getElementById('email').setAttribute('readonly', true)
}

const deleteUser = (button) => {
    let row = button.parentNode.parentNode
    let idCell = row.cells[0].innerHTML

    localStorage.removeItem(idCell)
    populateTable()
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

const findByEmail = (email) => {
    for (let index = 0; index < localStorage.length; index++) {
        value = JSON.parse(localStorage.getItem(localStorage.key(index)))

        if (email == value.email) {
            return value
        }
    }
    return null
}

const clearInputs = () => {
    document.getElementById('name').value = ''
    document.getElementById('email').value = ''
    document.getElementById('birthday').value = ''
}









