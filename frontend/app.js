
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

async function fetchMovies() {
    try {
        const response = await fetch('http://localhost:3000/movies');
        const movies = await response.json();

        const container = document.getElementById('movies-container');
        container.innerHTML = '';

        movies.forEach(movie => {
            const poster = movie.posterUrl || 'https://via.placeholder.com/250x350?text=Afiş+Yok';

            const movieCard = `
                <div class="movie-card">
                    <img src="${poster}" alt="${movie.title}">
                    <div class="movie-info">
                        <div class="movie-title">${movie.title}</div>
                        <div style="font-size: 14px; color: #aaa; margin-bottom: 15px;">
                            Yönetmen: ${movie.director} <br>
                            Süre: ${movie.durationMinutes} dk
                        </div>
                        <button class="buy-btn" onclick="buyTicket('${movie.id}')">Bilet Al</button>
                    </div>
                </div>
            `;
            container.innerHTML += movieCard;
        });

    } catch (error) {
        console.error("Filmler çekilirken hata oluştu:", error);
        document.getElementById('movies-container').innerHTML = '<p style="color:red;">Filmler yüklenemedi. Sunucu açık mı?</p>';
    }
}

function buyTicket(movieId) {
    alert("Bilet alma ekranına gidiliyor... Film ID: " + movieId);
}