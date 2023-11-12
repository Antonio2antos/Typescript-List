import FullList from '../model/FullList';

interface DomList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplates implements DomList {
  ul: HTMLUListElement;

  static instance: ListTemplates = new ListTemplates();

  private constructor() {
    this.ul = document.getElementById('listItems') as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = '';
  }

  render(fullList: FullList): void {
    this.clear();

    if (fullList.list.length === 0) {
      // Adicione lógica para lidar com a lista vazia, se necessário.
      return;
    }

    fullList.list.forEach((item) => {
      const li = document.createElement('li') as HTMLLIElement;
      li.className = 'Item';

      const check = document.createElement('input') as HTMLInputElement;
      // ... (código para a criação do checkbox)

      // Delegação de eventos para o elemento pai (ul)
      li.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
          item.checked = !item.checked;
          fullList.save();
        }
      });

      // ... (código para a criação do label)

      // Delegação de eventos para o elemento pai (ul)
      li.addEventListener('click', (event) => {
        if (event.target instanceof HTMLButtonElement) {
          fullList.removeItem(item.id);
          this.render(fullList);
        }
      });

      this.ul.append(li);
    });
  }
}

