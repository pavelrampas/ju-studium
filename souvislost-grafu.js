var vstup; // vstupni hodnoty
var div; // misto do ktereho se vkladaji data
var pole = []; // pole vrcholu a hran
var poleVrcholu = []; // pole vrcholu
var prosleVrcholyCelkem = []; // prosle vrcholy celkem
var vysledek = true;

document.getElementById('vykresli').addEventListener('click', vykresli);
document.getElementById('reset').addEventListener('click', reset);

function vykresli() {
	// nacteni hodnot
	vstup = document.getElementById('hrany').value;
	div = document.getElementById('pruchod');

	// kontrola vstupu
	if (vstup.length < 3) {
		alert("Chybný vstup");
		die;
	}

	// vypnuti tlacitka
	document.getElementById('vykresli').setAttribute('disabled', 'disabled');

	// vytvoreni grafu ve forme pole
	vytvorGraf(vstup);
	vypis(pole);

	var dalsiVrchol;
	var neni = true;
	// projde graf, pripadne vsechny komponenty grafu
	while (prosleVrcholyCelkem.length !== poleVrcholu.length) {
		if (prosleVrcholyCelkem.length < 1) {
			projdiGraf(poleVrcholu[0]);
			div.innerHTML += "<br>";
		} else {
			for (var i = 0; i < poleVrcholu.length; i++) {
				for (var j = 0; j < prosleVrcholyCelkem.length; j++) {
					if (poleVrcholu[i] == prosleVrcholyCelkem[j]) {
						neni = false;
					}
				}
				if (neni) {
					dalsiVrchol = poleVrcholu[i];
					neni = true;
					break;
				}
				neni = true;
			}
			projdiGraf(dalsiVrchol);
			div.innerHTML += "<br>";
			vysledek = false;
		}
	}

	// zjisteni jestli je graf souvisly nebo ne
	if (vysledek) {
		document.getElementById('vysledek').innerHTML += "je souvislý";
	} else {
		document.getElementById('vysledek').innerHTML += "není souvislý";
	}
}

function projdiGraf(pocatek) {
	var zasobnikVrcholu = []; // vrcholy ktere se budou prochazet
	var prosleVrcholy = []; // prosle vrcholy

	// zavedeni prvniho vrcholu ke zpracovani
	prosleVrcholy.push(pocatek);
	prosleVrcholyCelkem.push(pocatek);
	vypis2(prosleVrcholy);
	div.innerHTML += " &nbsp;=>&nbsp; ";
	for (var i = 0; i < pole[pocatek].length; i++) {
		zasobnikVrcholu.push(pole[pocatek][i]);
		prosleVrcholy.push(pole[pocatek][i]);
		prosleVrcholyCelkem.push(pole[pocatek][i]);
	}
	vypis2(zasobnikVrcholu);
	div.innerHTML += "<br>";

	var konec = true;
	var uloz = true;
	var uloz2 = true;
	// postupne projde vrcholy
	while (konec) {
		var docasnePole = [];
		for (var i = 0; i < zasobnikVrcholu.length; i++) {
			for (var j = 0; j < pole[zasobnikVrcholu[i]].length; j++) {
				for (var x = 0; x < prosleVrcholy.length; x++) {
					if (prosleVrcholy[x] == pole[zasobnikVrcholu[i]][j]) {
						uloz = false;
					}
				}
				if (uloz) {
					for (var y = 0; y < docasnePole.length; y++) {
						if (docasnePole[y] == pole[zasobnikVrcholu[i]][j]) {
							uloz2 = false;
						}
					}
					if (uloz2) {
						docasnePole.push(pole[zasobnikVrcholu[i]][j]);
					}
					uloz2 = true;
				}
				uloz = true;
			}
		}
		vypis2(zasobnikVrcholu);
		div.innerHTML += " &nbsp;=>&nbsp; ";
		vypis2(docasnePole);
		div.innerHTML += "<br>";
		zasobnikVrcholu = docasnePole;
		for (var i = 0; i < zasobnikVrcholu.length; i++) {
			prosleVrcholy.push(zasobnikVrcholu[i]);
			prosleVrcholyCelkem.push(zasobnikVrcholu[i]);
		}
		if (docasnePole.length < 1) {
			konec = false;
		}
	}
	vypis3(prosleVrcholy);
}

// vytvori pole ze zadanych hodnot
function vytvorGraf(vstup) {
	// rozdeleni vstupu na jednotlive dvojice
	var hrany = vstup.split(";");

	var vrchol; // aktualni vrchol
	var pridejHranu = true;
	var pridejVrcholX = true;
	var pridejVrcholY = true;

	xy = null; // pole obsahujici dve hodnoty oddelene

	// rozdeleni prvni dvojice a ulozeni do vysledneho pole
	xy = hrany[0].split(",");
	pole[xy[0]] = [];
	pole[xy[0]][0] = xy[1];
	pole[xy[1]] = [];
	pole[xy[1]][0] = xy[0];

	poleVrcholu.push(xy[0]);
	poleVrcholu.push(xy[1]);

	// zpracovani zbyvajicich hodnot ze vstupu
	for (var i = 0; i < hrany.length; i++) {
		pridejHranu = true;
		pridejVrcholX = true;
		pridejVrcholY = true;

		xy = hrany[i].split(",");

		for (vrchol in pole) {
			if (xy[0] == vrchol) {
				for (x = 0; x < pole[vrchol].length; x++) {
					if (pole[vrchol][x] == xy[1]) {
						pridejHranu = false;
					}
				}
				// pridani nove hrany k vrcholu
				if (pridejHranu) {
					pole[vrchol][pole[vrchol].length] = xy[1];
					pridejHranu = true;
				}
				pridejVrcholX = false;
			}
			if (xy[1] == vrchol) {
				for (x = 0; x < pole[vrchol].length; x++) {
					if (pole[vrchol][x] == xy[0]) {
						pridejHranu = false;
					}
				}
				// pridani nove hrany k vrcholu
				if (pridejHranu) {
					pole[vrchol][pole[vrchol].length] = xy[0];
					pridejHranu = true;
				}
				pridejVrcholY = false;
			}
		}
		// pridavani novych vrcholu
		if (pridejVrcholX) {
			pole[xy[0]] = [];
			pole[xy[0]][0] = xy[1];
			poleVrcholu.push(xy[0]);
		}
		if (pridejVrcholY) {
			pole[xy[1]] = [];
			pole[xy[1]][0] = xy[0];
			poleVrcholu.push(xy[1]);
		}
	}
}

// vypis vrcholu a cest do dalsich vrcholu v levym sloupci
function vypis(pole) {
	var tabulka = document.getElementById('graf');
	for (vrchol in pole) {
		var tr = document.createElement('tr');
		var td = document.createElement('td');
		td.setAttribute('class', "l");
		td.appendChild(document.createTextNode(vrchol));
		tr.appendChild(td);
		var td = document.createElement('td');
		for (var i = 0; i < pole[vrchol].length; i++) {
			td.setAttribute('class', "p");
			td.innerHTML += pole[vrchol][i] + ", ";
		}
		tr.appendChild(td);
		tabulka.appendChild(tr);
	}
}

// vypis cesty pro prochazeni grafu
function vypis2(pole) {
	for (var i = 0; i < pole.length; i++) {
		div.innerHTML += pole[i] + ", ";
	}
}

// vypis komponenty grafu
function vypis3(pole) {
	for (var i = 0; i < pole.length; i++) {
		document.getElementById('komponenty').innerHTML += pole[i] + ", ";
	}
	document.getElementById('komponenty').innerHTML += "<br><br>";
}

// resetovani hodnot
function reset() {
	vstup = "";
	pole = [];
	poleVrcholu = [];
	prosleVrcholyCelkem = [];
	vysledek = true;

	document.getElementById('vysledek').innerHTML = '';
	document.getElementById('hrany').value = '';
	document.getElementById('pruchod').innerHTML = '';
	document.getElementById('komponenty').innerHTML = '';
	document.getElementById('vykresli').removeAttribute('disabled');
	document.getElementById('graf').innerHTML = '<tr><td class="l"><strong>vrchol</strong></td><td class="p"><strong>má hranu do vrcholu</strong></td></tr>';
}
