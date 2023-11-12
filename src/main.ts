import './css/style.css';
import FullList from './model/FullList';
import ListItem from './model/ListItem';
import ListTemplates from './templates/ListTemplates';

const initializeApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplates.instance;

  const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement | null;
  const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement | null;

  if (!itemEntryForm || !clearItems) {
    console.error('Error: Could not find required elements.');
    return;
  }

  itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();
    const input = document.getElementById('newItem') as HTMLInputElement | null;

    if (!input) {
      console.error('Error: Could not find input element.');
      return;
    }

    const newEntryText: string = input.value.trim();
    if (!newEntryText) return;

    const itemId: number = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1;
    const newItem = new ListItem(itemId.toString(), newEntryText);

    fullList.addItem(newItem);
    template.render(fullList);
  });

  clearItems.addEventListener('click', (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener('DOMContentLoaded', initializeApp);
