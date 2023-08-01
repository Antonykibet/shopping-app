let body = document.body;

async function fetchUsers(){
    let result = await fetch('/users');
    let users = await result.json()
    users.forEach((user)=>{
        let div = document.createElement('div');
        div.innerHTML=user.name;
        body.appendChild(div);
    })
    let addUserButton = document.createElement('button');
    addUserButton.type='submit';
    addUserButton.innerText='Add User';
    addUserButton.addEventListener('click',async()=> await fetch('/addUsers'));
    body.appendChild(addUserButton)
}
fetchUsers()
function addUser(){

}

