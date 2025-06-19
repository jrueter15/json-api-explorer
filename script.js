const postFormEl = document.getElementById('postForm');
const fetchButton = document.getElementById('fetchButton');
const postList = document.getElementById('postList');
const titleInput = document.getElementById('titleInput');
const bodyInput = document.getElementById('bodyInput');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

fetchButton.addEventListener('click',() => {
    postList.innerHTML = "Loading...";

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        postList.innerHTML = '';
        data.slice(0,5).forEach(function(post){
            postList.innerHTML += `
                <div>
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                </div>
            `;
    });
})
.catch(function(error){
            console.error("Error.",error);
            document.getElementById('error').textContent = 'Failed to fetch.';
        });

})

postFormEl.addEventListener("submit", event => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if(!title || !body){
        formError.textContent = 'Something went wrong';
        return;
    }

    formError.textConent = '';
    formSuccess.textContent = 'Submitting...';

fetch('https://jsonplaceholder.typicode.com/posts', {
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({title,body})
        }
    ).then(function(response){
        return response.json();
    })
    .then(function(data){
            console.log(data);
            formSuccess.innerHTML = `Post submitted`;
            titleInput.value = '';
            bodyInput.value = '';
        })
        .catch(function(error){
            console.error("Error.",error);
        });
   });




