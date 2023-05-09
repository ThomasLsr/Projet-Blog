import './../assets/styles/style.scss';
import './form.scss';

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");
let errors = [];


form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const entries = formData.entries();
    const article = Object.fromEntries(entries);

    if(formIsValid(article)) {
        try {
            const json = JSON.stringify(article);
            const response = await fetch('https://restapi.fr/api/dwwm_tl', {
                method: 'POST',
                body: json,
                headers: {
                    'Content-Type' : 'application/json'
                }
            });
            
            const body = await response.json();
            form.reset();
            console.log(body);
        } catch (error) {
            console.error(error);
        }

        }
});

const formIsValid = (article) => {
    if (!article.author || !article.category || !article.content) {
        errors.push("Vous devez renseigner tous les champs!");
    } else {
        errors = [];
    }

    if (errors.length) {
        let errorHTML = '';
        errors.forEach(error => {
            errorHTML += `<li>${error}</li>`
        });
        errorList.innerHTML = errorHTML;
        return false;
    } else {
        errorList.innerHTML = '';
        return true;
    }
    
}