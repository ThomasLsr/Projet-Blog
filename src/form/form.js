import './../assets/styles/style.scss';
import './form.scss';

const form = document.querySelector("form");
const errorList = document.querySelector("#errors");
const btnCancel = document.querySelector('.btn-secondary');


const fillForm = (article) => {
    const author = document.querySelector('input[name="author"]');
    const image = document.querySelector('input[name="image"]');
    const category = document.querySelector('select[name="category"]');
    const title = document.querySelector('input[name="title"]');
    const content = document.querySelector("textarea");

    author.value = article.author || '';
    image.value = article.image || '';
    category.value = article.category || '';
    title.value = article.title || '';
    content.value = article.content || '';

}
const initForm = async () => {
    const params = new URL(location.href);
    const articleId = params.searchParams.get('id');

    if (articleId) {
        const response = await fetch(`https://restapi.fr/api/dwwm_tl/${articleId}`);
        if(response.status < 300) {
            const article = await response.json();
            fillForm(article);
        }

    }
    
}
initForm();

btnCancel.addEventListener('click', ()=> {
    location.assign('/index.html');
})
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
        if(response.status < 299) {
            location.assign('./index.html');
        }
        } catch (error) {
            console.error(error);
        }

        }
})

const formIsValid = (article) => {
    let errors = [];

    if (!article.author || !article.category || !article.content || !article.image || !article.title) {
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