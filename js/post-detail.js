import dayjs from 'dayjs';
import postApi from './api/postApi';
import { setTextContent, renderLightbox } from './utils';

function rederPostDetail(postDetail) {
    const postImage = document.getElementById('postHeroImage');
    if (postImage) postImage.style.background = `url(${postDetail.imageUrl})`;

    setTextContent(document, '#postDetailAuthor', postDetail.author);
    setTextContent(document, '#postDetailTitle', postDetail.title);
    setTextContent(document, '#postDetailDescription', postDetail.description);
    // setTextContent(document, '#goToEditPageLink', 'edit page');

    setTextContent(
        document,
        '#postDetailTimeSpan',
        dayjs(postDetail.updatedAt).format('- DD,MM,YYYY HH:mm'),
    );

    const editPage = document.getElementById('goToEditPageLink');
    if (editPage) {
        editPage.textContent = 'edit page';
        editPage.href = `/add-edit-post.html?id=${postDetail.id}`;
    }
}

(async () => {
    renderLightbox({
        modalId: 'lightbox',
        imgSelector: '[data-id ="imgLightbox"]',
        prevSelector: 'button[data-id ="prevLightbox"]',
        nextSelector: 'button[data-id ="nextLightbox"]',
    });

    try {
        const searchParams = new URLSearchParams(window.location.search);
        const paramId = searchParams.get('id');

        if (paramId) {
            const postDetail = await postApi.getById(paramId);
            rederPostDetail(postDetail);
        }
    } catch (error) {
        console.log(error);
    }
})();
