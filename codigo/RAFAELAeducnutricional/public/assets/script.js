async function fetchYouTubeVideos() {
    const apiKey = 'AIzaSyAi7yO08PVstgYrRFgUyL4tghvOT-X9sOI';
    const searchQuery = 'alimentação saudável';
    const maxResults = 10;

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=${maxResults}&key=${apiKey}`);
    const data = await response.json();
    
    if (data.items) {
      displayVideos(data.items);
    }
}

function displayVideos(videos) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    
    videos.forEach(video => {
        const videoId = video.id.videoId;
        const videoTitle = video.snippet.title;
        const videoDescription = video.snippet.description;

        const videoElement = `
            <div class="col-md-6 mt-4">
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                <h5>${videoTitle}</h5>
                <p>${videoDescription}</p>
            </div>
        `;
        
        videoContainer.insertAdjacentHTML('beforeend', videoElement);
    });
}

window.addEventListener('DOMContentLoaded', fetchYouTubeVideos);
