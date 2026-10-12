/* Interface behavior. Questions and explanatory copy remain in persona.html. */
document.addEventListener('DOMContentLoaded', () => {
    const all = selector => [...document.querySelectorAll(selector)];
    const fields = 'name age income function gender biography behaviour company-name sector company-size turnover marketing responsabilities report-to manager-of role pain goals criteria quotes objections awarness consideration action help marketing-message'.split(' ');
    const overview = document.querySelector('.overview');
    const walkthrough = document.querySelector('.walkthrough');
    const color = document.querySelector('#input-color');
    const resize = input => {
        if (input.matches('.overview textarea')) {
            input.style.height = 'auto';
            input.style.height = `${input.scrollHeight}px`;
        }
    };

    document.addEventListener('input', ({ target }) => {
        const field = fields.find(name => target.classList.contains(name));
        if (field) all(`.${field}`).forEach(input => {
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
        const button = target.closest('button, .delete-icon');
        if (!button) return;
        if (button.matches('.button-walk')) {
            walkthrough.style.display = 'none';
            overview.style.display = 'block';
            all('.overview textarea').forEach(resize);
        }
        if (button.matches('.next-button, .prev-button')) {
            const current = button.closest('section');
            const next = button.matches('.next-button') ? current.nextElementSibling : current.previousElementSibling;
            if (next) {
                current.classList.add('hide');
                next.classList.remove('hide');
            }
        }
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

    window.CreatePDFfromHTML = async () => {
        const button = document.querySelector('[onclick="CreatePDFfromHTML()"]');
        button.disabled = true;
        try {
            await exportPersonaPDF(document.querySelector('.printable'), color.value);
        } catch (error) {
            console.error('PDF export failed', error);
            alert('Unable to generate the PDF. Please try again.');
        } finally {
            button.disabled = false;
        }
    };
    if (window.innerWidth <= 980) {
        document.querySelector('#warningMessage').style.display = 'block';
        walkthrough.style.display = 'none';
    }
});
