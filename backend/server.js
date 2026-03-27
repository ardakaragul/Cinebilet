const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const moviesFilePath = path.join(__dirname, 'data', 'movies.json');
const hallsFilePath = path.join(__dirname, 'data', 'halls.json');
const sessionsFilePath = path.join(__dirname, 'data', 'sessions.json');
const usersFilePath = path.join(__dirname, 'data', 'users.json');
const ticketsFilePath = path.join(__dirname, 'data', 'tickets.json');

app.use(cors());
app.use(express.json());

// --- MEVLÜT ARDA KARAGÜL'ÜN GÖREVLERİ: FİLM API'LERİ ---

// 1. VİZYONDAKİ FİLMLERİ LİSTELEME (GET /movies)
app.get('/movies', (req, res) => {
    try {
        const data = fs.readFileSync(moviesFilePath, 'utf8');
        const movies = JSON.parse(data);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Filmler okunurken bir hata oluştu." });
    }
});

// 2. YENİ FİLM EKLEME (POST /movies)
app.post('/movies', (req, res) => {
    try {
        // Kullanıcının Postman'den gönderdiği bilgiler
        const { title, director, durationMinutes, posterUrl } = req.body;

        // Önce mevcut filmleri oku
        const data = fs.readFileSync(moviesFilePath, 'utf8');
        const movies = JSON.parse(data);

        // Yeni filmi oluştur
        const newMovie = {
            id: Date.now().toString(), // Benzersiz rastgele bir ID oluşturur
            title: title,
            director: director,
            durationMinutes: durationMinutes,
            posterUrl: posterUrl
        };

        // Yeni filmi listeye ekle
        movies.push(newMovie);

        // Listeyi tekrar JSON dosyasına yaz (kaydet)
        fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));

        res.status(201).json({ message: "Film başarıyla eklendi!", movie: newMovie });
    } catch (error) {
        res.status(500).json({ message: "Film eklenirken bir hata oluştu." });
    }
});
// 3. FİLM GÜNCELLEME (PUT /movies/:movieId)
app.put('/movies/:movieId', (req, res) => {
    try {
        const { movieId } = req.params; // Linkten gelen ID
        const { title, director, durationMinutes, posterUrl } = req.body;

        const data = fs.readFileSync(moviesFilePath, 'utf8');
        let movies = JSON.parse(data);

        // Filmi ID'sine göre bul
        const movieIndex = movies.findIndex(m => m.id === movieId);

        if (movieIndex === -1) {
            return res.status(404).json({ message: "Güncellenecek film bulunamadı." });
        }

        // Filmin bilgilerini güncelle (Eğer yeni bilgi gönderilmediyse eskisini koru)
        movies[movieIndex] = {
            ...movies[movieIndex],
            title: title || movies[movieIndex].title,
            director: director || movies[movieIndex].director,
            durationMinutes: durationMinutes || movies[movieIndex].durationMinutes,
            posterUrl: posterUrl || movies[movieIndex].posterUrl
        };

        // Güncel listeyi JSON dosyasına kaydet
        fs.writeFileSync(moviesFilePath, JSON.stringify(movies, null, 2));

        res.status(200).json({ message: "Film başarıyla güncellendi!", movie: movies[movieIndex] });
    } catch (error) {
        res.status(500).json({ message: "Film güncellenirken bir hata oluştu." });
    }
});

// 4. FİLMİ VİZYONDAN KALDIRMA (DELETE /movies/:movieId)
app.delete('/movies/:movieId', (req, res) => {
    try {
        const { movieId } = req.params;

        const data = fs.readFileSync(moviesFilePath, 'utf8');
        let movies = JSON.parse(data);

        // Silinecek film hariç diğerlerini yeni bir listeye al
        const filteredMovies = movies.filter(m => m.id !== movieId);

        // Eğer sayı değişmediyse film bulunamamıştır
        if (movies.length === filteredMovies.length) {
            return res.status(404).json({ message: "Silinecek film bulunamadı." });
        }

        // Kalan filmleri JSON dosyasına kaydet
        fs.writeFileSync(moviesFilePath, JSON.stringify(filteredMovies, null, 2));

        res.status(200).json({ message: "Film başarıyla silindi." });
    } catch (error) {
        res.status(500).json({ message: "Film silinirken bir hata oluştu." });
    }
});
// 5. SİNEMA SALONU EKLEME (POST /halls)
app.post('/halls', (req, res) => {
    const { name, capacity, rows, cols } = req.body;
    const data = fs.readFileSync(hallsFilePath, 'utf8');
    const halls = JSON.parse(data);

    const newHall = { id: Date.now().toString(), name, capacity, rows, cols };
    halls.push(newHall);

    fs.writeFileSync(hallsFilePath, JSON.stringify(halls, null, 2));
    res.status(201).json({ message: "Salon başarıyla eklendi!", hall: newHall });
});

// 6. SALONLARI LİSTELEME (GET /halls)
app.get('/halls', (req, res) => {
    const data = fs.readFileSync(hallsFilePath, 'utf8');
    res.json(JSON.parse(data));
});

// 7. SEANS OLUŞTURMA (POST /sessions)
app.post('/sessions', (req, res) => {
    const { movieId, hallId, startTime, price } = req.body;
    const data = fs.readFileSync(sessionsFilePath, 'utf8');
    const sessions = JSON.parse(data);

    const newSession = {
        id: Date.now().toString(),
        movieId,
        hallId,
        startTime,
        price,
        isCancelled: false
    };

    sessions.push(newSession);
    fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2));
    res.status(201).json({ message: "Seans başarıyla oluşturuldu!", session: newSession });
});

// 8. SEANS İPTAL ETME (DELETE /sessions/:sessionId)
app.delete('/sessions/:id', (req, res) => {
    const data = fs.readFileSync(sessionsFilePath, 'utf8');
    let sessions = JSON.parse(data);

    const filteredSessions = sessions.filter(s => s.id !== req.params.id);

    if (sessions.length === filteredSessions.length) {
        return res.status(404).json({ message: "İptal edilecek seans bulunamadı." });
    }

    fs.writeFileSync(sessionsFilePath, JSON.stringify(filteredSessions, null, 2));
    res.json({ message: "Seans başarıyla iptal edildi." });
});
// --- ARDA YILMAZ'IN GÖREVLERİ: KULLANICI VE BİLET SİSTEMİ ---

// 1. KULLANICI KAYDI (POST /auth/register)
app.post('/auth/register', (req, res) => {
    const { name, email, password, phone } = req.body;
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    if (users.find(u => u.email === email)) return res.status(400).json({ message: "Bu e-posta kayıtlı!" });

    const newUser = { id: Date.now().toString(), name, email, password, phone };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.status(201).json({ message: "Üyelik başarıyla oluşturuldu!", user: newUser });
});

// 2. KULLANICI BİLGİLERİNİ GÖRÜNTÜLEME (GET /users/:userId)
app.get('/users/:userId', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const user = users.find(u => u.id === req.params.userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    res.json(user);
});

// 3. KULLANICI BİLGİLERİNİ GÜNCELLEME (PUT /users/:userId)
app.put('/users/:userId', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const index = users.findIndex(u => u.id === req.params.userId);
    if (index === -1) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    users[index] = { ...users[index], ...req.body };
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.json({ message: "Profil güncellendi!", user: users[index] });
});

// 4. KULLANICI HESABINI KAPATMA (DELETE /users/:userId)
app.delete('/users/:userId', (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
    const filteredUsers = users.filter(u => u.id !== req.params.userId);
    fs.writeFileSync(usersFilePath, JSON.stringify(filteredUsers, null, 2));
    res.json({ message: "Hesap başarıyla silindi." });
});

// 5. BİLET SATIN ALMA (POST /tickets)
app.post('/tickets', (req, res) => {
    const { userId, sessionId, seatNumber } = req.body;
    const tickets = JSON.parse(fs.readFileSync(ticketsFilePath, 'utf8'));

    // Koltuk kontrolü: Bu koltuk bu seansta alınmış mı?
    const isTaken = tickets.find(t => t.sessionId === sessionId && t.seatNumber === seatNumber);
    if (isTaken) return res.status(400).json({ message: "Bu koltuk zaten dolu!" });

    const newTicket = { id: Date.now().toString(), userId, sessionId, seatNumber, date: new Date() };
    tickets.push(newTicket);
    fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2));
    res.status(201).json({ message: "Bilet başarıyla oluşturuldu!", ticket: newTicket });
});

// 6. BİLETLERİ LİSTELEME (GET /users/:userId/tickets)
app.get('/users/:userId/tickets', (req, res) => {
    const tickets = JSON.parse(fs.readFileSync(ticketsFilePath, 'utf8'));
    const userTickets = tickets.filter(t => t.userId === req.params.userId);
    res.json(userTickets);
});

// 7. BİLET İPTAL ETME (DELETE /tickets/:ticketId)
app.delete('/tickets/:ticketId', (req, res) => {
    const tickets = JSON.parse(fs.readFileSync(ticketsFilePath, 'utf8'));
    const filteredTickets = tickets.filter(t => t.id !== req.params.ticketId);
    fs.writeFileSync(ticketsFilePath, JSON.stringify(filteredTickets, null, 2));
    res.json({ message: "Bilet iptal edildi, koltuk artık boş." });
});

// 8. MÜSAİT KOLTUKLARI GÖRÜNTÜLEME (GET /sessions/:sessionId/seats)
app.get('/sessions/:sessionId/seats', (req, res) => {
    const tickets = JSON.parse(fs.readFileSync(ticketsFilePath, 'utf8'));
    // Bu seansa ait satılmış biletleri bul
    const soldSeats = tickets
        .filter(t => t.sessionId === req.params.sessionId)
        .map(t => t.seatNumber);

    res.json({
        sessionId: req.params.sessionId,
        soldSeats: soldSeats,
        message: "Dolu koltuklar listelendi. Diğer koltuklar müsaittir."
    });
});
// Sunucuyu Başlat
app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});
