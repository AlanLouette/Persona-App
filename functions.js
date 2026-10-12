/* Interface behavior; markup comes from persona-render.js and persona-data.js. */
document.addEventListener('DOMContentLoaded', () => {
    renderPersona();
    const all = selector => [...document.querySelectorAll(selector)];
    const overview = document.querySelector('.overview');
    const walkthrough = document.querySelector('.walkthrough');
    const color = document.querySelector('#input-color');
    const resize = input => {
        if (input.matches('.overview textarea')) {
            input.style.height = 'auto';
            input.style.height = `${input.scrollHeight}px`;
        }
    };

    // Keep the filled form in the DOM so moving between views preserves answers.
    const showOverview = () => {
        walkthrough.hidden = true;
        overview.hidden = false;
        all('.overview textarea').forEach(resize);
        window.scrollTo(0, 0);
        document.querySelector('#overview-title').focus({ preventScroll: true });
    };
    const changeStep = button => {
        const current = button.closest('section');
        const next = button.matches('.next-button') ? current.nextElementSibling : current.previousElementSibling;
        if (!next) return;
        current.hidden = true;
        next.hidden = false;
        next.querySelector('.right input, .right textarea, .right select')?.focus();
    };

    document.addEventListener('input', ({ target }) => {
        const field = target.dataset.field;
        if (field) all(`[data-field="${field}"]`).forEach(input => {
            input.value = target.value;
            resize(input);
        });
        resize(target);
    });

    document.querySelector('#avatar-input').addEventListener('change', ({ target }) => {
        const file = target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => all('#avatar-image, .avatar').forEach(img => img.src = reader.result);
        reader.readAsDataURL(file);
    });

    document.addEventListener('click', ({ target }) => {
        if (target.closest('[data-action="choose-avatar"]')) {
            document.querySelector('#avatar-input').click();
        }
        const button = target.closest('button, .delete-icon');
        if (!button) return;
        if (button.matches('.button-walk')) showOverview();
        if (button.matches('.next-button, .prev-button')) changeStep(button);
        if (button.matches('.delete-icon')) button.closest('.dragable-item').remove();
    });

    const decorate = item => {
        item.insertAdjacentHTML('beforeend', '<span class="drag-handle" aria-hidden="true">⠿</span><button type="button" class="delete-icon" aria-label="Delete section">×</button>');
        item.style.color = color.value;
    };
    all('div.dragable-item:not(.add-item)').forEach(decorate);
    all('#sortable-list, #sortable-list-2').forEach(list => new Sortable(list, {
        animation: 200,
        draggable: '.dragable-item, .justify-center',
        handle: '.drag-handle, .avatar',
        filter: 'input, textarea, select, button',
        preventOnFilter: false
    }));

    document.querySelector('#add-item-btn').addEventListener('click', () => {
        const item = document.createElement('div');
        item.className = 'dragable-item';
        item.innerHTML = '<label><input type="text" class="new-title" value="Insert your title"></label><textarea class="big-textarea" placeholder="Insert your text here"></textarea>';
        decorate(item);
        document.querySelector('#sortable-list-2').append(item);
        item.querySelector('input').focus();
    });
    const applyColor = () => {
        overview.style.setProperty('--persona-color', color.value);
        all('.dragable-item, .colors').forEach(item => item.style.color = color.value);
    };
    color.addEventListener('input', applyColor);
    color.addEventListener('change', applyColor);
    applyColor();

    const exportButton = document.querySelector('#generate-pdf');
    exportButton.addEventListener('click', async () => {
        const button = exportButton;
        button.disabled = true;
        try {
            await exportPersonaPDF(document.querySelector('.printable'), color.value);
        } catch (error) {
            console.error('PDF export failed', error);
            alert('Unable to generate the PDF. Please try again.');
        } finally {
            button.disabled = false;
        }
    });
});
