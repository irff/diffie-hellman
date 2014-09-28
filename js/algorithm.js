// Fungsi ini menghasilkan (a ^ b) % p
function pangkat(a, b, p) {
	if(b == 0) return 1;
	var x = pangkat(a, Math.floor(b / 2), p) % p;
	if(b % 2 == 1) return (((x * x) % p) * a) % p;
	else return (x * x) % p;
}

function hitungKodePublikA(q, bilangan_rahasia_a, p) {
	return pangkat(q, bilangan_rahasia_a, p);
}

function hitungKodePublikB(q, bilangan_rahasia_b, p) {
	return pangkat(q, bilangan_rahasia_b, p);
}

function hitungSharedKeyOlehA(kode_publik_b, bilangan_rahasia_a, p) {
	return pangkat(kode_publik_b, bilangan_rahasia_a, p);
}

function hitungSharedKeyOlehB(kode_publik_a, bilangan_rahasia_b, p) {
	return pangkat(kode_publik_a, bilangan_rahasia_b, p);
}

function enkripsi(message, shift) {
	var result = "",
		length = message.length;

	for(var i = 0; i < length; i++) {
		var c = message.charCodeAt(i);
		if( c >= 65 && c <= 90) {
			result += String.fromCharCode((c - 65 + shift) % 26 + 65);
		} else
		if( c >= 97 && c <= 122) {
			result += String.fromCharCode((c - 97 + shift) % 26 + 97);
		} else {
			result += message[i];
		}
	}
	return result;
}

function dekripsi(message, shift) {
	return enkripsi(message, (26-shift) % 26);
}

$('#hitung-kode-publik-a').click(function() {
	var p = $('#p').val(),
		q = $('#q').val(),
		A = $('#A').val();

	var kode_publik_a = hitungKodePublikA(q, A, p);

	$('#kode-publik-a').html(kode_publik_a);
});

$('#hitung-kode-publik-b').click(function() {
	var p = $('#p').val(),
		q = $('#q').val(),
		B = $('#B').val();

	var kode_publik_b = hitungKodePublikB(q, B, p);

	$('#kode-publik-b').html(kode_publik_b);
});

$('#hitung-shared-key-a').click(function() {
	var p = $('#p').val(),
		A = $('#A').val(),
		kode_publik_b = $('#kode-publik-b').html();

	var shared_key_a = hitungSharedKeyOlehA(kode_publik_b, A, p);
	$('#shared-key-a').html(shared_key_a);
});

$('#hitung-shared-key-b').click(function() {
	var p = $('#p').val(),
		B = $('#B').val(),
		kode_publik_a = $('#kode-publik-a').html();

	var shared_key_b = hitungSharedKeyOlehB(kode_publik_a, B, p);
	$('#shared-key-b').html(shared_key_b);
});

$('#pesan-asli-a').on('change keyup paste', function() {
	var pesan_asli_a = $('#pesan-asli-a').val(),
		shared_key_a = $('#shared-key-a').html(),
		shared_key_b = $('#shared-key-b').html();

	var pesan_terenkripsi = enkripsi(pesan_asli_a, shared_key_a % 26);

	$('#pesan-terenkripsi').val(pesan_terenkripsi);

	var pesan_terdekripsi = dekripsi(pesan_terenkripsi, shared_key_b % 26);

	$('#pesan-terdekripsi').val(pesan_terdekripsi);
});

