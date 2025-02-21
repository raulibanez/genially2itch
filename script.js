function generateZip() {
    const url = document.getElementById('urlInput').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ""; // Limpiar errores previos

    // Expresión regular para capturar la URL válida de MakeCode Arcade
    const match = url.match(/^https:\/\/arcade\.makecode\.com\/[\d-]+$/);
    if (!match) {
        errorMessage.textContent = "❌ URL no válida. Debe tener el formato: https://arcade.makecode.com/XXXXXXXXX";
        return;
    }

    // Crear el contenido del archivo index.html
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>MakeCode Arcade</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body>
    <div><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" 
            src="${url}" allowfullscreen="allowfullscreen" 
            sandbox="allow-popups allow-forms allow-scripts allow-same-origin" frameborder="0"></iframe></div>
</body>
</html>`;

    // Crear un nuevo ZIP
    const zip = new JSZip();
    zip.file("index.html", htmlContent);

    // Generar y descargar el ZIP
    zip.generateAsync({ type: "blob" }).then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "makecode.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}