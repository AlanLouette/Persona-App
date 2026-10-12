/* Export values as text instead of slicing a screenshot across A4 pages. */
function exportPersonaPDF(root, color) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const margin = 15, width = 180, bottom = 282, lineHeight = 5;
    const rgb = color.match(/\w\w/g).map(channel => parseInt(channel, 16));
    let y = margin;
    const newPage = () => { doc.addPage(); y = margin; };
    const wrap = (text, size) => {
        doc.setFontSize(size);
        return doc.splitTextToSize(text || ' ', width - 12);
    };
    const text = (lines, size, bold, ink) => {
        doc.setFontSize(size);
        doc.setFontStyle(bold ? 'bold' : 'normal');
        doc.setTextColor(...ink);
        lines.forEach(line => {
            if (y + lineHeight > bottom) newPage();
            doc.text(line, margin + 6, y);
            y += lineHeight;
        });
    };
    text(['Persona Canvas'], 20, true, rgb);
    text(['door BeMarketing Group'], 10, false, [60, 60, 60]);
    y += 8;
    const avatar = root.querySelector('.avatar');
    if (avatar?.complete && avatar.naturalWidth) {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = 256;
            canvas.getContext('2d').drawImage(avatar, 0, 0, 256, 256);
            doc.addImage(canvas.toDataURL('image/png'), 'PNG', margin + 6, y, 30, 30);
            y += 38;
        } catch (error) {
            // Remote avatars may forbid canvas access; entered answers still export.
            console.warn('Avatar could not be embedded in the PDF', error);
        }
    }

    // Follow the current order, omit editor controls, and include all entered text.
    root.querySelectorAll('div.dragable-item:not(.add-item)').forEach(item => {
        const label = item.querySelector('label');
        if (!label) return;
        const title = label.querySelector('input')?.value ?? label.textContent.trim();
        const values = [...item.querySelectorAll('input, textarea, select')]
            .filter(input => !label.contains(input))
            .map(input => input.value || input.getAttribute('placeholder') || '');
        doc.setFontStyle('bold');
        const heading = wrap(title, 12);
        doc.setFontStyle('normal');
        const body = wrap(values.join('\n'), 10);
        const height = (heading.length + body.length) * lineHeight + 12;
        // Ordinary cards stay whole. Oversized answers continue on another page.
        if (y + Math.min(height, bottom - margin) > bottom) newPage();
        doc.setDrawColor(...rgb);
        doc.line(margin, y, margin + width, y);
        y += 7;
        text(heading, 12, true, rgb);
        y += 2;
        text(body, 10, false, [30, 30, 30]);
        y += 8;
    });
    doc.save('file.pdf');
}
