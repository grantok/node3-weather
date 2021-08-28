

const weatherForm = document.querySelector('form')
const wSearch = document.querySelector('input')
const message1 = document.querySelector('#errorMsg')
const message2 = document.querySelector('#weatherMsg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = wSearch.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((resp) => {
        resp.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = ''
                message2.textContent = `Temperature at ${data.location} is ${data.temperature}F and it feels like ${data.feelslike}F`
            }
        })
    })
})