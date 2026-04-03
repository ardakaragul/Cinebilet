
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

let isRegisterMode = false; 


document.getElementById('login-btn').addEventListener('click', (e) => {
    e.preventDefault(); 
    document.getElementById('auth-modal').style.display = 'flex';
});


function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}


function toggleAuthMode() {
    isRegisterMode = !isRegisterMode;
    const nameInput = document.getElementById('auth-name');
    const phoneInput = document.getElementById('auth-phone');
    const title = document.getElementById('modal-title');
    const submitBtn = document.getElementById('auth-submit-btn');
    const toggleText = document.getElementById('auth-toggle-text');

    if (isRegisterMode) {
        title.innerText = "Kayıt Ol";
        nameInput.style.display = "block"; nameInput.required = true;
        phoneInput.style.display = "block"; phoneInput.required = true;
        submitBtn.innerText = "Hesap Oluştur";
        toggleText.innerHTML = 'Zaten hesabın var mı? <a href="#" onclick="toggleAuthMode()">Giriş Yap</a>';
    } else {
        title.innerText = "Giriş Yap";
        nameInput.style.display = "none"; nameInput.required = false;
        phoneInput.style.display = "none"; phoneInput.required = false;
        submitBtn.innerText = "Giriş Yap";
        toggleText.innerHTML = 'Hesabın yok mu? <a href="#" onclick="toggleAuthMode()">Kayıt Ol</a>';
    }
}


async function handleAuth(event) {
    event.preventDefault();

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    if (isRegisterMode) {
        
        const name = document.getElementById('auth-name').value;
        const phone = document.getElementById('auth-phone').value;

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phone })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Aramıza hoş geldin, " + data.user.name + "! Kayıt başarılı.");
                closeAuthModal();
                
                localStorage.setItem('userName', data.user.name);
                localStorage.setItem('userId', data.user.id);
                location.reload(); 
            } else {
                alert("Hata: " + data.message);
            }
        } catch (error) {
            console.error("Bağlantı hatası:", error);
        }
    } else {
        
        
        alert("Giriş başarılı! (Simülasyon)");
        closeAuthModal();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    const loginBtn = document.getElementById('login-btn');
    
    if (userName) {
        loginBtn.innerText = "Çıkış Yap (" + userName + ")";
        loginBtn.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
            location.reload();
        };
    }
});