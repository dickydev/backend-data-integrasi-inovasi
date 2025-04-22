# **Dokumentasi Backend - Jadwal Dokter**

## **Instalasi dan Setup**

1. **Clone Repository**

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
```

2. **Instalasi Dependencies**

```bash
npm install
```

3. **Konfigurasi Database**

Pastikan Anda telah membuat database MySQL dan membuat tabel berikut:

**Tabel `doctors`:**

```sql
CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
```

**Tabel `schedules`:**

```sql
CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  day VARCHAR(20),
  time_start TIME,
  time_finish TIME,
  quota INT,
  status VARCHAR(20),
  schedule_date DATE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);
```

**Tabel `users`:**

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

4. **Konfigurasi `.env`**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

5. **Menjalankan Server**

```bash
npm start
```

Server berjalan di: `http://localhost:3000`

---

## **Autentikasi (JWT)**

Semua route yang berhubungan dengan dokter dan jadwal memerlukan autentikasi. Pengguna harus login terlebih dahulu untuk mendapatkan token JWT.

Tambahkan header berikut pada setiap permintaan API:

```
Authorization: Bearer <token>
```

---

## **Routes API**

### 🔐 Auth

#### **1. POST /api/auth/register**

**Deskripsi:** Mendaftarkan user baru.

**Body Request:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

---

#### **2. POST /api/auth/login**

**Deskripsi:** Login dan mendapatkan token JWT.

**Body Request:**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "token": "your_jwt_token"
}
```

---

### 👨‍⚕️ Dokter

#### **3. GET /api/doctor**

**Deskripsi:** Mengambil semua data dokter.

**Contoh Response:**

```json
[
  {
    "id": 1,
    "name": "Dr.Dicky"
  }
]
```

---

#### **4. POST /api/doctor**

**Deskripsi:** Menambahkan dokter baru.

**Body Request:**

```json
{
  "name": "Dr.Maya"
}
```

---

### 📅 Jadwal

#### **5. POST /api/schedules/**

**Deskripsi:** Menambahkan jadwal dokter berdasarkan tanggal rentang dan hari.

**Body Request:**

```json
{
  "doctor_id": 1,
  "day": "senin",
  "time_start": "08:00",
  "time_finish": "10:00",
  "quota": 10,
  "status": "active",
  "schedule_date": "2023-04-01 s/d 2023-04-05"
}
```

---

#### **6. GET /api/schedules/:doctorId/**

**Deskripsi:** Menampilkan semua jadwal untuk seorang dokter.

**Contoh Response:**

```json
[
  {
    "id": 1,
    "doctor_id": 1,
    "day": "senin",
    "time_start": "08:00",
    "time_finish": "10:00",
    "quota": 10,
    "status": "active",
    "schedule_date": "2023-04-01"
  }
]
```

---

## **Error Handling**

**Contoh Response:**

```json
{
  "message": "Doctor not found"
}
```

### Kode Status:

- `200 OK` - Request berhasil
- `201 Created` - Data berhasil dibuat
- `400 Bad Request` - Validasi gagal
- `401 Unauthorized` - Token tidak valid atau tidak ada
- `404 Not Found` - Data tidak ditemukan
- `500 Internal Server Error` - Error dari server

---

## **Catatan Tambahan**

- Jangan lupa untuk menggunakan JWT di semua request yang membutuhkan autentikasi.
- Format tanggal `schedule_date` menggunakan `"YYYY-MM-DD s/d YYYY-MM-DD"`.

## **Penutup**

Dokumentasi ini menjelaskan cara instalasi dan penggunaan API untuk mengelola jadwal dokter. Pastikan untuk mengikuti langkah-langkah instalasi dan mencoba semua endpoint yang telah dijelaskan di atas. Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi pengembang backend ini.
