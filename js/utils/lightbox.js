function showModal(modal) {
    var myModal = new window.bootstrap.Modal(modal);
    myModal.show();
}

export function renderLightbox({
    modalId,
    imgSelector,
    prevSelector,
    nextSelector,
}) {
    const modalElement = document.getElementById(modalId);
    // console.log(modalElement);
    if (!modalElement) return;

    const imgElement = modalElement.querySelector(imgSelector);
    const prevElement = modalElement.querySelector(prevSelector);
    const nextElement = modalElement.querySelector(nextSelector);
    if (!imgElement || !prevElement || !nextElement) return;

    let imgAlbum = [];
    let index = 0;

    function showImgIndex(index) {
        imgElement.src = imgAlbum[index].src;
    }
    document.addEventListener('click', (e) => {
        const { target } = e;
        if (!target.tagName === 'IMG' || !target.dataset.album) return;

        imgAlbum = document.querySelectorAll(
            `[data-album=${target.dataset.album}]`,
        );

        index = [...imgAlbum].findIndex((imgItem) => imgItem === target);

        showImgIndex(index);
        showModal(modalElement);
    });

    prevElement.addEventListener('click', () => {
        index--;
        if (index < 0) index = imgAlbum.length - 1;
        showImgIndex(index);
    });
    nextElement.addEventListener('click', () => {
        index++;
        if (index > imgAlbum.length - 1) index = 0;
        showImgIndex(index);
    });
}
