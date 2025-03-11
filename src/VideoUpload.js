import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', name);

    try {
      const response = await axios.post('http://localhost:8000/process_video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDownloadUrl(response.data.download_url);
    } catch (error) {
      console.error('Erro ao processar o vídeo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <input type="text" placeholder="Nome personalizado" value={name} onChange={handleNameChange} />
        <button type="submit" disabled={loading}>Enviar</button>
      </form>

      {loading && <ClipLoader color="#123abc" />}

      {downloadUrl && (
        <a href={downloadUrl} download>
          Baixar vídeo personalizado
        </a>
      )}
    </div>
  );
}

export default VideoUpload;