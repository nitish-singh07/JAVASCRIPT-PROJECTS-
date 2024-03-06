// app.js

function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const uploadResult = document.getElementById('upload-result');
  
    const file = fileInput.files[0];
    if (!file) {
      uploadResult.innerHTML = '<p>Please select a file.</p>';
      uploadResult.style.display = 'block';
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/upload', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const downloadLink = response.downloadLink;
        uploadResult.innerHTML = `<p>File uploaded successfully!</p><p>Download Link: <a href="${downloadLink}" target="_blank">${downloadLink}</a></p>`;
        uploadResult.style.display = 'block';
      } else {
        uploadResult.innerHTML = '<p>There was an error uploading the file.</p>';
        uploadResult.style.display = 'block';
      }
    };
    xhr.send(formData);
  }
  