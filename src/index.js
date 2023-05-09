import './index.scss';

const articlesContainer = document.querySelector('.articles-container');

const fetchArticles = async () => {
    try {
        const response = await fetch("https://restapi.fr/api/dwwm_tl");
        let articles = await response.json();

            if(!(articles instanceof Array)) {
                articles = [articles]
            }

        createArticles(articles);

    } catch (error) {
        console.error(error);
    }
}

const createArticles = (articles) => {
    const articlesDOM = articles.map(article => {
        const articleNode = document.createElement("div");
        articleNode.classList.add('article');
        articleNode.innerHTML = `
            <img src="${article.image ? article.image : "assets/images/default_profile.png"}" alt = "User picture">
             <h2>${article.title ? article.title : "Titre de l'article"}</h2>
             <p class="article-author">${article.author}- <span> ${
                new Date(article.createdAt)
                    .toLocaleDateString('fr-FR', {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    })}</span></p>
             <p class="article-content">${article.content}</p>
             <div class="article-actions">
                <button class="btn btn-primary" data-id= ${article._id}>Modifier</button>
                <button class="btn btn-danger" data-id= ${article._id}>Supprimer</button>
             </div>
        `
        return articleNode;
    })
    articlesContainer.innerHTML = '';
    articlesContainer.append(...articlesDOM);

    const deleteButtons = articlesContainer.querySelectorAll('.btn-danger');
    const editButtons = articlesContainer.querySelectorAll('.btn-primary');

    deleteButtons.forEach(button => {
        button.addEventListener('click', async event => {
            event.preventDefault();
            try {
                const target = event.target;
                const articleId = target.dataset.id;
                const response = await fetch(`https://restapi.fr/api/dwwm_tl/${articleId}`, {
                    method: 'DELETE'
                });
                const body = await response.json();
                fetchArticles();
            } catch (error) {
                console.error(error);
            }
        })
    })

    editButtons.forEach(button => {
        button.addEventListener('click', async event => {
            event.preventDefault();
            const target = event.target;

            const articleId = target.dataset.id;
            location.assign(`/form.html?id=${articleId}`);
        })
    })


}

fetchArticles();