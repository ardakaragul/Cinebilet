document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
});

async function fetchMovies() {
    try {
        const response = await fetch('https://cinebilet.onrender.com/movies');
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
            const response = await fetch('https://cinebilet.onrender.com/auth/register', {
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
    selectedSeatNumber = null;
}

async function loadSeats(sessionId) {
    const container = document.getElementById('seat-container');
    container.innerHTML = '';

    try {
        const response = await fetch(`https://cinebilet.onrender.com/sessions/${sessionId}/seats`);
        const data = await response.json();
        const soldSeats = data.soldSeats || [];

        const rows = ['A', 'B', 'C', 'D', 'E'];

        rows.forEach(row => {
            for (let i = 1; i <= 8; i++) {
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
        const response = await fetch('https://cinebilet.onrender.com/tickets', {
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

document.getElementById('my-tickets-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert("Profilinizi görmek için giriş yapmalısınız!");
        document.getElementById('auth-modal').style.display = 'flex';
        return;
    }

    document.getElementById('profile-modal').style.display = 'flex';
    await loadProfile(userId);
    await loadTickets(userId);
});

function closeProfileModal() {
    document.getElementById('profile-modal').style.display = 'none';
}

async function loadProfile(userId) {
    try {
        const response = await fetch(`https://cinebilet.onrender.com/users/${userId}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById('profile-name').value = data.name || '';
            document.getElementById('profile-email').value = data.email || '';
            document.getElementById('profile-phone').value = data.phone || '';
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadTickets(userId) {
    const container = document.getElementById('tickets-container');
    container.innerHTML = '<p>Biletler yükleniyor...</p>';

    try {
        const response = await fetch(`https://cinebilet.onrender.com/users/${userId}/tickets`);
        if (response.ok) {
            const tickets = await response.json();
            container.innerHTML = '';

            if (tickets.length === 0) {
                container.innerHTML = '<p>Henüz satın alınmış bir biletiniz bulunmuyor.</p>';
                return;
            }

            tickets.forEach(ticket => {
                container.innerHTML += `
                    <div class="ticket-card" id="ticket-${ticket.id}">
                        <div class="ticket-info">
                            <strong style="color:white; font-size:16px;">Seans ID:</strong> ${ticket.sessionId} <br>
                            <strong>Koltuk No:</strong> <span style="color:#28a745;">${ticket.seatNumber}</span>
                        </div>
                        <button class="cancel-btn" onclick="cancelTicket('${ticket.id}')">İptal Et</button>
                    </div>
                `;
            });
        }
    } catch (error) {
        console.error(error);
    }
}

async function updateProfile(event) {
    event.preventDefault();
    const userId = localStorage.getItem('userId');
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const phone = document.getElementById('profile-phone').value;

    try {
        const response = await fetch(`https://cinebilet.onrender.com/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone })
        });

        if (response.ok) {
            alert("Profil bilgileriniz başarıyla güncellendi!");
            localStorage.setItem('userName', name);
            location.reload();
        } else {
            alert("Güncelleme başarısız oldu.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function cancelTicket(ticketId) {
    if (!confirm("Bu bileti iptal etmek istediğinize emin misiniz?")) return;

    try {
        const response = await fetch(`https://cinebilet.onrender.com/tickets/${ticketId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Biletiniz başarıyla iptal edildi.");
            document.getElementById(`ticket-${ticketId}`).remove();
        } else {
            alert("İptal işlemi başarısız oldu.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function deleteAccount() {
    if (!confirm("Hesabınızı kalıcı olarak silmek istediğinize emin misiniz? Bütün biletleriniz yanacak!")) return;

    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch(`https://cinebilet.onrender.com/users/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Hesabınız silindi. Sizi özleyeceğiz...");
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('admin-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    document.getElementById('admin-modal').style.display = 'flex';
    await loadAdminMovies();
    await loadAdminHalls();
});

function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
}

async function addMovie(event) {
    event.preventDefault();
    const title = document.getElementById('new-movie-title').value;
    const director = document.getElementById('new-movie-director').value;
    const durationMinutes = document.getElementById('new-movie-duration').value;
    const posterUrl = document.getElementById('new-movie-poster').value;

    try {
        const response = await fetch('https://cinebilet.onrender.com/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, director, durationMinutes: parseInt(durationMinutes), posterUrl })
        });

        if (response.ok) {
            alert("Film başarıyla eklendi!");
            document.getElementById('add-movie-form').reset();
            await loadAdminMovies();
            fetchMovies();
        } else {
            const data = await response.json();
            alert("Hata: " + data.message);
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadAdminMovies() {
    const container = document.getElementById('admin-movies-list');
    container.innerHTML = '<p>Filmler yükleniyor...</p>';

    try {
        const response = await fetch('https://cinebilet.onrender.com/movies');
        const movies = await response.json();
        container.innerHTML = '';

        movies.forEach(movie => {
            container.innerHTML += `
                <div class="admin-movie-item">
                    <span style="color: white; font-weight: bold;">${movie.title} <span style="color: #aaa; font-weight: normal; font-size: 13px;">(${movie.durationMinutes} dk)</span></span>
                    <div>
                        <button onclick="editMovie('${movie.id}', '${movie.title}')" class="buy-btn" style="background-color: #007bff; padding: 6px 12px; margin-right: 10px; display: inline-block; width: auto;">Düzenle</button>
                        <button onclick="deleteMovie('${movie.id}')" class="cancel-btn">Filmi Sil</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}

async function deleteMovie(movieId) {
    if (!confirm("Bu filmi sistemden tamamen silmek istediğinize emin misiniz? Tüm afişler ve veriler yok olacak!")) return;

    try {
        const response = await fetch(`https://cinebilet.onrender.com/movies/${movieId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Film sistemden silindi.");
            await loadAdminMovies();
            fetchMovies();
        }
    } catch (error) {
        console.error(error);
    }
}

async function addHall(event) {
    event.preventDefault();
    const name = document.getElementById('hall-name').value;
    const capacity = document.getElementById('hall-capacity').value;

    try {
        const response = await fetch('https://cinebilet.onrender.com/halls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, capacity: parseInt(capacity) })
        });
        if (response.ok) {
            alert("Yeni salon başarıyla oluşturuldu!");
            await loadAdminHalls();
            event.target.reset();
        }
    } catch (error) { console.error(error); }
}

async function addSession(event) {
    event.preventDefault();
    const movieId = document.getElementById('session-movie-id').value;
    const hallId = document.getElementById('session-hall-id').value;
    const startTime = document.getElementById('session-time').value;

    try {
        const response = await fetch('https://cinebilet.onrender.com/sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId, hallId, startTime })
        });
        if (response.ok) {
            alert("Seans başarıyla sisteme tanımlandı!");
            event.target.reset();
        }
    } catch (error) { console.error(error); }
}

async function editMovie(movieId, oldTitle) {
    const newTitle = prompt(`"${oldTitle}" filminin YENİ ADINI girin:\n(Değiştirmek istemiyorsanız boş bırakın)`);
    if (newTitle === null) return;

    const newDirector = prompt("YENİ YÖNETMENİ girin:\n(Değiştirmek istemiyorsanız boş bırakın)");
    const newDuration = prompt("YENİ SÜREYİ (dakika olarak) girin:\n(Değiştirmek istemiyorsanız boş bırakın)");
    const newPoster = prompt("YENİ AFİŞ LİNKİNİ girin:\n(Değiştirmek istemiyorsanız boş bırakın)");

    const updateData = {};
    if (newTitle) updateData.title = newTitle;
    if (newDirector) updateData.director = newDirector;
    if (newDuration) updateData.durationMinutes = parseInt(newDuration);
    if (newPoster) updateData.posterUrl = newPoster;

    if (Object.keys(updateData).length === 0) {
        alert("Hiçbir değişiklik yapmadınız.");
        return;
    }

    try {
        const response = await fetch(`https://cinebilet.onrender.com/movies/${movieId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            alert("Film bilgileri başarıyla güncellendi! 🎬");
            await loadAdminMovies();
            fetchMovies();
        } else {
            alert("Film güncellenirken bir hata oluştu.");
        }
    } catch (error) {
        console.error(error);
    }
}

async function loadAdminHalls() {
    const container = document.getElementById('admin-halls-list');
    if (!container) return;
    container.innerHTML = '<span style="color:#aaa;">Salonlar yükleniyor...</span>';

    try {
        const response = await fetch('https://cinebilet.onrender.com/halls');
        const halls = await response.json();

        container.innerHTML = '<strong style="color:#28a745; display:block; margin-bottom:5px;">Kayıtlı Salonlar:</strong>';

        halls.forEach(hall => {
            container.innerHTML += `
                <div style="padding: 5px 0; border-bottom: 1px solid #444;">
                    <strong>${hall.name}</strong> (Kapasite: ${hall.capacity})<br>
                    <span style="color:#aaa; font-size:11px;">Kopyalanacak ID: <strong>${hall.id}</strong></span>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}

// YÖNETİCİ - SEANS İPTAL ETME
async function cancelAdminSession() {
    const sessionId = document.getElementById('cancel-session-id').value.trim();

    if (!sessionId) {
        alert("Lütfen iptal edilecek Seans ID'sini girin!");
        return;
    }

    if (!confirm(`"${sessionId}" ID'li seansı iptal etmek istediğinize emin misiniz?`)) return;

    try {
        const response = await fetch(`https://cinebilet.onrender.com/sessions/${sessionId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Seans başarıyla iptal edildi! 🗑️");
            document.getElementById('cancel-session-id').value = ''; 
        } else {
            alert("İptal başarısız oldu. Hatalı bir Seans ID'si girmiş olabilirsiniz.");
        }
    } catch (error) {
        console.error(error);
    }
}