(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.get('id'));
})();
