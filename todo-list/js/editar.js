window.onload = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const data = urlParams.get('data');
    const posicio = urlParams.get('posicio');

    var tasques = JSON.parse(localStorage.getItem(data));

    var correuHora = tasques[posicio].correuHora;
    var correuMitja = tasques[posicio].correuMitja;

    document.getElementById('dataDiaModificar').value = data.substring(0, data.indexOf('/'));
    document.getElementById('minModificar').value = tasques[posicio].hora.substring(tasques[posicio].hora.indexOf(':') + 1);
    document.getElementById('horaModificar').value = tasques[posicio].hora.substring(0, tasques[posicio].hora.indexOf(':'));
    document.getElementById('titolModificar').value = tasques[posicio].titol;
    document.getElementById('descripcioModificar').value = tasques[posicio].descripcio;

    if (tasques[posicio].estatTasca == 'acabada') {
        document.getElementById('tascaAcabada').checked = true;
    } else {
        document.getElementById('tascaNoAcabada').checked = true;
    }

    // document.getElementById("modificarTasca").onclick = function () {
    //     let data2 = "" + document.getElementById("dataDiaModificar").value + "/" + document.getElementById("dataMesModificar").value + "/" + document.getElementById("dataAnyModificar").value;
    //     let titol = document.getElementById("titolModificar").value;
    //     let hora = "" + document.getElementById("horaModificar").value + ":" + document.getElementById("minModificar").value + "";
    //     let descripcio = document.getElementById("descripcioModificar").value;
    //     let estatTasca = document.getElementById('estatTascaModificar').value;
    //     tasques.splice(posicio, 1);
    //     localStorage.removeItem(data);
    //     tasques.push({ titol: titol, hora: hora, descripcio: descripcio, estatTasca: estatTasca, correuHora: correuHora, correuMitja: correuMitja });
    //     console.log(tasques);
    //     localStorage.setItem(data2, JSON.stringify(tasques));
    //     location.replace('index.html');
    // }

    // document.getElementById("esborrarTasca").onclick = function () {
    //     tasques.splice(posicio, 1);
    //     localStorage.removeItem(data);
    //     localStorage.setItem(data, JSON.stringify(tasques));
    //     location.replace('index.html');
    // }

    window.addEventListener("keydown", function (inEvent) {
        if (window.event) {
            keycode = inEvent.keyCode;
        }
        if (keycode == 27 || keycode == 403) {
            tasques.splice(posicio, 1);
            localStorage.removeItem(data);
            localStorage.setItem(data, JSON.stringify(tasques));
            location.replace('index.html');
        }
        else if (keycode == 13 || keycode == 404) {
            let data2 = "" + document.getElementById("dataDiaModificar").value + "/" + document.getElementById("dataMesModificar").value + "/" + document.getElementById("dataAnyModificar").value;
            let titol = document.getElementById("titolModificar").value;
            let hora = "" + document.getElementById("horaModificar").value + ":" + document.getElementById("minModificar").value + "";
            let descripcio = document.getElementById("descripcioModificar").value;
            let estatTasca = document.querySelector('input[name="estatTascaModificar"]:checked').value;
            tasques.splice(posicio, 1);
            localStorage.removeItem(data);
            tasques.push({ titol: titol, hora: hora, descripcio: descripcio, estatTasca: estatTasca, correuHora: correuHora, correuMitja: correuMitja });
            console.log(tasques);
            localStorage.setItem(data2, JSON.stringify(tasques));
            location.replace('index.html');
        }
    });

}