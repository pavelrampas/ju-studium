var pocet = 0; // pocet stupnu
var div; // div do ktereho se vkladaji data

document.getElementById('vykresli').addEventListener('click', vykresli);
document.getElementById('reset').addEventListener('click', reset);

function reset(){
	div.innerHTML = '';
	document.getElementById('pocet').value = '';
}

// vypocitava jednotlive stupne
function vykresli() {
	// nacteni hodnot
	pocet = parseInt(document.getElementById('pocet').value);
	div = document.getElementById('t');

	// vymazani obsahu a nastaveni sirky
	div.innerHTML = "";
	div.style.width = pocet * 6 + "px";

	// vypis prvnich dvou stupnu
	vypis(true, true);
	vypis(true, false);
	vypis(true, true);

	// vypis zbylych stupnu
	var pole = [true, true];
	for (var i = 0; i <= pocet - 3; i++) {
		var nove_pole = [];
		nove_pole.push(true);
		vypis(true, false);

		for (var j = 0; j <= pole.length - 2; j++) {
			if ((pole[j] && pole[j + 1]) || (!pole[j] && !pole[j + 1])) {
				vypis(false, false);
				nove_pole.push(false);
			} else {
				vypis(true, false);
				nove_pole.push(true);
			}
		}

		vypis(true, true);
		nove_pole.push(true);
		pole = nove_pole;
	}

	// posunuti na stred stranky
	window.scrollTo(((pocet * 6) / 2) - 600, 0);
}

// graficky vystup
function vypis(co, konec) {
	var span = document.createElement("span");
	span.appendChild(document.createTextNode("."));
	if (co) {
		span.setAttribute("class", "t");
	} else {
		span.setAttribute("class", "f");
	}
	div.appendChild(span);
	if (konec) {
		div.appendChild(document.createElement("br"));
	}
}