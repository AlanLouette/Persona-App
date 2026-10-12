/* A text-based A4 report: profile first, followed by professional details. */
async function exportPersonaPDF(root, color, logo = null) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const rgb = color.match(/\w\w/g).map(channel => parseInt(channel, 16));
    const left = 18, right = 192, bottom = 278, line = 5;
    const contentTop = 50;
    let y = contentTop;
    let currentSection = '';
    const personaName = root.querySelector('[data-field="name"]')?.value.trim() || '';
    const companyName = root.querySelector('[data-field="company-name"]')?.value.trim() || '';
    let portraitHeight = 44;
    let logoData;
    if (logo) {
        await logo.decode();
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 1000 / Math.max(logo.naturalWidth, logo.naturalHeight));
        canvas.width = Math.max(1, Math.round(logo.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(logo.naturalHeight * scale));
        canvas.getContext('2d').drawImage(logo, 0, 0, canvas.width, canvas.height);
        logoData = canvas.toDataURL('image/png');
    }
    const font = (size, bold = false) => {
        doc.setFontSize(size);
        doc.setFontStyle(bold ? 'bold' : 'normal');
    };
    const header = () => {
        font(20, true);
        doc.setTextColor(...rgb);
        doc.text('Persona Canvas', left, 22);
        font(9);
        doc.setTextColor(80, 80, 80);
        if (companyName) {
            const companyLines = doc.splitTextToSize(companyName, 110);
            // Keep unusually long company names within the fixed header area.
            let displayName = companyLines[0];
            if (companyLines.length > 1) {
                while (doc.getTextWidth(displayName + '...') > 110) displayName = displayName.slice(0, -1);
                displayName += '...';
            }
            doc.text(displayName, left, 29);
        }
        if (logoData) {
            const ratio = logo.naturalWidth / logo.naturalHeight;
            const width = Math.min(35, 14 * ratio);
            const height = width / ratio;
            doc.addImage(logoData, 'PNG', right - width, 10 + (14 - height) / 2, width, height);
        }
        if (currentSection) doc.text(currentSection, right, 32, { align: 'right' });
        doc.setDrawColor(220, 220, 230);
        doc.setLineWidth(0.3);
        doc.line(left, 39, right, 39);
    };
    const nextPage = () => { doc.addPage(); header(); y = contentTop; };
    const section = title => {
        currentSection = title;
        if (y + 25 > bottom) nextPage();
        font(14, true);
        doc.setTextColor(...rgb);
        doc.text(title, left, y);
        doc.setDrawColor(...rgb);
        doc.line(left, y + 4, right, y + 4);
        y += 14;
    };
    const read = item => {
        const label = item.querySelector('label');
        if (!label) return null;
        const inputs = [...item.querySelectorAll('input, textarea, select')].filter(input => !label.contains(input));
        return {
            title: label.querySelector('input')?.value ?? label.textContent.trim(),
            value: inputs.map(input => input.value).join('\n') || ' ',
            long: inputs.some(input => input.tagName === 'TEXTAREA')
        };
    };
    const measure = (field, width) => {
        font(10, true);
        const heading = doc.splitTextToSize(field.title, width);
        font(10);
        const body = doc.splitTextToSize(field.value, width);
        return { heading, body, height: (heading.length + body.length) * line + 10 };
    };
    const draw = (field, x, start, width) => {
        const measured = measure(field, width);
        font(10, true); doc.setTextColor(...rgb);
        doc.text(measured.heading, x, start);
        font(10); doc.setTextColor(30, 30, 30);
        doc.text(measured.body, x, start + measured.heading.length * line + 2);
    };
    const fullField = field => {
        let { heading, body, height } = measure(field, right - left);
        if (height <= bottom - contentTop && y + height > bottom) nextPage();
        // Repeat the original question when a very long answer continues.
        while (body.length) {
            const available = Math.floor((bottom - y - heading.length * line - 8) / line);
            if (available < 1) { nextPage(); continue; }
            const chunk = body.splice(0, available);
            draw({ ...field, value: chunk.join('\n') }, left, y, right - left);
            y += (heading.length + chunk.length) * line + 10;
            if (body.length) nextPage();
        }
    };
    const fields = (items, x = left, width = right - left) => {
        const column = (width - 10) / 2;
        for (let i = 0; i < items.length; i++) {
            const field = items[i];
            const first = measure(field, column);
            if (field.long || first.height > 65) { fullField(field); continue; }
            const partner = items[i + 1];
            const second = partner && !partner.long ? measure(partner, column) : null;
            const paired = second && second.height <= 65;
            const height = Math.max(first.height, paired ? second.height : 0);
            if (y + height > bottom) nextPage();
            draw(field, x, y, column);
            if (paired) { draw(partner, x + column + 10, y, column); i++; }
            y += height;
        }
    };
    header();
    section('General profile');
    const avatar = root.querySelector('.avatar');
    if (avatar) {
        // A square crop clipped to a circle, including uploaded portraits.
        await avatar.decode();
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 512;
        const ctx = canvas.getContext('2d');
        ctx.beginPath(); ctx.arc(256, 256, 256, 0, Math.PI * 2); ctx.clip();
        const side = Math.min(avatar.naturalWidth, avatar.naturalHeight);
        ctx.drawImage(avatar, (avatar.naturalWidth - side) / 2, (avatar.naturalHeight - side) / 2, side, side, 0, 0, 512, 512);
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', left, y, 34, 34);
        doc.setDrawColor(...rgb); doc.circle(left + 17, y + 17, 17);
        if (personaName) {
            font(11, true); doc.setTextColor(30, 30, 30);
            const nameLines = doc.splitTextToSize(personaName, 38);
            doc.text(nameLines, left + 17, y + 41, { align: 'center' });
            portraitHeight = 46 + nameLines.length * line;
        }
    }
    const profile = [...root.querySelectorAll('#sortable-list div.dragable-item')].map(read).filter(Boolean);
    // Compact profile facts beside the portrait; descriptions get full width.
    const facts = profile.filter(field => !field.long);
    const start = y;
    fields(facts, left + 44, right - left - 44);
    y = Math.max(y, start + portraitHeight);
    profile.filter(field => field.long).forEach(fullField);
    y += 5;
    section('Professional details');
    fields([...root.querySelectorAll('#sortable-list-2 div.dragable-item')].map(read).filter(Boolean));
    const count = doc.internal.getNumberOfPages();
    for (let page = 1; page <= count; page++) {
        doc.setPage(page); font(8); doc.setTextColor(120, 120, 120);
        doc.text(`${page} / ${count}`, right - 12, 288);
    }
    doc.save('file.pdf');
}
