import { IElement, computedFrom } from 'mframejs';

export class App implements IElement {
    public title = 'Spenningsfall';
    public kabelTyper = ['CU- (0.0225)', 'AL- (0.036)'];
    public kabelFaser = ['2', '3'];
    public kabelTverrsnitt = ['1,5', '2,5', '4', '6', '10', '16'];
    public kabelLengde = 20;
    public kursAmpere = 16;
    public cosPhi = 1;
    public kursSpenning = 230;
    public valgtType = this.kabelTyper[0];
    public valgtFase = this.kabelFaser[0];
    public valgtTverrsnitt = this.kabelTverrsnitt[0];


    public loadTemplate() {
        return require('./app.html');
    }


    @computedFrom(
        'kabelLengde',
        'kursAmpere',
        'cosPhi',
        'kursSpenning',
        'valgtType',
        'valgtFase',
        'valgtTverrsnitt')
    get prosentTap() {
        return this.resultat.prosent;
    }

    @computedFrom(
        'kabelLengde',
        'kursAmpere',
        'cosPhi',
        'kursSpenning',
        'valgtType',
        'valgtFase',
        'valgtTverrsnitt')
    get voltTap() {
        return this.resultat.volt;
    }



    get resultat() {
        const kabelTyper = this.valgtType === this.kabelTyper[0] ? 0.0225 : 0.036;
        const kabelFaser = this.valgtFase === this.kabelFaser[0] ? 2 : Math.sqrt(3);
        const kabelTverrsnitt = parseFloat(this.valgtTverrsnitt.replace(',', '.'));
        const kabelLengde = parseInt(this.kabelLengde + '', 10);
        const kursAmpere = parseInt(this.kursAmpere + '', 10);
        const kursSpenning = parseInt(this.kursSpenning + '', 10);
        const cosPhi = parseFloat(this.cosPhi + '');
        const volttap = (kabelTyper * kabelFaser * kabelLengde * kursAmpere * cosPhi) / kabelTverrsnitt;
        const prosent = (volttap * 100) / kursSpenning;
        return {
            volt: volttap.toFixed(2),
            prosent: prosent.toFixed(2)
        };

    }

}
