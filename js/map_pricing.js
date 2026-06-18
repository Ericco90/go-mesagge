    // === MAPS & CALC ===
    let map, routeLayer, markers = [];

    let state = { currentService: 'jastip', currentFleet: 'motor', pickup: { name:'', lat:null, lon:null, displayName:'' }, dropoff: { name:'', lat:null, lon:null, displayName:'' }, distanceKm:0, durationMin:0, ongkir:0 };

    function setFleet(type) {
        state.currentFleet = type;
        document.querySelectorAll('.fleet-card').forEach(t => t.classList.remove('active'));
        if(type === 'motor') document.getElementById('fleetMotor').classList.add('active');
        if(type === 'mobil') document.getElementById('fleetMobil').classList.add('active');
        
        if (state.pickup.lat && state.dropoff.lat) {
            calculateRouteAndPrice();
        }
    }

    function setService(type) {
        state.currentService = type;
        
        // Update Tabs UI
        document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
        if(type === 'ojeg') document.getElementById('tabOjeg').classList.add('active');
        if(type === 'jastip') document.getElementById('tabJastip').classList.add('active');
        if(type === 'antar') document.getElementById('tabAntar').classList.add('active');

        // Update Labels & Placeholders
        const lblPc = document.getElementById('lblPickupCity');
        const lblPd = document.getElementById('lblPickupDetail');
        const lblDc = document.getElementById('lblDropoffCity');
        const lblDd = document.getElementById('lblDropoffDetail');
        const lblCat = document.getElementById('lblCatatan');
        const pInfo = document.getElementById('priceInfo');

        if (type === 'ojeg') {
            lblPc.textContent = 'Desa Penjemputan Penumpang';
            lblPd.textContent = 'Detail Titik Jemput / Patokan';
            document.getElementById('orderPickupDetail').placeholder = 'Contoh: Depan Indomaret, Rumah Pagar Hitam...';
            lblDc.textContent = 'Desa Tujuan Antar';
            lblDd.textContent = 'Detail Titik Tujuan';
            lblCat.textContent = 'Ciri-Ciri Penumpang / Catatan Tambahan';
            document.getElementById('orderCatatan').placeholder = 'Contoh: Saya pakai jaket merah...';
            pInfo.textContent = '*Start (0-3 KM) = Rp 10.000, selebihnya +Rp 2.500/KM.';
        } else if (type === 'jastip') {
            lblPc.textContent = 'Titik Jemput / Desa Pembelian';
            lblPd.textContent = 'Nama Tempat / Toko Produk';
            document.getElementById('orderPickupDetail').placeholder = 'Contoh: Toko Bangunan Jaya, Warung Bu Ani...';
            lblDc.textContent = 'Titik Pengantaran / Desa Tujuan';
            lblDd.textContent = 'Alamat Lengkap Tujuan';
            lblCat.textContent = 'Daftar Belanjaan / Detail Titipan';
            document.getElementById('orderCatatan').placeholder = 'Contoh:\n1. Nasi Goreng Spesial (1 porsi)\n2. Es Teh Manis (2 bungkus)';
            pInfo.textContent = '*Jasa Titip (0-3 KM) = Rp 5.000, selebihnya +Rp 2.000/KM.';
        } else if (type === 'antar') {
            lblPc.textContent = 'Desa Pengambilan Barang';
            lblPd.textContent = 'Detail Lokasi Ambil Barang';
            document.getElementById('orderPickupDetail').placeholder = 'Contoh: Rumah Bpk. Budi, sebelah masjid...';
            lblDc.textContent = 'Desa Tujuan Antar Barang';
            lblDd.textContent = 'Detail Alamat Penerima';
            lblCat.textContent = 'Deskripsi Barang yang Diantar';
            document.getElementById('orderCatatan').placeholder = 'Contoh:\n1 Dus Aqua, berat 5kg...';
            pInfo.textContent = '*Start (0-3 KM) = Rp 10.000, selebihnya +Rp 2.500/KM. (Harga berubah jika pilih Mobil)';
            document.getElementById('fleetSelection').style.display = 'grid';
        }

        if (type !== 'antar') {
            document.getElementById('fleetSelection').style.display = 'none';
        }

        // Recalculate if locations are already picked
        if (state.pickup.lat && state.dropoff.lat) {
            calculateRouteAndPrice();
        }
    }

    function debounce(fn, d) { let t; return function(...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), d); }; }
    function escapeHtml(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
    function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function renderLocationList(items, list, type, query) {
        list.innerHTML = '';
        if (!items.length) { list.innerHTML = '<li class="loading-text">Lokasi tidak ditemukan di Tegal & Brebes.</li>'; list.style.display = 'block'; return; }
        items.forEach(item => {
            const li = document.createElement('li');
            const dn = item.displayName || item.name;
            const safe = escapeHtml(dn), sq = escapeHtml(query.trim());
            const hl = sq ? safe.replace(new RegExp(`(${escapeRegExp(sq)})`, 'ig'), '<strong>$1</strong>') : safe;
            li.innerHTML = `<i class="fas fa-map-marker-alt"></i> <span>${hl}</span>`;
            li.onclick = () => selectLocation(item, type, list, dn);
            list.appendChild(li);
        });
        list.style.display = 'block';
    }

    function fetchLocations(query, list, type) {
        const nq = query.trim().toLowerCase();
        const cq = nq.replace(/^(desa|kelurahan|kecamatan|kec\.|kab\.|kabupaten)\s+/i, '').trim();
        
        if (!cq) {
            list.style.display = 'none';
            return;
        }

        // Search offline database directly
        const results = DESA_DATABASE.filter(i => i.name.toLowerCase().includes(cq));
        
        // Sort to prioritize exact startsWith matches or shorter strings
        results.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            if (aName.startsWith(cq) && !bName.startsWith(cq)) return -1;
            if (!aName.startsWith(cq) && bName.startsWith(cq)) return 1;
            return aName.length - bName.length;
        });

        // Show max 15 results
        renderLocationList(results.slice(0, 15), list, type, query);
    }

    function selectLocation(item, type, list, dn) {
        document.getElementById(type === 'pickup' ? 'orderPickup' : 'orderTujuan').value = dn;
        list.style.display = 'none';
        if (type === 'pickup') state.pickup = { name: item.name, lat: item.lat, lon: item.lon, displayName: dn };
        else state.dropoff = { name: item.name, lat: item.lat, lon: item.lon, displayName: dn };
        if (state.pickup.lat && state.dropoff.lat) calculateRouteAndPrice();
    }

    const pickupInput = document.getElementById('orderPickup'), pickupList = document.getElementById('pickupList');
    pickupInput.addEventListener('input', e => { 
        state.pickup = { name:'', lat:null, lon:null }; 
        document.getElementById('resultBox').style.display = 'none'; 
        if (e.target.value.length >= 2) fetchLocations(e.target.value, pickupList, 'pickup'); 
        else pickupList.style.display = 'none'; 
    });
    pickupInput.addEventListener('blur', e => {
        setTimeout(() => {
            if (!state.pickup.lat && e.target.value.length >= 2) {
                const cq = e.target.value.toLowerCase().replace(/^(desa|kelurahan|kecamatan|kec\.|kab\.|kabupaten)\s+/i, '').trim();
                const results = DESA_DATABASE.filter(i => i.name.toLowerCase().includes(cq));
                if (results.length > 0) selectLocation(results[0], 'pickup', pickupList, results[0].displayName || results[0].name);
            }
        }, 200);
    });

    const tujuanInput = document.getElementById('orderTujuan'), tujuanList = document.getElementById('tujuanList');
    tujuanInput.addEventListener('input', e => { 
        state.dropoff = { name:'', lat:null, lon:null }; 
        document.getElementById('resultBox').style.display = 'none'; 
        if (e.target.value.length >= 2) fetchLocations(e.target.value, tujuanList, 'dropoff'); 
        else tujuanList.style.display = 'none'; 
    });
    tujuanInput.addEventListener('blur', e => {
        setTimeout(() => {
            if (!state.dropoff.lat && e.target.value.length >= 2) {
                const cq = e.target.value.toLowerCase().replace(/^(desa|kelurahan|kecamatan|kec\.|kab\.|kabupaten)\s+/i, '').trim();
                const results = DESA_DATABASE.filter(i => i.name.toLowerCase().includes(cq));
                if (results.length > 0) selectLocation(results[0], 'dropoff', tujuanList, results[0].displayName || results[0].name);
            }
        }, 200);
    });

