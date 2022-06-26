document.body.append(povuciDiv);
var povuciDivPozicija;

//glavna funkcija
povuciDiv.onmousedown = function (e) {

    //dodaj event listener za div koji se povlači
    document.addEventListener('mousemove', pomicanjeMisa);
    povuciDiv.onmouseup = function () {
        document.removeEventListener('mousemove', pomicanjeMisa);
        povuciDiv.onmouseup = null;
    };


    // postavi u x koordinatu po x osi iz metode getBoundingClientRect() za div koji se povlači 
    let x = e.clientX - povuciDiv.getBoundingClientRect().left;
    // postavi u y koordinatu po y osi iz metode getBoundingClientRect() za div koji se povlači 
    let y = e.clientY - povuciDiv.getBoundingClientRect().top;


    //funkcija koja obrađuje pozicije diva koji se povlači
    function pomicanjeMisa(e) {
        pomakniNa(e.pageX, e.pageY);

        povuciDiv.hidden = true;
        let ubaciDivPozicija = document.elementFromPoint(e.clientX, e.clientY);
        povuciDiv.hidden = false;


        //sa .closest metodom i ifalicom usporedi pozicije divova
        let pogodakPozicija = ubaciDivPozicija.closest('.ubaciDiv');


        if (povuciDivPozicija != ubaciDivPozicija) {
            if (povuciDivPozicija) { // trebalo bi biti false
                zadrziPoziciju(povuciDivPozicija);
            }
            povuciDivPozicija = pogodakPozicija;
            if (povuciDivPozicija) { // true ako je iznad pozicije za pogodak
                obradiPogodak(povuciDivPozicija);
            }
        }
    }

    //pomiče div po koordinatnim osima
    function pomakniNa(xOs, yOs) {
        povuciDiv.style.left = xOs - x + 'px';
        povuciDiv.style.top = yOs - y + 'px';
    }

    //samo zadrži trenutnu poziciju na koju si stavljen
    function zadrziPoziciju(div) {
        div.style.background = "";
    }

    //daj neku akciju ako si unutar diva koji je koš
    function obradiPogodak(div) {
        div.style.background = 'green';
    }

    //spriječi bugovito pnašanje sa dreganjem diva ovako
    povuciDiv.ondragstart = function () {
        return false;
    };
};