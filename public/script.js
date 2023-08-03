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
        delDiv.innerHTML = `<form action='/delete' method='post'>
        <input style='display:none' type='text' name='name' value='${name}'>
        <button type='submit'>Delete Button</button>
        </form`
        updateDiv.innerHTML = '<button>Update Button</button>'
        updateDiv.addEventListener('click',()=>{
            nameDiv.innerHTML = `<form action ='/update' method='post'>
                    <input type='text' name='updvalue' value='${name}' >
                    <input style='display:none' type='text' name='name' value='${name}'>
                    <button type='submit'>Submit</button>
                </form>`
        })
        bigDiv.append(nameDiv,updateDiv,delDiv);
        bigDiv.style.display='flex'
        bigDiv.style.width='80%'
        bigDiv.style.justifyContent='space-between'
        body.appendChild(bigDiv);
}

function updateFunc(){
    
}
