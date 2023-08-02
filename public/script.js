let body = document.body;

async function fetchUsers(){
    let result = await fetch('/users');
    let users = await result.json()
    users.forEach((user)=>{
        addUser(user.name)
    })
}
fetchUsers()
function addUser(name){
        let bigDiv = document.createElement('div');
        let nameDiv = document.createElement('div');
        let updateDiv = document.createElement('div');
        let delDiv = document.createElement('div');
        nameDiv.innerHTML = `<h4>${name}</h4>`
        delDiv.innerHTML = '<button>Update Button</button>'
        updateDiv.innerHTML = '<button>Delete Button</button>'
        //updateDiv.addEventListener('click',updateFunc)
        bigDiv.append(nameDiv,updateDiv,delDiv);
        bigDiv.style.display='flex'
        bigDiv.style.width='80%'
        bigDiv.style.justifyContent='space-between'
        body.appendChild(bigDiv);
}

function updateFunc(){
    let input = document.createElement('input')
    input.setAttribute('value','molis')
}
