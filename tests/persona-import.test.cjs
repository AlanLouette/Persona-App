const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync('persona-data.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('persona-storage.js', 'utf8'), context);
const steps = vm.runInContext('personaSteps', context);
const payload = () => ({
    format: 'alanlouette-persona', version: 1,
    persona: {
        version: 1, fields: { name: 'Alex', marketing: 'B2B', 'buyer-context': 'business' },
        color: '#a78bfa', avatar: 'default-avatar.svg', logo: null,
        view: 'overview', step: 3,
        lists: [
            [{ avatar: true }, ...steps.slice(0, 2).flatMap(step => step.fields.map(field => ({ field: field.key })))],
            steps.slice(2).flatMap(step => step.fields.map(field => ({ field: field.key })))
        ]
    }
});

test('accepts an editable export with custom sections and unchanged answers', () => {
    const data = payload();
    data.persona.lists[1].push({ title: '<b>Notes</b>', text: 'Original answer' });
    assert.equal(context.validatePersonaImport(data), data.persona);
});

test('rejects unsupported formats and invalid audience values', () => {
    const data = payload(); data.version = 2;
    assert.throws(() => context.validatePersonaImport(data));
    data.version = 1; data.persona.fields.marketing = 'unexpected';
    assert.throws(() => context.validatePersonaImport(data));
});

test('rejects unsafe image URLs without altering the supplied data', () => {
    const data = payload(); data.persona.logo = 'javascript:alert(1)';
    assert.throws(() => context.validatePersonaImport(data));
    assert.equal(data.persona.logo, 'javascript:alert(1)');
});

test('rejects duplicate, unknown and misplaced fields', () => {
    let data = payload(); data.persona.lists[0].push({ field: 'name' });
    assert.throws(() => context.validatePersonaImport(data));
    data = payload(); data.persona.lists[1].push({ field: 'unknown' });
    assert.throws(() => context.validatePersonaImport(data));
    data = payload(); data.persona.lists[0].push({ field: 'role' });
    assert.throws(() => context.validatePersonaImport(data));
});

test('rejects oversized section collections and invalid navigation state', () => {
    const data = payload(); data.persona.lists[1] = Array(151).fill({ title: 'Notes', text: '' });
    assert.throws(() => context.validatePersonaImport(data));
    const other = payload(); other.persona.step = 0;
    assert.throws(() => context.validatePersonaImport(other));
});
