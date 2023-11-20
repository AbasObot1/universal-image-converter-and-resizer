function resizeImage() {
    var fileInput = document.getElementById('fileInput');
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;
    var format = document.getElementById('format').value;

    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            var img = new Image();
            img.onload = function() {
                var canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                var dataURL = canvas.toDataURL(format);
                download(dataURL, 'resized-image' + format);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function download(dataURL, filename) {
    var a = document.createElement('a');
    a.href = dataURL;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}