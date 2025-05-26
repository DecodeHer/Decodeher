const translations = {
    "Está tudo bem": "Estou na verdade chateada.",
    "Faz o que quiseres": "Não faças o queres e faz o que te estou a dizer.",
    "Estou só cansada": "Estou frustrada e preciso de descansar.",
    "Podemos comer o que quiseres": "Escolhe o sitio onde eu quero realmente ir comer."
};

const sentencelist = document.getElementById("listaFrases");
const result = document.getElementById("result");

sentencelist.addEventListener("click", function (e) {
    if (e.target && e.target.matches("li.frases")) {
        // Get the phrase by selecting the first child of the <li> (the phrase text)
        const phrase = e.target.firstChild.textContent.trim(); // Only grab the text node part

        // Show the result section
        result.style.display = "block";

        // Check if there's a translation for the sentence
        if (translations[phrase]) {
            result.textContent = translations[phrase];
        } else {
            result.textContent = "Desculpa, não há tradução disponível";
        }
    }
});

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll("#app section").forEach(section => {
        section.style.display = "none";
    });

    // Show the selected section
    const newSection = document.getElementById(sectionId);
    if (newSection) {
        newSection.style.display = "block"; // Use block for vertical layout
    }

    // Special actions depending on the section
    if (sectionId === "favourites") {
        updateFavouritesUI();
    }

    if (sectionId === "translations") {
        result.style.display = "none";   // Hide the translation result
        result.textContent = "";         // Clear the old translation
    }
}

document.querySelectorAll(".favorite-btn").forEach(button => {
    button.addEventListener("click", function () {
        const phrase = this.parentElement.firstChild.textContent.trim();
        let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

        const icon = this.querySelector("i");
        if (favourites.includes(phrase)) {
            // Remove from favourites
            favourites = favourites.filter(fav => fav !== phrase);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            icon.classList.remove("bi-star-fill");
            icon.classList.add("bi-star");
            alert("Frase removida dos favoritos ❌");
        } else {
            // Add to favourites
            favourites.push(phrase);
            localStorage.setItem("favourites", JSON.stringify(favourites));
            icon.classList.remove("bi-star");
            icon.classList.add("bi-star-fill");
            alert("Frase adicionada aos favoritos ⭐");
        }

        updateFavouritesUI(); // Update the list
    });
});



function updateFavouritesUI() {
    const listaFavoritos = document.getElementById("listaFavoritos");
    listaFavoritos.innerHTML = ""; // Clear the list before adding items

    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (favourites.length === 0) {
        listaFavoritos.innerHTML = "<li>Adicione uma frase aos favoritos!</li>";
    } else {
        favourites.forEach(phrase => {
            const li = document.createElement("li");
            li.classList.add("p-3", "mb-2", "bg-light", "border", "rounded", "d-flex", "justify-content-between", "align-items-center");

            // Text content for the sentence
            const sentenceText = document.createElement("span");
            sentenceText.textContent = phrase;
            li.appendChild(sentenceText);
            
            listaFavoritos.appendChild(li); // Append the list item to the favourites section
        
            // Add event listener to toggle active class when a sentence is clicked
            listaFavoritos.addEventListener('click', function (e) {
                if (e.target && e.target.matches('li')) {
                    e.target.classList.toggle('active'); // Toggle the active class on click
                }
            });

        });
    }
}

function removeFromFavorites(phrase) {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    // Filter out the phrase from the favourites list
    favourites = favourites.filter(fav => fav !== phrase);

    // Save the updated list back to localStorage
    localStorage.setItem("favourites", JSON.stringify(favourites));

    alert("Frase removida dos favoritos.");
    
    // Update the UI to reflect the removal
    updateFavouritesUI();
}

document.addEventListener("DOMContentLoaded", function () {
    updateFavouritesUI(); // still update the favourites list

    // Set star icons on load to reflect current favourites
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];

    document.querySelectorAll(".favorite-btn").forEach(button => {
        const phrase = button.parentElement.firstChild.textContent.trim();
        const icon = button.querySelector("i");

        if (favourites.includes(phrase)) {
            icon.classList.remove("bi-star");
            icon.classList.add("bi-star-fill");
        } else {
            icon.classList.remove("bi-star-fill");
            icon.classList.add("bi-star");
        }
    });
});


// Add event listener to "Ver Favoritos" button
document.querySelector(".btn-warning").addEventListener("click", function() {
    showSection('favourites'); // Show the favourites section
});


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); //stops the page from refreshing

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const user = {
    email: email,
    password: password
    }     
    const userReg = JSON.parse(localStorage.getItem("userReg"));

    if(user.email === userReg.email && user.password === userReg.password) {
        alert("Login bem-sucedido! ✅");

        localStorage.setItem("user", JSON.stringify(user));
        loginSection.style.display = "none";
        appSection.style.display = "block";
    } else {
        alert("Email ou palavra-passe incorretos ❌");
        appSection.style.display = "none";
    }
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const emailReg = document.getElementById("emailInputReg").value;
    const passwordReg = document.getElementById("passwordInputReg").value;
    const passwordCheck = document.getElementById("passwordInputRegConfirm").value;
    
    if(passwordReg == passwordCheck) {
        alert("Registrado com sucesso! ✅");
        const userReg = {
        email: emailReg,
        password: passwordCheck
        } 

        localStorage.setItem("userReg", JSON.stringify(userReg));
        loginSection.style.display = "block";
        appSection.style.display = "none";
        registerSection.style.display = "none";
    } else {
        alert("Palavra-passes diferentes ❌");
        appSection.style.display = "none";
        loginSection.style.display = "none";
    }

});

const loginSection = document.getElementById("login");
const appSection = document.getElementById("app");
const profileSection = document.getElementById("profileSection");

function updateUserCirclePic() {
    const savedPic = localStorage.getItem('profilePicture'); // save it here
    if (savedPic) {
        const userCircle = document.getElementById('userCircle');
        let img = userCircle.querySelector('img'); // check if img already exists

        if (!img) {
            img = document.createElement('img');
            userCircle.querySelector('i').remove();
            userCircle.appendChild(img);
        }
        
        img.src = savedPic;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.borderRadius = "50%";
        img.style.objectFit = "cover";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
        const user = JSON.parse(storedUser);
        console.log("Logged in as:", user.email);
        loginSection.style.display = "none";
        appSection.style.display = "block";
        registerSection.style.display = "none";
    } else {
        loginSection.style.display = "block";
        appSection.style.display = "none";
    }
});
 
document.getElementById('profileBtn').addEventListener('click', () => {
    const savedPic = localStorage.getItem('profilePic');
    if (savedPic) {
    document.getElementById('profilePicture').src = savedPic;
    }

    appSection.style.display = "none";
    profileSection.style.display = "block";
});

document.getElementById('returnBtn').addEventListener('click', (event) => {
    appSection.style.display = "block";
    profileSection.style.display = "none";
});

document.getElementById('settingsBtn').addEventListener('click', () => {
  // open settings
});

document.getElementById('logoutBtn').addEventListener('click', () => {
        loginSection.style.display = "block";
        appSection.style.display = "none";
});

document.getElementById('uploadPicture').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        console.log(reader.result);
        document.getElementById('profilePicture').src = reader.result;
        localStorage.setItem('profilePicture', reader.result);
        updateUserCirclePic();
    };

    if(file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('uploadPicture').click();
});

document.addEventListener('DOMContentLoaded', () => {
  const savedPic = localStorage.getItem('profilePicture');
  if (savedPic) {
    document.getElementById('profilePicture').src = savedPic;
  }
  updateUserCirclePic();
});

const userCircle = document.getElementById('userCircle');
const img = document.createElement('img');

const savedPic = localStorage.getItem('profilePicture');
if (savedPic) {
  img.src = savedPic;
}

document.getElementById('userCircle').querySelector('i').remove();
userCircle.appendChild(img);
img.style.width = "100%";
img.style.height = "100%";
img.style.borderRadius = "50%";
img.style.objectFit = "cover";

const registerSection = document.getElementById("register");

document.getElementById('goToRegister').addEventListener('click', () => {
    loginSection.style.display = "none";
    appSection.style.display = "none";
    registerSection.style.display = "block";
});

window.addEventListener("load", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (user) {
    loginSection.style.display = "none";
    registerSection.style.display = "none";
    appSection.style.display = "block";
  } else {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
    appSection.style.display = "none";
  }
});









