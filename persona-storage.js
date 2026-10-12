/* A local persona library. JSON imports are validated and rendered as text. */
function setupPersonaStorage({ decorate, applyColor, resize, applyContext }) {
    const key = 'alanlouette.persona.library.v1';
    const legacyKey = 'alanlouette.persona.draft.v1';
    const picker = document.querySelector('#saved-personas');
    let library;
    const status = document.querySelector('#save-status');
    const overview = document.querySelector('.overview');
    const walkthrough = document.querySelector('.walkthrough');
    const lists = [...document.querySelectorAll('#sortable-list, #sortable-list-2')];
    let timer, reset = false;
    const snapshot = () => ({
        version: 1,
        fields: Object.fromEntries([...document.querySelectorAll('[data-field]')].map(input => [input.dataset.field, input.value])),
        color: document.querySelector('#input-color').value,
        avatar: document.querySelector('#avatar-image').getAttribute('src'),
        logo: document.querySelector('#pdf-logo-preview').getAttribute('src'),
        view: overview.hidden ? 'walkthrough' : 'overview',
        step: Number(walkthrough.querySelector('section:not([hidden])').id),
        lists: lists.map(list => [...list.children].map(item => {
            if (item.matches('h3')) return { heading: item.textContent, step: item.dataset.step };
            if (item.matches('.justify-center')) return { avatar: true };
            const field = item.querySelector('[data-field]');
            return field ? { field: field.dataset.field } : {
                title: item.querySelector('.new-title').value,
                text: item.querySelector('textarea').value
            };
        }))
    });
    const empty = snapshot();
    const id = () => crypto.randomUUID();
    const refreshPicker = () => {
        picker.replaceChildren(...library.items.map(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.draft.fields.name?.trim() || 'Untitled persona';
            if (item.draft.fields['company-name']?.trim()) option.textContent += ` · ${item.draft.fields['company-name'].trim()}`;
            return option;
        }));
        picker.value = library.active;
    };
    const write = next => {
        try {
            const encoded = JSON.stringify(next);
            const legacy = localStorage.getItem(legacyKey);
            try { localStorage.setItem(key, encoded); }
            catch (error) {
                if (!legacy) throw error;
                // Reclaim the old draft's space during migration; restore it if writing fails.
                localStorage.removeItem(legacyKey);
                try { localStorage.setItem(key, encoded); }
                catch (retryError) { localStorage.setItem(legacyKey, legacy); throw retryError; }
            }
            if (legacy) localStorage.removeItem(legacyKey);
            library = next; refreshPicker();
            status.textContent = 'Saved on this browser';
            return true;
        } catch {
            status.textContent = 'Could not save on this browser. Export your persona to keep a copy.';
            return false;
        }
    };
    const save = () => {
        clearTimeout(timer);
        if (reset || !library) return false;
        const draft = snapshot();
        return write({ ...library, items: library.items.map(item => item.id === library.active ? { ...item, draft } : item) });
    };
    const schedule = () => {
        status.textContent = 'Saving…';
        clearTimeout(timer);
        timer = setTimeout(save, 300);
    };
    try {
        library = JSON.parse(localStorage.getItem(key) || 'null');
        if (!library || library.version !== 1 || !Array.isArray(library.items) || !library.items.length) {
            const draft = JSON.parse(localStorage.getItem(legacyKey) || 'null') || empty;
            const active = id(); library = { version: 1, active, items: [{ id: active, draft }] };
        }
        if (!library.items.some(item => item.id === library.active)) library.active = library.items[0].id;
        refreshPicker();
        const draft = library.items.find(item => item.id === library.active).draft;
        if (draft?.version === 1 && draft.fields && Array.isArray(draft.lists) && draft.lists.length === 2) {
            document.querySelectorAll('[data-field]').forEach(input => {
                if (Object.hasOwn(draft.fields, input.dataset.field)) input.value = String(draft.fields[input.dataset.field]);
            });
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
                const headings = new Map([...list.querySelectorAll('h3')].flatMap(item => [[item.textContent, item], [item.dataset.step, item]]));
                const items = draft.lists[index].map(entry => {
                    if (entry.avatar) return avatar;
                    if (entry.heading) return headings.get(entry.step) || headings.get(entry.heading);
                    if (entry.field) return known.get(entry.field);
                    if (typeof entry.title !== 'string' || typeof entry.text !== 'string') return null;
                    const item = document.createElement('div'); item.className = 'dragable-item';
                    const label = document.createElement('label');
                    const title = document.createElement('input'); title.type = 'text'; title.className = 'new-title'; title.value = entry.title;
                    const text = document.createElement('textarea'); text.className = 'big-textarea'; text.placeholder = 'Insert your text here'; text.value = entry.text;
                    label.append(title); item.append(label, text); decorate(item); return item;
                }).filter(Boolean);
                // Add questions introduced after the single-draft version.
                if (index === 1) ['purchase-budget', 'purchase-context'].forEach(key => {
                    if (!Object.hasOwn(draft.fields, key) && known.has(key)) {
                        const position = items.findIndex(item => item.querySelector('[data-field="marketing"]') || item.matches('h3[data-step="3"]'));
                        items.splice(position < 0 ? items.length : position, 0, known.get(key));
                    }
                });
                list.replaceChildren(...items);
            });
            const step = Number.isInteger(draft.step) && draft.step >= 1 && draft.step <= 8 ? draft.step : 1;
            walkthrough.querySelectorAll('section').forEach(section => section.hidden = Number(section.id) !== step);
            overview.hidden = draft.view !== 'overview'; walkthrough.hidden = !overview.hidden;
            applyColor(); applyContext(); document.querySelectorAll('.overview textarea').forEach(resize);
            status.textContent = 'Persona restored · saved on this browser';
        }
    } catch {
        const active = id(); library = { version: 1, active, items: [{ id: active, draft: empty }] };
        refreshPicker();
        status.textContent = 'Saved draft could not be restored. Export any browser backup before starting again.';
    }
    document.addEventListener('input', schedule);
    document.addEventListener('change', schedule);
    document.addEventListener('persona-change', schedule);
    document.addEventListener('click', event => {
        if (event.target.closest('.button-walk, .next-button, .prev-button, .delete-icon, #add-item-btn, #remove-pdf-logo')) schedule();
    });
    window.addEventListener('pagehide', save);
    const open = next => {
        if (!write(next)) return;
        reset = true; clearTimeout(timer); location.reload();
    };
    picker.addEventListener('change', () => {
        const selected = picker.value;
        if (!save()) { picker.value = library.active; return; }
        open({ ...library, active: selected });
    });
    document.querySelector('#new-persona').addEventListener('click', () => {
        if (!save()) return;
        const active = id();
        open({ ...library, active, items: [...library.items, { id: active, draft: empty }] });
    });
    document.querySelector('#delete-persona').addEventListener('click', () => {
        if (!confirm('Delete this persona from this browser?')) return;
        const items = library.items.filter(item => item.id !== library.active);
        if (!items.length) items.push({ id: id(), draft: empty });
        open({ version: 1, active: items[0].id, items });
    });
    document.querySelector('#export-persona').addEventListener('click', () => {
        const draft = snapshot();
        const blob = new Blob([JSON.stringify({ format: 'alanlouette-persona', version: 1, persona: draft }, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a'); link.href = url;
        link.download = `${(draft.fields.name || 'persona').replace(/[^a-z0-9_-]/gi, '-').slice(0, 60)}.json`;
        link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    const importFile = document.querySelector('#import-persona-file');
    document.querySelector('#import-persona').addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', async () => {
        try {
            const file = importFile.files[0];
            if (!file) return;
            if (file.size > 15 * 1024 * 1024) throw Error('File is too large.');
            const data = JSON.parse(await file.text());
            const draft = validatePersonaImport(data);
            await Promise.all([draft.avatar, draft.logo].filter(src => src?.startsWith('data:')).map(async src => {
                const image = new Image(); image.src = src; await image.decode();
            }));
            if (!save()) return;
            const active = id();
            open({ ...library, active, items: [...library.items, { id: active, draft }] });
        } catch {
            clearTimeout(timer);
            status.textContent = 'Could not import this file. Choose a JSON export from this app.';
        } finally { importFile.value = ''; }
    });
}

function validatePersonaImport(data) {
    const draft = data?.persona;
    const keys = new Set([...personaSteps.flatMap(step => step.fields.map(field => field.key)), 'buyer-context']);
    const text = value => typeof value === 'string' && value.length <= 50000;
    const image = value => value === null || value === 'default-avatar.svg' || (typeof value === 'string' && /^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(value));
    if (data?.format !== 'alanlouette-persona' || data.version !== 1 || draft?.version !== 1 ||
        !draft.fields || typeof draft.fields !== 'object' || Array.isArray(draft.fields) ||
        !Object.entries(draft.fields).every(([key, value]) => keys.has(key) && text(value)) ||
        !['B2B', 'B2C', 'B2B2C'].includes(draft.fields.marketing) ||
        !['walkthrough', 'overview'].includes(draft.view) || !Number.isInteger(draft.step) || draft.step < 1 || draft.step > 8 ||
        !/^#[0-9a-f]{6}$/i.test(draft.color) || !image(draft.avatar) || !image(draft.logo) ||
        !Array.isArray(draft.lists) || draft.lists.length !== 2) throw Error('Invalid persona');
    const profileKeys = new Set(personaSteps.slice(0, 2).flatMap(step => step.fields.map(field => field.key)));
    const seen = new Set();
    draft.lists.forEach((list, index) => {
        if (!Array.isArray(list) || list.length > 150) throw Error('Invalid sections');
        list.forEach(entry => {
            if (!entry || typeof entry !== 'object') throw Error('Invalid section');
            if (entry.field) {
                if (!keys.has(entry.field) || entry.field === 'buyer-context' || profileKeys.has(entry.field) !== (index === 0) || seen.has(entry.field)) throw Error('Invalid field');
                seen.add(entry.field);
            } else if (entry.avatar === true) {
                if (index !== 0 || seen.has('avatar')) throw Error('Invalid avatar'); seen.add('avatar');
            } else if (entry.heading) {
                if (!text(entry.heading) || (entry.step && !/^[2-7]$/.test(entry.step))) throw Error('Invalid heading');
            } else if (!text(entry.title) || !text(entry.text)) throw Error('Invalid text');
        });
    });
    return draft;
}
