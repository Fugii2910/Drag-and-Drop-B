// Seleção dos elementos
const cards = document.querySelectorAll('.card');
const dropzones = document.querySelectorAll('.card-list');

// Configuração dos eventos de drag nos cartões existentes
cards.forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

function dragStart(event) {
  // Guarda o ID do cartão que está a ser arrastado
  event.dataTransfer.setData('text/plain', event.target.id);

  // Adiciona uma classe temporária para feedback visual
  setTimeout(() => {
    event.target.classList.add('dragging');
  }, 0);
}

function dragEnd(event) {
  // Remove a classe de arraste ao finalizar
  event.target.classList.remove('dragging');
}

// Configuração dos eventos de drop nas zonas de destino (.card-list)
dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', dragOver);
  dropzone.addEventListener('dragenter', dragEnter);
  dropzone.addEventListener('dragleave', dragLeave);
  dropzone.addEventListener('drop', drop);
});

function dragOver(event) {
  // Permite que o elemento seja largado nesta área
  event.preventDefault();
}

function dragEnter(event) {
  event.preventDefault();
}

function dragLeave(event) {
  // Opcional: remover destaque visual se for aplicado via CSS
}

function drop(event) {
  event.preventDefault();

  // Recupera o ID do cartão a partir do dataTransfer
  const cardId = event.dataTransfer.getData('text/plain');
  const card = document.getElementById(cardId);

  // Garante que o elemento é inserido na área correta (.card-list)
  let targetArea = event.target;
  if (!targetArea.classList.contains('card-list')) {
    targetArea = targetArea.closest('.card-list');
  }

  if (targetArea && card) {
    // Move o cartão para a nova lista
    targetArea.appendChild(card);

    // Identifica a coluna pai para aplicar a regra do traçado
    const parentColumn = targetArea.closest('.kanban-column');

    // Se for largado na coluna 'Concluído', adiciona a classe .concluido; caso contrário, remove
    if (parentColumn && parentColumn.id === 'coluna-concluido') {
      card.classList.add('concluido');
    } else {
      card.classList.remove('concluido');
    }
  }
}