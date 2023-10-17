import debounce from 'lodash.debounce';
export function initSearch({ elementId, defaultParams, onchang }) {
    const searchInput = document.getElementById(elementId);

    if (!searchInput) return;

    if (defaultParams.get('title_like')) {
        searchInput.value = defaultParams.get('title_like');
    }

    const debouneSeacrch = debounce((e) => {
        onchang?.(e.target.value);
    }, 500);
    searchInput.addEventListener('input', debouneSeacrch);
}
