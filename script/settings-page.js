
const selectors = {
    stateJson: '#state',
    emptyState: '.empty-state',
    settingsTable: '.settings-table',
    createSettingButton: '[aria-controls="create-setting"]',
    settingsList: '.settings-list',
    settingTemplate: '#setting-line-template',
    settingLine: '.setting-line',
    settingLink: '.setting-link',
    settingStatusBadge: '.setting-status-badge',
    settingRemoveButton: '[aria-controls="create-remove"]'
}

const initialState = document.querySelector(selectors.stateJson).textContent;

const state = JSON.parse(initialState);

function createSettingHandler() {

}


param {Object} settingLineElement - The setting line element to remove.


function removeSettingHandler(settingLineElement) {
    settingLineElement.remove();
    const settingIndexToRemove = state.settings.findIndex((setting) => setting.id === settingLineElement.id);
    state.settings.splice(settingIndexToRemove, 1);
    toggleEmptyState();
}

param {Object} setting - The setting object to render

function renderSettingElement(setting) {
    const settingTemplateElement = document.querySelector(selectors.settingTemplate);
    console.log('✌settingTemplateElement --->', settingTemplateElement);

    const settingTemplateElementCopy = settingTemplateElement.cloneNode(true);


    settingTemplateElementCopy.id = setting.id;
    const settingLinkElement = settingTemplateElementCopy.querySelector(selectors.settingLink);
    const settingUrl = `setting.html?id=${setting.id}`;
    settingLinkElement.href = settingUrl;
    settingLinkElement.innerText = setting.title;
    const settingStatusBadgeElement = settingTemplateElementCopy.querySelector(selectors.settingStatusBadge);
    settingStatusBadgeElement.innerText = setting.status;

    if (setting.status === 'active') {
        settingStatusBadgeElement.classList.add('active');
    } else {
        settingStatusBadgeElement.classList.remove('active');
    }
    const settingRemoveButtonElement = settingTemplateElementCopy.querySelector(selectors.settingRemoveButton);
    
    settingRemoveButtonElement.addEventListener('click', () => {
        removeSettingHandler(settingTemplateElementCopy);
    });
    settingTemplateElementCopy.classList.remove('hidden');
    
    const settingsListElement = document.querySelector(selectors.settingsList);
    console.log('✌settingsListElement --->', settingsListElement);
    settingsListElement.appendChild(settingTemplateElementCopy);
}

function toggleEmptyState() {
    const emptyStateElement = document.querySelector(selectors.emptyState);
    const settingsTable = document.querySelector(selectors.settingsTable);
    if (state.settings.length === 0) {
        emptyStateElement.classList.remove('hidden');
        settingsTable.classList.add('hidden');
    } else {
        emptyStateElement.classList.add('hidden');
        settingsTable.classList.remove('hidden');
    }
}

toggleEmptyState();

state.settings.forEach(setting => {

    renderSettingElement(setting);
});