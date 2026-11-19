// Global searchConfig

document.addEventListener('DOMContentLoaded', () => {

  const input = document.querySelector('.search-input');
  const container = document.querySelector('.search-result-container');
  const popup = document.querySelector('.search-popup');
  const searchButton = document.querySelector('.search-btn');
  let popupStateVersion = 0;

  const localSearch = new LocalSearch({
    path             : searchConfig.path,
    top_n_per_article: searchConfig.top_n_per_article,
    unescape         : searchConfig.unescape
  });

  if (searchConfig.preload) {
    // preload the search data when the page loads
    console.log("loading page");
    localSearch.fetchData();
  }

  function openSearchPopup() {
    if (popup.open) return;
    // Invalidates pending cleanup if the dialog is reopened during its exit transition.
    popupStateVersion += 1;
    popup.showModal();
    document.documentElement.classList.add('search-open');
    input.focus();
    if (!localSearch.isfetched) {
      localSearch.fetchData();
    } 
  }

  function closeSearchPopup() {
    if (!popup.open) return;
    const closeVersion = ++popupStateVersion;
    popup.close();

    // Keep the viewport width stable until the exit transition finishes.
    const exitTransitions = popup.getAnimations({ subtree: true });
    Promise.all(exitTransitions.map(animation => animation.finished.catch(() => {}))).then(() => {
      if (closeVersion === popupStateVersion && !popup.open) {
        document.documentElement.classList.remove('search-open');
      }
    });

    // refresh search box
    input.value = '';
    container.innerHTML = `<div class="search-result-message" ></div>`;
    searchButton.focus();
  }

  // open search box
  searchButton.addEventListener('click', openSearchPopup);

  // close search box
  document.querySelector('.search-popup-overlay').addEventListener('click', closeSearchPopup);
  document.querySelector('.search-close-btn').addEventListener('click', closeSearchPopup);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && popup.open) {
      closeSearchPopup();
    }
  });

  function displaySearchResult() {
    if (!localSearch.isfetched) return;
    const searchText = input.value.trim().toLowerCase();
    const keywords = searchText.split(/[-\s]+/);
    let resultItems = [];
    if (searchText.length > 0) {
      resultItems = localSearch.getResultItems(keywords);
    }

    if (keywords.length === 1 && keywords[0] === '') {
      // no input
      container.innerHTML = `<div class="search-result-message" ></div>`
    } else if (resultItems.length === 0) {
      // no result
      container.innerHTML = `<div class="search-result-message" >No result found</div>`;
    } else {
      // display result(s)
      container.innerHTML = `
      <div class="search-result-message">${resultItems.length} result(s) found</div>
      <ul class="search-result-list">${resultItems.map(result => result.item).join('<div class="h-line-secondary"></div>')}
      </ul>`;
    }

  };

  if (searchConfig.trigger == 'auto') {
    // whenever there is input, update search result
    input.addEventListener('input', displaySearchResult);
  } else {
    // update search result when press "enter"
    input.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        displaySearchResult();
      }
    })
  }
  window.addEventListener('search:loaded', displaySearchResult);
});
  
