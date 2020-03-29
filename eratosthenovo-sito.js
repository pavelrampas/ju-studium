var zacatek = 0; // pocatecni hodnota
var konec = 0; // koncova hodnota
var odmocnina = 0; // odmocnina horni meze
var krokovani = false; // zapnuti automatickeho krokovani
var pocet = 0; // pocet prvocisel
var zbyva = 0;
var posledni = 2; // posledni prvocislo

// vypnuti tlacitka krok pred zadavanim hodnot
document.getElementById('krok').setAttribute('disabled', 'disabled');

// nastaveni hodnot a vykresleni tabulky s cislama
function vykresli() {
	zacatek = parseInt(document.getElementById('od').value);
	konec = parseInt(document.getElementById('do').value);
	odmocnina = Math.sqrt(konec);
	krokovani = document.getElementById("automat").checked;
	zbyva = konec - zacatek;
	if (zacatek !== 0) {
		zbyva++;
	}

	// pocet radku
	var radku = Math.ceil(((konec - zacatek) + 1) / 25);

	// zacatek tvoreni tabulky
	var div = document.getElementsByTagName('div')[0];
	var table = document.createElement('table');
	var cislo = zacatek; // aktualne vykreslovane cislo
	// tabulka ma 25 sloupcu a X radku
	for (var i = 0; i < radku; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < 25; j++) {
			var td = document.createElement('td');
			if (cislo <= konec) {
				td.setAttribute('id', cislo);
				td.appendChild(document.createTextNode(cislo));
			}
			tr.appendChild(td);
			cislo++;
		}
		table.appendChild(tr);
	}
	div.appendChild(table);

	// vypnuti zadavani hodnot
	document.getElementById('od').setAttribute('disabled', 'disabled');
	document.getElementById('do').setAttribute('disabled', 'disabled');
	document.getElementById('vykresli').setAttribute('disabled', 'disabled');
	document.getElementById('automat').setAttribute('disabled', 'disabled');
	document.getElementById('krok').removeAttribute('disabled');

	// skrtnuti 0 a 1 pokud existuji
	if (document.getElementById(0)) {
		document.getElementById(0).setAttribute('class', 'v');
		zbyva--;
	}
	if (document.getElementById(1)) {
		document.getElementById(1).setAttribute('class', 'v');
		zbyva--;
	}

	document.getElementById('zbyva').innerHTML = 'Počet nešktnutých nebo neoznačených čísel: ' + zbyva;

	// pokud je zapnute automaticke krokovani, tak krokujeme
	if (krokovani === true) {
		document.getElementById('krok').setAttribute('disabled', 'disabled');
		(function() {
			action = function() {
				krok();
				if (krokovani === true) {
					setTimeout(action, 1500);
				}
			};
			setTimeout(action, 800);
		})();
	}
}

function krok() {
	// oznaceni prvocisla a skrtani jeho nasobku
	for (var i = zacatek; i <= konec; i++) {
		document.getElementById('pocet').innerHTML = 'Škrtám násobky prvočísla: ' + posledni;
		if (i === posledni) {
			if (!document.getElementById(i).getAttribute("class")) {
				zbyva--;
			}
			document.getElementById(i).setAttribute('class', 'p');
			pocet++;
		}
		else if (i % posledni === 0) {
			if (!document.getElementById(i).getAttribute("class")) {
				zbyva--;
			}
			document.getElementById(i).setAttribute('class', 'v');
		}
	}

	// hledani dalsiho prvocisla
	for (var i = posledni + 1; i <= konec; i++) {
		var delitel = 0;
		for (var j = 1; j <= i; j++) {
			if (i % j === 0) {
				delitel++;
			}
		}
		if (delitel === 2) {
			posledni = i;
			break;
		}
	}

	// kontrola jestli dalsi prvocislo neni vetsi nez odmocnina horni meze
	// pokud ano zbyla cisla jsou prvocisla
	if (odmocnina < posledni) {
		for (var i = zacatek; i <= konec; i++) {
			if (!document.getElementById(i).getAttribute("class")) {
				document.getElementById(i).setAttribute('class', 'p');
				pocet++;
				zbyva--;
			}
		}
		document.getElementById('pocet').innerHTML = 'DOKONČENO. Počet nalezených prvočísel: ' + pocet;
		document.getElementById('krok').setAttribute('disabled', 'disabled');
		krokovani = false;
	}
	document.getElementById('zbyva').innerHTML = 'Počet nešktnutých nebo neoznačených čísel: ' + zbyva;
}
