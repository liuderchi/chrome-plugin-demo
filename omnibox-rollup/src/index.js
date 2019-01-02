import FAVORITE_SITES from './favoriteSites';

const getCurrentTabId = callback => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
};
const openUrlCurrentTab = url => {
  getCurrentTabId(tabId => {
    chrome.tabs.update(tabId, { url });
  });
};
const openUrlNewTab = url => {
  chrome.tabs.create({ url });
};

const mapSiteToSuggestion = (site) /* :{name: string, url: string} */ => ({
  content: site.url,
  description: `🐙 ${site.name} - ${site.url}`,
});
const getGitHubSearchSuggestion = (keyword) /* :string */ => ({
  content: `https://github.com/search?q=${keyword}&ref=opensearch`,
  description: `🔎 Search '${keyword}' in GitHub`,
});

// add listener to omnibox
chrome.omnibox.onInputChanged.addListener((inputText, suggest) => {
  console.log(`inputChanged: ${inputText}`);
  if (!inputText) return;
  if (/^gh/i.test(inputText)) {
    const matchRes = inputText.match(/^gh\W+(.+)/);
    if (matchRes !== null) {
      const keyword = matchRes[1];
      const filteredSites = FAVORITE_SITES.GH.filter(
        site => site.name.indexOf(keyword) > -1,
      );
      suggest(
        filteredSites
          .map(mapSiteToSuggestion)
          .concat(getGitHubSearchSuggestion(keyword)),
      );
    }
  } else if (/^b/i.test(inputText)) {
    // TODO search in chrome bookmarks
  }
});
chrome.omnibox.onInputEntered.addListener(inputText => {
  console.log(`inputEntered: ${inputText}`);
  if (!inputText) return;

  openUrlCurrentTab(inputText);
});
