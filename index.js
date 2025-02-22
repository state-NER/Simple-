/* index.js - Simple++ Interpreter */
const fs = require('fs');

function parseSimplePP(code) {
    let lines = code.split('\n');
    let html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Simple++ Website</title><style>`;
    let body = `<body>`;
    
    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('Simple+en')) {
            html += `body { font-family: Arial, sans-serif; margin: 0; padding: 0; }`;
        } else if (line.startsWith('(Top Bar')) {
            let color = line.match(/#Color:#([0-9A-Fa-f]+)/);
            html += `nav { background-color: #${color[1]}; padding: 15px; display: flex; justify-content: center; } ul { list-style: none; padding: 0; margin: 0; display: flex; } ul li { margin: 0 15px; } a { color: white; text-decoration: none; font-weight: bold; }`;
            body += `<nav><ul>`;
        } else if (line.startsWith('(Item')) {
            let text = line.match(/#Text:"([^"]+)"/);
            let link = line.match(/#Link:"([^"]+)"/);
            body += `<li><a href="${link[1]}">${text[1]}</a></li>`;
        } else if (line.startsWith('(Main Content')) {
            let color = line.match(/#Color:#([0-9A-Fa-f]+)/);
            html += `main { background-color: #${color[1]}; padding: 30px; text-align: center; }`;
            body += `</ul></nav><main>`;
        } else if (line.startsWith('(Header')) {
            let text = line.match(/#Text:"([^"]+)"/);
            body += `<h1>${text[1]}</h1>`;
        } else if (line.startsWith('(Paragraph')) {
            let text = line.match(/#Text:"([^"]+)"/);
            body += `<p style="font-size: 18px; color: #333;">${text[1]}</p>`;
        } else if (line.startsWith('(Footer')) {
            let color = line.match(/#Color:#([0-9A-Fa-f]+)/);
            html += `footer { background-color: #${color[1]}; color: white; text-align: center; padding: 15px; font-size: 14px; }`;
            body += `</main><footer>`;
        } else if (line.startsWith('(Text')) {
            let text = line.match(/#Text:"([^"]+)"/);
            body += `${text[1]}</footer>`;
        }
    });
    
    body += `</body></html>`;
    html += `</style></head>${body}`;
    return html;
}

// Read Simple++ file and convert to HTML
const inputFile = process.argv[2];
if (inputFile) {
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        const outputHtml = parseSimplePP(data);
        fs.writeFile('output.html', outputHtml, (err) => {
            if (err) {
                console.error("Error writing output file:", err);
            } else {
                console.log("Conversion successful! Check output.html");
            }
        });
    });
}

module.exports = { parseSimplePP };
