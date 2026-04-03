
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


let currentSessionId = "12345"; 
let selectedSeatNumber = null;


async function buyTicket(movieId) {
    const userId = localStorage.getItem('userId');
    
    
    if (!userId) {
        alert("Bilet almak için önce giriş yapmalısın!");
        document.getElementById('auth-modal').style.display = 'flex';
        return;
    }
    
    
    document.getElementById('seat-modal').style.display = 'flex';
    await loadSeats(currentSessionId);
}


function closeSeatModal() {
    document.getElementById('seat-modal').style.display = 'none';
    selectedSeatNumber = null; // Seçimi sıfırla
}


async function loadSeats(sessionId) {
    const container = document.getElementById('seat-container');
    container.innerHTML = ''; 
    
    try {
        
        const response = await fetch(`http://localhost:3000/sessions/${sessionId}/seats`);
        const data = await response.json();
        const soldSeats = data.soldSeats || []; 
        
        const rows = ['A', 'B', 'C', 'D', 'E']; 
        
        rows.forEach(row => {
            for(let i = 1; i <= 8; i++) { 
                const seatNumber = row + i;
                const isSold = soldSeats.includes(seatNumber);
                
                const seatDiv = document.createElement('div');
                seatDiv.classList.add('seat');
                
                
                if (isSold) {
                    seatDiv.classList.add('sold');
                }
                
                
                seatDiv.onclick = () => selectSeat(seatDiv, seatNumber, isSold);
                
                container.appendChild(seatDiv);
            }
        });
    } catch (error) {
        console.error("Koltuklar yüklenemedi:", error);
    }
}


function selectSeat(seatElement, seatNumber, isSold) {
    if (isSold) return; 
    
    
    const previouslySelected = document.querySelector('.seat.selected');
    if (previouslySelected) previouslySelected.classList.remove('selected');
    
    
    seatElement.classList.add('selected');
    selectedSeatNumber = seatNumber;
}


document.getElementById('confirm-ticket-btn').addEventListener('click', async () => {
    if (!selectedSeatNumber) {
        alert("Lütfen perdeden bir koltuk seçin!");
        return;
    }
    
    const userId = localStorage.getItem('userId');
    
    try {
        
        const response = await fetch('http://localhost:3000/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, sessionId: currentSessionId, seatNumber: selectedSeatNumber })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(`Tebrikler! ${selectedSeatNumber} numaralı koltuğu başarıyla satın aldınız! 🍿`);
            closeSeatModal();
        } else {
            alert("Hata: " + data.message);
        }
    } catch (error) {
        console.error("Bilet alınırken hata:", error);
    }
});