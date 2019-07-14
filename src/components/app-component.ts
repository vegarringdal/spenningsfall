import {
    LitElement, html, customElement, property
} from 'lit-element';
import { select } from './helper-select';
import { textInput } from './helper-input';



@customElement('app-component')
export class AppComponent extends LitElement {

    @property() private cableTypeOptions = ['CU- (0.0225)', 'AL- (0.036)'];
    @property() private phaseOptions = [2, 3];
    @property() private cableSizeOptions = [1.5, 2.5, 4, 6, 10, 16];
    @property() private selectedLength = 20;
    @property() private selectedLoad = 16;
    @property() private selectedCosPhi = 1;
    @property() private selectedVoltage = 230;
    @property() private selectedCableType = this.cableTypeOptions[0];
    @property() private selectedPhases = this.phaseOptions[0];
    @property() private selectedCableSize = this.cableSizeOptions[0];
    @property() private voltTap = 0
    @property() private prosentTap = 0



    public firstUpdated() {
        this.updateme(); // so we get everything calculated
    }

    public createRenderRoot() {
        return this; // so we use light dom, else tailwind will stop working (dunno how to use this in shawdow)
    }


    private resultat() {
        const kabelTyper = this.selectedCableType === this.cableTypeOptions[0] ? 0.0225 : 0.036;
        const kabelFaser = this.selectedPhases === this.phaseOptions[0] ? 2 : Math.sqrt(3);
        const kabelTverrsnitt = this.selectedCableSize;
        const kabelLengde = this.selectedLength;
        const kursAmpere = this.selectedLoad;
        const kursSpenning = this.selectedVoltage;
        const cosPhi = this.selectedCosPhi;
        const volttap = (kabelTyper * kabelFaser * kabelLengde * kursAmpere * cosPhi) / kabelTverrsnitt;
        const prosent = (volttap * 100) / kursSpenning;
        return {
            volt: volttap.toFixed(2),
            prosent: prosent.toFixed(2)
        };

    }



    private updateme() {
        this.voltTap = (this.resultat().volt as any) * 1;
        this.prosentTap = (this.resultat().prosent as any) * 1;
        if (this.prosentTap > 100) {
            this.prosentTap = 100;
            this.voltTap = this.selectedVoltage;
        }
        if (isNaN(this.prosentTap)) {
            this.prosentTap = 0;
            this.voltTap = 0;
        }

        this.requestUpdate();
    }






    // tslint:disable-next-line:member-ordering
    public render() {

        return html`
                <div class="container mx-auto m-5 p-5">

                <h1 class="mr-2 w-full text-3xl text-center text-gray-600">Voltage drop Calculator</h1>

                ${textInput({
                    label: 'Circuit load (amps):',
                    type: 'number',
                    defaultvalue: this.selectedLoad,
                    placeholder: 'amps',
                    callback: (e: number) => {
                        this.selectedLoad = e;
                        this.updateme();
                    }
                })}

                ${textInput({
                    label: 'Circuit length (meter):',
                    type: 'number',
                    defaultvalue: this.selectedLength,
                    placeholder: 'meter',
                    callback: (e: number) => {
                        this.selectedLength = e;
                        this.updateme();
                    }
                })}

                ${textInput({
                    label: 'CosPhi (φ):',
                    type: 'number',
                    defaultvalue: this.selectedCosPhi,
                    placeholder: 'cosPhi',
                    callback: (e: number) => {
                        this.selectedCosPhi = e;
                        this.updateme();
                    }
                })}

                ${textInput({
                    label: 'Circuit voltage (V):',
                    type: 'number',
                    defaultvalue: this.selectedVoltage,
                    placeholder: 'voltage',
                    callback: (e: number) => {
                        this.selectedVoltage = e;
                        this.updateme();
                    }
                })}

                ${select({
                    label: 'Circuit phases:',
                    type: 'number',
                    defaultvalue: this.selectedPhases,
                    items: this.phaseOptions,
                    callback: (e: number) => {
                        this.selectedPhases = e;
                        this.updateme();
                    }
                })}

                ${select({
                    label: 'Cable Type:',
                    type: 'number',
                    defaultvalue: this.selectedCableType,
                    items: this.cableTypeOptions,
                    callback: (e: string) => {
                        this.selectedCableType = e;
                        this.updateme();
                    }
                })}

                ${select({
                    label: 'Cable size (mm2):',
                    type: 'number',
                    defaultvalue: this.selectedCableSize,
                    items: this.cableSizeOptions,
                    callback: (e: number) => {
                        this.selectedCableSize = e;
                        this.updateme();
                    }
                })}


                <div class="flex flex-col m-3 ">
                    <label class="mr-2 w-full text-center font-medium text-gray-600"><u>Voltage drop</u></label>
                    <p class="mr-2 w-full text-center font-small text-gray-600">${this.voltTap}v</p>
                    <p class="mr-2 w-full text-center font-small text-gray-600">${this.prosentTap} %</p>
                </div>

                </div>
        `;
    }
}

