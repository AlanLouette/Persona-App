/* Hide irrelevant questions without deleting answers when the audience changes. */
function setupPersonaContext() {
    const businessFields = ['sector', 'company-size', 'turnover', 'responsabilities', 'report-to', 'manager-of'];
    const consumerFields = ['purchase-budget', 'purchase-context'];
    const original = new Map();
    document.querySelectorAll('[data-field]').forEach(input => {
        original.set(input, { placeholder: input.getAttribute('placeholder'), label: document.querySelector(`label[for="${input.id}"]`)?.textContent });
    });
    const update = () => {
        const type = document.querySelector('#audience-type').value;
        const consumer = type === 'B2C' || (type === 'B2B2C' && document.querySelector('#buyer-context').value === 'consumer');
        document.querySelector('#buyer-context').hidden = document.querySelector('#buyer-context-label').hidden = type !== 'B2B2C';
        [...businessFields, ...consumerFields].forEach(key => {
            document.querySelectorAll(`[data-field="${key}"]`).forEach(input => {
                input.closest('.walk-field, .dragable-item').hidden = businessFields.includes(key) ? consumer : !consumer;
            });
        });
        const copy = {
            goals: 'What do they want to achieve with this purchase? What matters most to them?',
            criteria: 'What do they compare before buying? What would make them choose you?',
            role: 'Do they decide and pay themselves? Does someone else influence the purchase?'
        };
        original.forEach((saved, input) => {
            if (saved.placeholder !== null) input.setAttribute('placeholder', consumer && copy[input.dataset.field] ? copy[input.dataset.field] : saved.placeholder);
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label && saved.label) label.textContent = consumer && input.dataset.field === 'function' ? 'Occupation (optional) :' : consumer && input.dataset.field === 'company-name' ? 'Company name (optional) :' : saved.label;
        });
        [2, 3].forEach(index => {
            const title = consumer ? (index === 2 ? 'Buying context' : 'Purchase decisions') : personaSteps[index].title;
            document.querySelectorAll(`section[id="${index + 1}"] .page-title, .overview-section-title[data-step="${index}"]`).forEach(node => node.textContent = title);
        });
    };
    update();
    return update;
}
