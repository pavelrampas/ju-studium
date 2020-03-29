var vstup = 0;
var rozkladNaPrvocisla = [];
var vstupPrvocisla = [];
var seznamDelitelu = [];
var nesoudelnaCisla = [];
var nesoudelnaCisla1 = [];
var nastaveni = 0;

function zpracuj() {
	// nacteni cisla ze vstupu
	vstup = parseInt(document.getElementById('vstup').value);
	// vypnuti tlacitka
	document.getElementById('zpracuj').setAttribute('disabled', 'disabled');

	// kontrola jestli je vstup vetsi nez 1
	if (vstup < 2) {
		document.getElementById('info').innerHTML = "NEPLATNÝ VSTUP";
		nastaveni = 0;
	} else {
		if (document.getElementById('nastaveni1').checked) {
			nastaveni = 1;
		} else if (document.getElementById('nastaveni2').checked) {
			nastaveni = 2;
		} else if (document.getElementById('nastaveni3').checked) {
			nastaveni = 3;
		} else if (document.getElementById('nastaveni4').checked) {
			nastaveni = 4;
		}

		rozkladNaPrvocisla = seradPole(rozlozNaPrvocisla(vstup));
		vstupPrvocisla = seznamPrvocisel(rozkladNaPrvocisla);

		// rozklad na prvocisla
		document.getElementById('prvocisla').innerHTML = rozkladNaPrvocisla;
		if(nastaveni !== 4) {
			seznamDelitelu = najdiDelitele(vstup);
			// pocet delitelu
			document.getElementById('pocetdelitelu').innerHTML = seznamDelitelu.length;
			// seznam delitelu
			var delitele = "";
			for (var i = 0; i < seznamDelitelu.length; i++) {
				delitele += seznamDelitelu[i] + ", ";
			}
			document.getElementById('delitele').innerHTML = delitele;
		}
		// vypis hotovo
		document.getElementById('info').innerHTML = 'HOTOVO';
	}

	// vypsani hodnot podle zadane varianty vypoctu
	if (nastaveni === 1 || nastaveni === 2) {
		nesoudelnaCisla = najdiNesoudelnaCisla(vstup, seznamDelitelu);
		// nesoudelna cisla porovnanim delitelu
		document.getElementById('vysledek1').innerHTML = nesoudelnaCisla.length;
		// seznam nesoudelnych cisel
		var nesoudelna = "";
		for (var i = 0; i < nesoudelnaCisla.length; i++) {
			nesoudelna += nesoudelnaCisla[i] + ", ";
		}
		document.getElementById('nesoudelnacisla').innerHTML = nesoudelna;
	}
	if (nastaveni === 1 || nastaveni === 3) {
		nesoudelnaCisla1 = porovnavaniPrvocisel(vstup, vstupPrvocisla);
		// nesoudelna cisla porovnanim rozkladu na prvocisla
		document.getElementById('vysledek3').innerHTML = nesoudelnaCisla1.length;
		if (nastaveni === 3) {
			// seznam nesoudelnych cisel
			var nesoudelna = "";
			for (var i = 0; i < nesoudelnaCisla1.length; i++) {
				nesoudelna += nesoudelnaCisla1[i] + ", ";
			}
			document.getElementById('nesoudelnacisla').innerHTML = nesoudelna;
		}
	}
	if (nastaveni === 1 || nastaveni === 4) {
		// nesoudelna cisla Eulerovo funkci
		document.getElementById('vysledek2').innerHTML = Math.round(eulerovaFunkce(vstup, vstupPrvocisla));
	}
}

// resetovani hodnot
function reset() {
	vstup = 0;
	rozkladNaPrvocisla = null;
	vstupPrvocisla = null;
	seznamDelitelu = null;
	nesoudelnaCisla = null;
	nesoudelnaCisla1 = null;
	nastaveni = 0;

	document.getElementById('info').innerHTML = '';
	document.getElementById('vstup').value = '';
	document.getElementById('vysledek1').innerHTML = '';
	document.getElementById('vysledek2').innerHTML = '';
	document.getElementById('vysledek3').innerHTML = '';
	document.getElementById('cas1').innerHTML = '';
	document.getElementById('cas2').innerHTML = '';
	document.getElementById('cas3').innerHTML = '';
	document.getElementById('cas4').innerHTML = '';
	document.getElementById('cas5').innerHTML = '';
	document.getElementById('nesoudelnacisla').innerHTML = '&nbsp;';
	document.getElementById('pocetdelitelu').innerHTML = '';
	document.getElementById('delitele').innerHTML = '';
	document.getElementById('prvocisla').innerHTML = '';
	document.getElementById('zpracuj').removeAttribute('disabled');
}

// hleda nesoudelna cisla porovnavanim delitelu
function najdiNesoudelnaCisla(cislo, deliteleCisla) {
	// spoustime stopky
	var zacatek = new Date();
	var zacatekCas = zacatek.getTime();

	var shoda; // pocet shodnych delitelu s nejakym cislem
	var pole = []; // pole nesoudelnych cisel
	pole.push(1); // 1 je nesoudelna vzdy
	for (var i = 2; i < cislo; i++) {
		shoda = 0;
		for (var j = 1; j <= i; j++) {
			if ((i % j) === 0) {
				for (var x = 0; x < deliteleCisla.length; x++) {
					if (j === deliteleCisla[x]) {
						shoda++;
					}
				}
				if (shoda === 2) {
					break;
				}
			}
		}
		if (shoda === 1) {
			pole.push(i);
		}
	}

	// vypiname stopky a pocitame cas
	var konec = new Date();
	var konecCas = konec.getTime();
	document.getElementById('cas1').innerHTML = (konecCas - zacatekCas) / 1000 + " vteřiny";

	return pole;
}

// nesoudelna cisla Eulerovo funkci
function eulerovaFunkce(cislo, prvocisla) {
	// spoustime stopky
	var zacatek = new Date();
	var zacatekCas = zacatek.getTime();

	vysledek = cislo;

	for (var i = 0; i < prvocisla.length; i++) {
		vysledek = vysledek * (1 - (1 / prvocisla[i]));
	}

	// vypiname stopky a pocitame cas
	var konec = new Date();
	var konecCas = konec.getTime();
	document.getElementById('cas2').innerHTML = (konecCas - zacatekCas) / 1000 + " vteřiny";

	return vysledek;
}

// zredukuje seznam prvocisel aby se neopakovala
function seznamPrvocisel(prvocisla) {
	var pole = []; // pole prvocisel
	var posledni = prvocisla[0];
	pole.push(posledni);
	for (var i = 1; i < prvocisla.length; i++) {
		if (posledni !== prvocisla[i]) {
			posledni = prvocisla[i];
			pole.push(prvocisla[i]);
		}
	}
	return pole;
}

// rozklad cisla na prvocisla
function rozlozNaPrvocisla(cislo) {
	// spoustime stopky
	var zacatek = new Date();
	var zacatekCas = zacatek.getTime();

	var delej = true; // provadej dokud nereknu stop
	var pole = []; // pole prvocisel
	while (delej) {
		for (var i = 2; i <= cislo; i++) {
			if (i > Math.sqrt(cislo) || cislo === 2) {
				pole.push(cislo);
				delej = false;
				break;
			}
			if (cislo % i === 0) {
				pole.push(i);
				cislo = cislo / i;
				break;
			}
		}
	}

	// vypiname stopky a pocitame cas
	var konec = new Date();
	var konecCas = konec.getTime();
	document.getElementById('cas4').innerHTML = (konecCas - zacatekCas) / 1000 + " vteřiny";

	return pole;
}

// hleda delitele cisla
function najdiDelitele(cislo) {
	// spoustime stopky
	var zacatek = new Date();
	var zacatekCas = zacatek.getTime();

	var pole = []; // pole delitelu
	for (var i = 0; i < cislo; i++) {
		if ((cislo % i) === 0) {
			pole.push(i);
		}
	}

	// vypiname stopky a pocitame cas
	var konec = new Date();
	var konecCas = konec.getTime();
	document.getElementById('cas5').innerHTML = (konecCas - zacatekCas) / 1000 + " vteřiny";

	return pole;
}

// hleda nesoudelna cisla porovnavanim rozkladu na prvocisla
function porovnavaniPrvocisel(cislo, prvocisla) {
	// spoustime stopky
	var zacatek = new Date();
	var zacatekCas = zacatek.getTime();

	var vysledek = [];
	vysledek.push(1);
	var shoda; // pocet shodnych prvocisel
	var pole = []; // seznam prvocisel porovnavaneho cisla

	for (var i = 2; i < cislo; i++) {
		shoda = 0;
		pole = seznamPrvocisel(seradPole(rozlozNaPrvocisla(i)));
		for (var j = 0; j < pole.length; j++) {
			for (var x = 0; x < prvocisla.length; x++) {
				if (pole[j] === prvocisla[x]) {
					shoda++;
				}
			}
			if (shoda > 0) {
				break;
			}
		}
		if (shoda === 0) {
			vysledek.push(i);
		}
	}

	// vypiname stopky a pocitame cas
	var konec = new Date();
	var konecCas = konec.getTime();
	document.getElementById('cas3').innerHTML = (konecCas - zacatekCas) / 1000 + " vteřiny";

	return vysledek;
}

// seradi pole od nejmensi po nejvetsi cislo
function seradPole(pole) {
	var kontrola = 0;
	var a = 0;

	for (var i = 0; i < pole.length; i++) {
		for (var j = 0; j < ((pole.length - 1) - i); j++) {
			if (pole[i] > pole[i + 1]) {
				a = pole[i];
				pole[i] = pole[i + 1];
				pole[i + 1] = a;
				kontrola++;
			}
		}
		if (kontrola === 0) {
			break;
		}
		kontrola = 0;
	}

	return pole;
}