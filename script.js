function generateZip() {
    const url = document.getElementById('urlInput').value;
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = ""; // Limpiar errores previos

    // Expresión regular para capturar el ID del proyecto
    const match = url.match(/^https:\/\/scratch\.mit\.edu\/projects\/(\d+)\/?$/);
    if (!match) {
        errorMessage.textContent = "❌ URL no válida. Debe tener el formato: https://scratch.mit.edu/projects/XXXXXXXXX/";
        return;
    }

    const projectID = match[1]; // Extraemos el ID del proyecto

    // Crear el contenido del archivo index.html
    const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Scratch</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body>
    <iframe
        src="https://scratch.mit.edu/projects/${projectID}/embed"
        allowtransparency="true"
        width="954"
        height="768"
        frameborder="0"
        scrolling="no"
        allowfullscreen
    ></iframe>
</body>
</html>`;

    // Crear un nuevo ZIP
    const zip = new JSZip();
    zip.file("index.html", htmlContent);

    // Generar y descargar el ZIP
    zip.generateAsync({ type: "blob" }).then((content) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = "scratch.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
