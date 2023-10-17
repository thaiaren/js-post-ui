import postApi from './api/postApi';
import {
    initPagination,
    initSearch,
    renderPagination,
    renderPost,
} from './utils';

async function handleFilterChange(filterName, filterValue) {
    try {
        const url = new URL(window.location);
        url.searchParams.set(filterName, filterValue);

        if (filterName === 'title_like') url.searchParams.set('_page', 1);

        history.pushState({}, '', url);

        const { data, pagination } = await postApi.getAll(url.searchParams);
        renderPost(data);
        renderPagination('searchInput', pagination);
    } catch (error) {
        console.log(error);
    }
}

try {
    (async () => {
        const url = new URL(window.location);
        if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
        if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);

        history.pushState({}, '', url);
        const params = url.searchParams;

        initPagination({
            element: 'postsPagination',
            defaulParams: params,
            onchang: () => handleFilterChange('_page', page),
        });

        initSearch({
            elementId: 'searchInput',
            defaultParams: params,
            onchang: (value) => handleFilterChange('title_like', value),
        });

        const { data, pagination } = await postApi.getAll(params);
        renderPost(data);
        renderPagination('searchInput', pagination);
    })();
} catch (error) {
    console.log(error);
}
