/* One local draft, restored without inserting saved HTML. */
function setupPersonaStorage({ decorate, applyColor, resize }) {
    const key = 'alanlouette.persona.draft.v1';
    const status = document.querySelector('#save-status');
    const overview = document.querySelector('.overview');
    const walkthrough = document.querySelector('.walkthrough');
    const lists = [...document.querySelectorAll('#sortable-list, #sortable-list-2')];
    let timer, reset = false;
    const snapshot = () => ({
        version: 1,
        fields: Object.fromEntries([...walkthrough.querySelectorAll('[data-field]')].map(input => [input.dataset.field, input.value])),
        color: document.querySelector('#input-color').value,
        avatar: document.querySelector('#avatar-image').getAttribute('src'),
        logo: document.querySelector('#pdf-logo-preview').getAttribute('src'),
        view: overview.hidden ? 'walkthrough' : 'overview',
        step: Number(walkthrough.querySelector('section:not([hidden])').id),
        lists: lists.map(list => [...list.children].map(item => {
            if (item.matches('h3')) return { heading: item.textContent };
            if (item.matches('.justify-center')) return { avatar: true };
            const field = item.querySelector('[data-field]');
            return field ? { field: field.dataset.field } : {
                title: item.querySelector('.new-title').value,
                text: item.querySelector('textarea').value
            };
        }))
    });
    const save = () => {
        clearTimeout(timer);
        if (reset) return;
        try {
            localStorage.setItem(key, JSON.stringify(snapshot()));
            status.textContent = 'Saved on this browser';
        } catch {
            status.textContent = 'Could not save on this browser. Keep this page open or export your PDF.';
        }
    };
    const schedule = () => {
        status.textContent = 'Saving…';
        clearTimeout(timer);
        timer = setTimeout(save, 300);
    };
    try {
        const draft = JSON.parse(localStorage.getItem(key) || 'null');
        if (draft?.version === 1 && draft.fields && Array.isArray(draft.lists) && draft.lists.length === 2) {
            document.querySelectorAll('[data-field]').forEach(input => input.value = String(draft.fields[input.dataset.field] ?? ''));
            document.querySelectorAll('[data-persona-name]').forEach(label => label.textContent = String(draft.fields.name || '').trim());
            if (/^#[0-9a-f]{6}$/i.test(draft.color)) document.querySelector('#input-color').value = draft.color;
            if (draft.avatar?.startsWith('data:image/')) document.querySelectorAll('.avatar, #avatar-image').forEach(img => img.src = draft.avatar);
            if (draft.logo?.startsWith('data:image/')) {
                const logo = document.querySelector('#pdf-logo-preview');
                logo.src = draft.logo; logo.hidden = false;
                document.querySelector('#remove-pdf-logo').hidden = false;
            }
            lists.forEach((list, index) => {
                const known = new Map([...list.querySelectorAll('div.dragable-item')].map(item => [item.querySelector('[data-field]')?.dataset.field, item]));
                const avatar = list.querySelector('.justify-center');
                const headings = new Map([...list.querySelectorAll('h3')].map(item => [item.textContent, item]));
                const items = draft.lists[index].map(entry => {
                    if (entry.avatar) return avatar;
                    if (entry.heading) return headings.get(entry.heading);
                    if (entry.field) return known.get(entry.field);
                    if (typeof entry.title !== 'string' || typeof entry.text !== 'string') return null;
                    const item = document.createElement('div'); item.className = 'dragable-item';
                    const label = document.createElement('label');
                    const title = document.createElement('input'); title.type = 'text'; title.className = 'new-title'; title.value = entry.title;
                    const text = document.createElement('textarea'); text.className = 'big-textarea'; text.placeholder = 'Insert your text here'; text.value = entry.text;
                    label.append(title); item.append(label, text); decorate(item); return item;
                }).filter(Boolean);
                list.replaceChildren(...items);
            });
            const step = Number.isInteger(draft.step) && draft.step >= 1 && draft.step <= 8 ? draft.step : 1;
            walkthrough.querySelectorAll('section').forEach(section => section.hidden = Number(section.id) !== step);
            overview.hidden = draft.view !== 'overview'; walkthrough.hidden = !overview.hidden;
            applyColor(); document.querySelectorAll('.overview textarea').forEach(resize);
            status.textContent = 'Persona restored · saved on this browser';
        }
    } catch {
        status.textContent = 'Saved draft could not be restored. Changes will start a new draft.';
    }
    document.addEventListener('input', schedule);
    document.addEventListener('change', schedule);
    document.addEventListener('persona-change', schedule);
    document.addEventListener('click', event => {
        if (event.target.closest('.button-walk, .next-button, .prev-button, .delete-icon, #add-item-btn, #remove-pdf-logo')) schedule();
    });
    window.addEventListener('pagehide', save);
    document.querySelector('#new-persona').addEventListener('click', () => {
        if (!confirm('Start a new persona? Your saved draft on this browser will be deleted.')) return;
        try { localStorage.removeItem(key); } catch { status.textContent = 'Could not clear the saved draft.'; return; }
        reset = true; clearTimeout(timer); location.reload();
    });
}
