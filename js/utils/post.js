// import { lengthConten, setTextContent } from './common.js';

import { lengthConten, setTextContent } from './common';

export function createPostList(postItem, element) {
    // console.log(postItem);
    const postTemplate = document.getElementById('postTemplate');
    if (!postTemplate) return;
    const liPostList = postTemplate.content.firstElementChild.cloneNode(true);

    // update title, thumbnail, description, author, timeSpan

    setTextContent(liPostList, '[data-id="title"]', postItem.title);
    setTextContent(
        liPostList,
        '[data-id="description"]',
        lengthConten(200, postItem.description),
    );
    setTextContent(liPostList, '[data-id="author"]', postItem.author);

    const thumbnail = liPostList.querySelector('[data-id = "thumbnail"]');
    if (thumbnail) {
        thumbnail.src = postItem.imageUrl;
        thumbnail.addEventListener('error', () => {
            thumbnail.src = 'https://placehold.co/600x400';
        });
    }

    // go to post detail when
    const div = liPostList.firstElementChild;
    const menu = liPostList.querySelector('[data-id="menu"]');

    if (!div || !menu) return;
    div.addEventListener('click', (e) => {
        if (menu.contains(e.target) && menu) return;
        console.log('div');
        // window.location.assign(`post-detail.html?id=${postItem.id}`);
    });

    // handle edit click
    const edit = menu.querySelector('[data-id="edit"]');
    edit.addEventListener('click', () => {
        window.location.assign(`/add-edit-post.html?id=${postItem.id}`);
    });

    return liPostList;
}

export function renderPost(posts) {
    if (!Array.isArray(posts) || posts.length === 0) return;
    if (!posts) return;
    const ulElementPostList = document.getElementById('postList');
    if (!ulElementPostList) return;

    ulElementPostList.textContent = ' ';

    posts.forEach((item) => {
        const liElement = createPostList(item);
        if (liElement) {
            ulElementPostList.appendChild(liElement);
        }
    });
}
