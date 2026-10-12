/* Render both views from the same field definitions before behavior is attached. */
function renderPersona() {
    const escape = value => String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
    const fieldHTML = (field, view) => {
        const id = `${view}-${field.key}`;
        const attributes = `id="${id}" data-field="${field.key}" class="${field.key}${field.size ? ` ${field.size}-textarea` : ''}"`;
        let control;
        if (field.type === 'select') {
            control = `<select ${attributes} name="marketing-type">${field.options.map(option => `<option value="${escape(option)}">${escape(option)}</option>`).join('')}</select>`;
        } else if (field.type === 'textarea') {
            control = `<textarea ${attributes} placeholder="${escape(field.placeholder)}"></textarea>`;
        } else {
            control = `<input ${attributes} type="text">`;
        }
        return `<label for="${id}">${escape(field.label)}</label>${control}`;
    };
    const ordinals = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
    document.querySelector('.walk-container').innerHTML = personaSteps.map((step, index) => `
        <section id="${index + 1}" class="${ordinals[index]}-page" ${index ? 'hidden' : ''}>
            <div class="column left ${index === 0 ? 'curve' : index === 1 ? 'blue' : ''}">
                <div class="column-padding">
                    <div class="selected-avatar-wrapper">
                        <img class="avatar walkthrough-avatar" src="default-avatar.svg" alt="Persona avatar">
                        <input class="name avatar-name" data-field="name" type="text" aria-label="Name your persona">
                    </div>
                    <h2>Why is this step important ?</h2>
                    <p>${escape(step.description)}</p>
                    <button type="button" class="button-walk">Skip Walkthrough mode</button>
                </div>
            </div>
            <div class="column right">
                <div class="column-padding">
                    <p class="step-number">Step ${index + 1} / ${personaSteps.length}</p>
                    <h3 class="page-title">${escape(step.title)}</h3>
                    <div class="step-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${personaSteps.length}" aria-valuenow="${index + 1}" aria-label="Walkthrough progress"><span class="step-progress-fill" style="transform: scaleX(${(index + 1) / personaSteps.length})"></span></div>
                    ${index === 0 ? `<label for="avatar-input">Pick your avatar:</label>
                    <div id="avatar-wrapper" data-action="choose-avatar">
                        <img id="avatar-image" src="default-avatar.svg" alt="Choose your persona avatar">
                    </div>
                    <span class="persona-name" data-persona-name></span>
                    <input type="file" id="avatar-input" accept="image/*" hidden>` : ''}
                    <div class="walk-fields">${step.fields.map(field => `<div class="walk-field">${fieldHTML(field, 'walk')}</div>`).join('')}</div>
                </div>
                <div class="buttons-section">
                    ${index ? '<button type="button" class="prev-button">Previous</button>' : ''}
                    ${index < personaSteps.length - 1 ? '<button type="button" class="next-button">Next</button>' : '<button type="button" class="button-walk confirm">Confirm</button>'}
                </div>
            </div>
        </section>`).join('');

    const cards = steps => steps.flatMap(step => step.fields).map(field =>
        `<div class="dragable-item">${fieldHTML(field, 'overview')}</div>`).join('');
    document.querySelector('#sortable-list').innerHTML = `
        <div class="justify-center" data-action="choose-avatar">
            <img class="avatar dragable-item" src="default-avatar.svg" alt="Persona avatar">
            <span class="persona-name" data-persona-name></span>
        </div>${cards(personaSteps.slice(0, 2))}`;
    document.querySelector('#sortable-list-2').innerHTML = personaSteps.slice(2).map((step, index) =>
        `<h3 class="overview-section-title" data-step="${index + 2}">${escape(step.title)}</h3>${cards([step])}`).join('');
}
