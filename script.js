function generateZip() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ""; // Limpiar errores previos

    // Extraer solo la parte base de la URL (hasta el ID)
    const match = urlInput.match(/^https:\/\/view\.genially\.com\/([a-zA-Z0-9]+)$/) 
        || urlInput.match(/^https:\/\/view\.genially\.com\/([a-zA-Z0-9]+)(\/.*)?$/);

    if (!match) {
        errorMessage.textContent = "❌ URL no válida. Debe empezar con: https://view.genially.com/XXXXXXXX";
        return;
    }

    const baseUrl = `https://view.genially.com/${match[1]}`;

    // Crear el contenido del archivo index.html
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Genially</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
    <div style="width: 100%;">
        <div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;">
            <iframe title="Genially" frameborder="0" width="1200" height="675" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
                src="${baseUrl}" type="text/html" allowscriptaccess="always" allowfullscreen="true" 
                scrolling="yes" allownetworking="all"></iframe>
        </div>
    </div>
</body>
</html>`;

    // Crear ZIP
    const zip = new JSZip();
    zip.file("index.html", htmlContent);

    zip.generateAsync({ type: "blob" }).then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "genially.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
