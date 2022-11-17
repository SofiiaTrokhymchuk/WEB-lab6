const USERS_URL = 'https://randomuser.me/api/?results=50';
const downloadInfo = document.querySelector(".download-info");
const downloadBtn = document.getElementById("download-btn");
const usersContainer = document.querySelector(".users-container");

function downloadUsers(){
    let users = [];
    downloadBtn.addEventListener("click", async () =>{
        await renderUsers();
    });
    return users;
}

async function renderUsers(){
    let users = await getUsers(USERS_URL);
    usersContainer.innerHTML = users.map(user => `
        <article class="user">
            <img src="${user.picture.large}" alt=""User Picture>
            <h2>${user.name.title} ${user.name.first} ${user.name.last}</h2>
            <span><b>Tel.: </b><a href="tel:+${user.cell}">${user.cell}</a><span>
            <span><b>Country: </b>${user.location.country}</span>
            <span><b>Email: </b><a href="mailto:${user.email}">${user.email}</a></span>
            <span><b>Coord.: </b>${user.location.coordinates.latitude} ${user.location.coordinates.longitude}</span>
        </article>
    `).join("");
}

async function getUsers(url){
    try{
        const response = await fetch(url);
        const fetchedData = await response.json();
        const users = await fetchedData.results;
        downloadInfo.classList.add("success");
        downloadInfo.classList.remove("error");
        downloadInfo.innerText = "Success";
        return users;
    }catch(error){
        downloadInfo.classList.add("error");
        downloadInfo.classList.remove("success");
        downloadInfo.innerText = 'Something went wrong...\n' + error;
    }
}

downloadUsers();
