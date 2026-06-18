// Fungsi Register
async function handleRegister() {
    const name = document.getElementById('regName').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const password = document.getElementById('regPassword').value;
    const btn = document.getElementById('btnRegister');

    if (!name || !phone || !password) {
        showAlert("Semua field harus diisi!");
        return;
    }

    if (password.length < 6) {
        showAlert("Kata sandi minimal 6 karakter!");
        return;
    }

    const email = phone + '@jastip.app';

    try {
        btn.classList.add('loading');

        // 1. Register ke Supabase Auth
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
        });

        if (authError) {
            if (authError.message.includes("already registered") || authError.message.includes("already exists") || authError.status === 400) {
                throw new Error("Nomor ini sudah terdaftar (terhubung dengan Jastip). Silakan langsung gunakan menu LOGIN.");
            }
            throw authError;
        }

        // Cek apakah ini pendaftar pertama (apakah tabel users masih kosong?)
        const { count, error: countError } = await supabaseClient
            .from('users_pijat')
            .select('*', { count: 'exact', head: true });
        
        // Jika belum ada user sama sekali (count = 0), jadikan admin. Sisanya pelanggan.
        let assignedRole = 'pelanggan';
        if (!countError && count === 0) {
            assignedRole = 'admin';
        }

        // 2. Simpan profil ke tabel users dengan role yang sesuai
        const { error: dbError } = await supabaseClient
            .from('users_pijat')
            .insert([
                { 
                    id: authData.user.id, 
                    name: name, 
                    phone: phone, 
                    role: assignedRole 
                }
            ]);

        if (dbError) throw dbError;

        showAlert("Pendaftaran berhasil! Mengalihkan...", false);
        
        // Redirect ke dashboard terpadu
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);

    } catch (error) {
        showAlert(error.message);
    } finally {
        btn.classList.remove('loading');
    }
}

// Fungsi Login
async function handleLogin() {
    const phoneInput = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('btnLogin');

    if (!phoneInput || !password) {
        showAlert("Nomor HP dan sandi harus diisi!");
        return;
    }

    // Jika input mengandung '@', berarti itu email lama. Jika tidak, anggap nomor HP.
    const email = phoneInput.includes('@') ? phoneInput : phoneInput + '@jastip.app';

    try {
        btn.classList.add('loading');

        // 1. Login dengan Supabase Auth
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) throw error;

        // 2. Ambil role user dari tabel users
        let { data: userData, error: userError } = await supabaseClient
            .from('users_pijat')
            .select('role')
            .eq('id', data.user.id)
            .single();

        // Jika user login (karena akun Jastip) tapi belum punya profil di Pijat
        if (userError && userError.code === 'PGRST116') {
            // Coba ambil data lamanya dari tabel Jastip (users)
            const { data: oldUser } = await supabaseClient.from('users').select('name, phone').eq('id', data.user.id).single();
            
            // Masukkan ke tabel Pijat
            const { error: insertErr } = await supabaseClient.from('users_pijat').insert([{
                id: data.user.id,
                name: oldUser ? oldUser.name : 'Pengguna Migrasi',
                phone: oldUser ? oldUser.phone : phoneInput,
                role: 'pelanggan'
            }]);
            
            if (insertErr) throw new Error("Gagal membuat profil Pijat otomatis: " + insertErr.message);
            
            userData = { role: 'pelanggan' };
            userError = null;
        } else if (userError) {
            throw userError;
        }

        showAlert("Login berhasil! Mengalihkan...", false);

        // 3. Arahkan berdasarkan role
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);

    } catch (error) {
        showAlert("Login gagal: " + error.message);
    } finally {
        btn.classList.remove('loading');
    }
}

// Cek Sesi (Dijalankan di setiap halaman untuk memproteksi halaman)
async function checkSession() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        // Jika belum login dan bukan di halaman login atau index utama, tendang ke login
        if (!window.location.href.includes('login.html') && !window.location.href.endsWith('/') && !window.location.href.endsWith('index.html')) {
            window.location.href = 'login.html';
        }
        return null;
    }

    // Jika sudah login, ambil datanya
    const { data: userData } = await supabaseClient
        .from('users_pijat')
        .select('*')
        .eq('id', session.user.id)
        .single();

    // Jika user mengakses halaman login tapi sudah login, tendang ke dashboardnya
    if (window.location.href.includes('login.html') && userData) {
        window.location.href = 'dashboard.html';
    }

    return userData;
}

// Fungsi Logout Umum
async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
}
