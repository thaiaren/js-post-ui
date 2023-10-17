export function initPagination(elementId, defaultParams, onchang) {
    const postsPagination = document.getElementById(elementId);
    if (!postsPagination) return;

    const prevLink = postsPagination.firstElementChild;
    const nextLink = postsPagination.lastElementChild;

    if (prevLink) {
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(postsPagination.dataset.page);
            if (page > 1) onchang(page - 1);
        });
    }
    if (nextLink) {
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(postsPagination.dataset.page);
            if (page < postsPagination.dataset.totalRows) onchang(page + 1);
        });
    }
}

export function renderPagination(elementId, pagination) {
    const { _page, _limit, _totalRows } = pagination;
    const totalPanigation = Math.ceil(_totalRows / _limit);
    const postsPagination = document.getElementById(elementId);

    postsPagination.dataset.page = _page;
    postsPagination.dataset.limit = _limit;
    postsPagination.dataset.totalRows = totalPanigation;

    if (_page <= 1) {
        postsPagination.firstElementChild?.classList.add('disabled');
    } else {
        postsPagination.firstElementChild?.classList.remove('disabled');
    }
    if (_page >= totalPanigation) {
        postsPagination.lastElementChild?.classList.add('disabled');
    } else {
        postsPagination.lastElementChild?.classList.remove('disabled');
    }
}
