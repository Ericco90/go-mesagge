const fs = require('fs');

const tegal_text = `
**1. Kecamatan Margasari (-7.0977, 109.0215) — 13 desa:**
- Danaraja
- Dukuh Tengah
- Jatilaba
- Jembayat
- Kaligayam
- Kalisalak
- Karangdawa
- Marga Ayu
- Margasari
- Pakulaut
- Prupuk Selatan
- Prupuk Utara
- Wanasari

**2. Kecamatan Bumijawa (-7.1854, 109.1285) — 18 desa:**
- Batumirah
- Begawat
- Bumijawa
- Carul
- Cawitali
- Cempaka
- Cintamanik
- Dukuh Benda
- Guci
- Gunung Agung
- Jejeg
- Muncanglarang
- Pagerkasih
- Sigedong
- Sokasari
- Sokatengah
- Sumbaga
- Traju

**3. Kecamatan Bojong (-7.1629, 109.1761) — 17 desa:**
- Batunyana
- Bojong
- Buniwah
- Cikura
- Danasari
- Dukuhtengah
- Gunungjati
- Kajenengan
- Kalijambu
- Karangmulyo
- Kedawung
- Lengkong
- Pucang Luwuk
- Rembul
- Sangkanayu
- Suniarsih
- Tuwel

**4. Kecamatan Balapulang (-7.0525, 109.1001) — 20 desa:**
- Balapulang Kulon
- Balapulang Wetan
- Banjaranyar
- Batuagung
- Bukateja
- Cenggini
- Cibunar
- Cilongok
- Danareja
- Danawarih
- Harjawinangun
- Kalibakung
- Kaliwungu
- Karangjambu
- Pagerwangi
- Pamiritan
- Sangkanjaya
- Sesepan
- Tembongwah
- Wringinjenggot

**5. Kecamatan Pagerbarang (-7.0244, 109.0572) — 13 desa:**
- Jatiwangi
- Karanganyar
- Kedungsugih
- Kertaharja
- Mulyoharjo
- Pagerbarang
- Pesarean
- Rajegwesi
- Randusari
- Semboja
- Sidamulya
- Srengseng
- Surokidul

**6. Kecamatan Lebaksiu (-7.0419, 109.1285) — 15 desa:**
- Balaradin
- Dukuhdamu
- Dukuhlo
- Jatimulyo
- Kajen
- Kambangan
- Kesuben
- Lebak Goah
- Lebaksiu Kidul
- Lebaksiu Lor
- Pendawa
- Slarang Kidul
- Tegalandong
- Timbangreja
- Yamansari

**7. Kecamatan Jatinegara (-7.0379, 109.2237) — 17 desa:**
- Argatawang
- Capar
- Cerih
- Dukuhbangsa
- Gantungan
- Jatinegara
- Kedungwungu
- Lebakwangi
- Lembasari
- Luwijawa
- Mokaha
- Padasari
- Penyalahan
- Setail
- Sumbarang
- Tamansari
- Wotgalih

**8. Kecamatan Kedungbanteng (-6.9765, 109.2237) — 10 desa:**
- Dukuhjati Wetan
- Karanganyar
- Karangmalang
- Kebandingan
- Kedungbanteng
- Margamulya
- Penujah
- Semedo
- Sumingkir
- Tonggara

**9. Kecamatan Pangkah (-6.9741, 109.1583) — 23 desa:**
- Balamoa
- Bedug
- Bogares Kidul
- Bogares Lor
- Curug
- Depok
- Dermasandi
- Dermasuci
- Dukuhjati Kidul
- Dukuhsembung
- Grobog Kulon
- Grobog Wetan
- Jenggawur
- Kalikangkung
- Kendalserut
- Paketiban
- Pangkah
- Pecabean
- Pener
- Penusupan
- Purbayasa
- Rancawiru
- Talok

**10. Kecamatan Slawi (-6.9854, 109.1345) — 10 (5 desa + 5 kelurahan):**
- Dukuhsalam (desa)
- Dukuhwringin (desa)
- Kalisapu (desa)
- Slawi Kulon (desa)
- Trayeman (desa)
- Kagok (kelurahan)
- Kudaile (kelurahan)
- Pakembaran (kelurahan)
- Procot (kelurahan)
- Slawi Wetan (kelurahan)

**11. Kecamatan Dukuhwaru (-6.9669, 109.0869) — 10 desa:**
- Blubuk
- Bulakpacing
- Dukuhwaru
- Gumayun
- Kabunan
- Kalisoka
- Pedagangan
- Selapura
- Sindang
- Slarang Lor

**12. Kecamatan Adiwerna (-6.9391, 109.1259) — 21 desa:**
- Adiwerna
- Bersole
- Gumalar
- Harjosari Kidul
- Harjosari Lor
- Kalimati
- Kaliwadas
- Kedungsukun
- Lemahduwur
- Lumingser
- Pagedangan
- Pagiyanten
- Pecangakan
- Pedeslohor
- Penarukan
- Pesarean
- Tembok Banjaran
- Tembok Kidul
- Tembok Lor
- Tembok Luwung
- Ujungrusi

**13. Kecamatan Dukuhturi (-6.9046, 109.1107) — 18 desa:**
- Bandasari
- Debong Wetan
- Dukuhturi
- Grogol
- Kademangaran
- Karanganyar
- Kepandean
- Ketanggungan
- Kupu
- Lawatan
- Pagongan
- Pekauman Kulon
- Pengabean
- Pengarasan
- Pepedan
- Sidakaton
- Sidapurna
- Sutapranan

**14. Kecamatan Talang (-6.9026, 109.1583) — 19 desa:**
- Bengle
- Cangkring
- Dawuhan
- Dukuhmalang
- Gembongkulon
- Getaskerep
- Kajen
- Kaladawa
- Kaligayam
- Kebasen
- Langgen
- Pacul
- Pasangan
- Pegirikan
- Pekiringan
- Pesayangan
- Talang
- Tegalwangi
- Wangandawa

**15. Kecamatan Tarub (-6.9220, 109.1821) — 20 desa:**
- Brekat
- Bulakwaru
- Bumiharja
- Jatirawa
- Kabukan
- Kalijambe
- Karangjati
- Karangmangu
- Kedokansayang
- Kedungbungkus
- Kemanggungan
- Kesadikan
- Kesamiran
- Lebeteng
- Mangunsaren
- Margapadang
- Mindaka
- Purbasana
- Setu
- Tarub

**16. Kecamatan Kramat (-6.8753, 109.1999) — 20 (19 desa + 1 kelurahan):**
- Babakan
- Bangun Galih
- Bongkok
- Dampyak (kelurahan)
- Dinuk
- Jatilawang
- Kemantran
- Kemuning
- Kepunduhan
- Kertaharja
- Kertayasa
- Ketileng
- Kramat
- Maribaya
- Mejasem Barat
- Mejasem Timur
- Munjungagung
- Padaharja
- Plumbungan
- Tanjungharja

**17. Kecamatan Suradadi (-6.9114, 109.2578) — 11 desa:**
- Bojongsana
- Gembongdadi
- Harjasari
- Jatibogor
- Jatimulya
- Karangmulya
- Karangwuluh
- Kertasari
- Purwahamba
- Sidaharja
- Suradadi

**18. Kecamatan Warureja (-6.8908, 109.3188) — 12 desa:**
- Banjaragung
- Banjarturi
- Demangharjo
- Kedungjati
- Kedungkelor
- Kendayakan
- Kreman
- Rangimulya
- Sidamulya
- Sigentong
- Sukareja
- Warureja
`;

const brebes_text = `
**1. Kecamatan Salem (-7.1818, 108.8059) — 21 desa:**
- Banjaran
- Bentar
- Bentarsari
- Capar
- Ciputih
- Citimbang
- Gandoang
- Ganggawang
- Gunung Jaya
- Gunung Larang
- Gunung Sugih
- Gunung Tajem
- Indrajaya
- Kadumanis
- Pabuaran
- Pasir Panjang
- Salem
- Tembongraja
- Wanoja
- Winduasri
- Windusakti

**2. Kecamatan Bantarkawung (-7.2134, 108.9180) — 18 desa:**
- Bangbayang
- Banjarsari
- Bantarkawung
- Bantarwaru
- Cibentang
- Cinanas
- Ciomas
- Jipang
- Karangpari
- Kebandungan
- Legok
- Pangebatan
- Pengarasan
- Sindangwangi
- Tambakserang
- Telaga
- Terlaya
- Waru

**3. Kecamatan Bumiayu (-7.2479, 109.0078) — 15 desa:**
- Adisana
- Bumiayu
- Dukuhturi
- Jatisawit
- Kalierang
- Kalilangkap
- Kalinusu
- Kalisumur
- Kaliwadas
- Langkap
- Laren
- Negaradaha
- Pamijen
- Penggarutan
- Pruwatan

**4. Kecamatan Paguyangan (-7.3013, 109.0388) — 12 desa:**
- Cilibur
- Cipetung
- Kedungoleng
- Kretek
- Pagojengan
- Paguyangan
- Pakujati
- Pandansari
- Ragatunjung
- Taraban
- Wanatirta
- Winduaji

**5. Kecamatan Sirampog (-7.2043, 109.0621) — 13 desa:**
- Batursari
- Benda
- Buniwah
- Dawuhan
- Igirklanceng
- Kaligiri
- Kaliloka
- Manggis
- Mendala
- Mlayang
- Plompong
- Sridadi
- Wanareja

**6. Kecamatan Tonjong (-7.1751, 109.0270) — 14 desa:**
- Galuh Timur
- Kalijurang
- Karangjongkeng
- Kutamendala
- Kutayu
- Linggapura
- Negarayu
- Pepedan
- Purbayasa
- Purwodadi
- Rajawetan
- Tanggeran
- Tonjong
- Watujaya

**7. Kecamatan Larangan (-7.0013, 108.9467) — 11 desa:**
- Kamal
- Karangbale
- Kedungbokor
- Larangan
- Luwunggede
- Pamulihan
- Rengaspendawa
- Siandong
- Sitanggal
- Slatri
- Wlahar

**8. Kecamatan Ketanggungan (-6.9408, 108.8982) — 21 desa:**
- Baros
- Buara
- Bulakelor
- Ciduwet
- Cikeusal Kidul
- Cikeusal Lor
- Ciseureuh
- Dukuhbadag
- Dukuhtengah
- Dukuhturi
- Jemasih
- Karangbandung
- Karangmalang
- Ketanggungan
- Kubangjati
- Kubangsari
- Kubangwungu
- Padakaton
- Pamedaran
- Sindangjaya
- Tanggungsari

**9. Kecamatan Banjarharjo (-6.9848, 108.8541) — 25 desa:**
- Bandungsari
- Banjar Lor
- Banjarharjo
- Blandongan
- Ciawi
- Cibendung
- Cibuniwangi
- Cigadung
- Cihaur
- Cikakak
- Cikuya
- Cimunding
- Cipajang
- Dukuhjeruk
- Karangmaja
- Kertasari
- Kubangjero
- Malahayu
- Parireja
- Penanggapan
- Pende
- Sindangheula
- Sukareja
- Tegalreja
- Tiwulandu

**10. Kecamatan Losari (-6.8492, 108.8153) — 22 desa:**
- Babakan
- Blubuk
- Bojongsari
- Dukuhsalam
- Jatisawit
- Kalibuntu
- Karangdempel
- Karangjunti
- Karangsambung
- Kecipir
- Kedungneng
- Limbangan
- Losari Kidul
- Losari Lor
- Negla
- Pekauman
- Pengabean
- Prapag Kidul
- Prapag Lor
- Randegan
- Randusari
- Rungkang

**11. Kecamatan Tanjung (-6.8748, 108.8576) — 18 desa:**
- Karangreja
- Kedawung
- Kemurang Kulon
- Kemurang Wetan
- Krakahan
- Kubangputat
- Lemah Abang
- Luwung Gede
- Luwungbata
- Mundu
- Pejagan
- Pengaradan
- Sarireja
- Sengon
- Sidakaton
- Tanjung
- Tegongan
- Tengguli

**12. Kecamatan Kersana (-6.9293, 108.8598) — 13 desa:**
- Ciampel
- Cigedog
- Cikandang
- Jagapura
- Kemukten
- Kersana
- Kradenan
- Kramatsampang
- Kubangpari
- Limbangan
- Pende
- Sindangjaya
- Sutamaja

**13. Kecamatan Bulakamba (-6.8745, 108.9564) — 19 desa:**
- Bangsri
- Banjaratma
- Bulakamba
- Bulakparen
- Bulusari
- Cimohong
- Cipelem
- Dukuhlo
- Grinting
- Jubang
- Karangsari
- Kluwut
- Luwungragi
- Pakijangan
- Petunjungan
- Pulogading
- Rancawuluh
- Siwuluh
- Tegalglagah

**14. Kecamatan Wanasari (-6.8643, 109.0061) — 20 desa:**
- Dukuhwringin
- Dumeling
- Glonggong
- Jagalempeni
- Keboledan
- Kertabesuki
- Klampok
- Kupu
- Lengkong
- Pebatan
- Pesantunan
- Sawojajar
- Siasem
- Sidamulya
- Sigentong
- Sisalam
- Siwungkuk
- Tanjungsari
- Tegalgandu
- Wanasari

**15. Kecamatan Songgom (-6.9970, 109.0200) — 10 desa:**
- Cenang
- Dukuhmaja
- Gegerkunci
- Jatimakmur
- Jatirokeh
- Karangsembung
- Songgom
- Songgom Lor
- Wanacala
- Wanatawang

**16. Kecamatan Jatibarang (-6.9672, 109.0650) — 22 desa:**
- Bojong
- Buaran
- Janegara
- Jatibarang Kidul
- Jatibarang Lor
- Kalialang
- Kalipucang
- Karanglo
- Kebogadung
- Kebonagung
- Kedungtukang
- Kemiriamba
- Kendawa
- Kertasinduyasa
- Klampis
- Klikiran
- Kramat
- Pamengger
- Pedeslohor
- Rengasbandung
- Tegalwulung
- Tembelang

**17. Kecamatan Brebes (-6.8782, 109.0447) — 23 (18 desa + 5 kelurahan):
- Pemaron
- Kalimati
- Lembarawa
- Krasak
- Padasugih
- Wangandalem
- Terlangu
- Pulosari
- Brebes (Kelurahan)
- Gandasuli (Kelurahan)
- Banjaranyar
- Kaligangsa Kulon
- Kaligangsa Wetan
- Randusanga Wetan
- Randusanga Kulon
- Limbangan Wetan (Kelurahan)
- Limbangan Kulon (Kelurahan)
- Pasarbatang (Kelurahan)
- Sigambir
- Pagejugan
- Kedunguter
- Tengki
- Kaliwlingi
`;

function parseText(text, kabName) {
    const lines = text.split('\n');
    const data = [];
    let currentKec = null;
    let currentLat = null;
    let currentLon = null;

    const kecRegex = /\*\*\d+\.\s+Kecamatan\s+([A-Za-z\s]+)\s+\(([-\d\.]+),\s+([-\d\.]+)\)/;

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        const kecMatch = line.match(kecRegex);
        if (kecMatch) {
            currentKec = kecMatch[1].trim();
            currentLat = parseFloat(kecMatch[2]);
            currentLon = parseFloat(kecMatch[3]);
            continue;
        }

        if (line.startsWith('- ') && currentKec) {
            let desaName = line.substring(2).trim();
            desaName = desaName.replace(/\s*\((desa|kelurahan)\)/gi, '').trim();
            desaName = desaName.replace(/\*/g, '');
            
            data.push({
                name: `${desaName}, ${currentKec}, ${kabName}`,
                lat: currentLat,
                lon: currentLon,
                displayName: `${desaName}, ${currentKec}`
            });
        }
    }
    return data;
}

const tegalData = parseText(tegal_text, "Kabupaten Tegal");
const brebesData = parseText(brebes_text, "Kabupaten Brebes");

const allData = tegalData.concat(brebesData);

const jsContent = `const DESA_DATABASE = ${JSON.stringify(allData, null, 4)};\n`;

fs.writeFileSync('c:\\Users\\USER\\Desktop\\jastip\\desa-data.js', jsContent);
console.log(`Generated ${allData.length} desa entries.`);
