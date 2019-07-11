import {
    LitElement, html, customElement, property
} from 'lit-element';



@customElement('app-component')
export class AppComponent extends LitElement {

    public x = 0;

    @property() title = 'Spenningsfall';
    @property() kabelTyper = ['CU- (0.0225)', 'AL- (0.036)'];
    @property() kabelFaser = ['2', '3'];
    @property() kabelTverrsnitt = ['1,5', '2,5', '4', '6', '10', '16'];
    @property() kabelLengde = 20;
    @property() kursAmpere = 16;
    @property() cosPhi = 1;
    @property() kursSpenning = 230;
    @property() valgtType = this.kabelTyper[0];
    @property() valgtFase = this.kabelFaser[0];
    @property() valgtTverrsnitt = this.kabelTverrsnitt[0];
    @property() voltTap = 0
    @property() prosentTap = 0

    firstUpdated() {
        this.updateme();

    }

    resultat() {
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

    updateme(){
        this.voltTap = (this.resultat().volt as any) * 1;
        this.prosentTap = (this.resultat().prosent as any) * 1;
        if(this.prosentTap > 100){
            this.prosentTap  = 100;
            this.voltTap = this.kursSpenning;
        }
        if(isNaN(this.prosentTap)){
            this.prosentTap  = 0;
            this.voltTap = 0;
        }

        this.requestUpdate();
    }


    createRenderRoot() {
        return this;
      }

      attributeChangedCallback (){
          console.log(arguments)
      }

       updated(){
         // debugger;
         //  this.render();
      } 

    render() {

        return html`
        <section>
            <form style="max-width:650px; margin:30px auto">
                <legend style="text-align: center;">${this.title}</legend>
                <div class="form-group  row">
                    <label for="Ampere" class="col-sm-2 col-5 col-form-label">Ampere</label>
                    <div class="col-sm-10 col-7">
                        <input @input= ${(event: { target: { value: number; }; })=>{
                            this.kursAmpere = event.target.value;
                            this.updateme()
                        }} id="Ampere" class="form-control" type="number" .value=${this.kursAmpere} placeholder="Ampere">
                    </div>
                </div>
                <div class="form-group  row">
                    <label for="Lengde" class="col-sm-2 col-5 col-form-label">Lengde</label>
                    <div class="col-sm-10 col-7">
                    <input @input=
                        ${(event: { target: { value: number; }; })=>{
                            this.kabelLengde = event.target.value;
                            this.updateme()
                        }}id="Lengde" class="form-control" type="number" .value=${this.kabelLengde} placeholder="Lengde">
                    </div>
                </div>
        
                <div class="form-group  row">
                    <label for="cosPhi" class="col-sm-2 col-5 col-form-label">CosPhi</label>
                    <div class="col-sm-10 col-7">
                    <input @input=
                        ${(event: { target: { value: number; }; })=>{
                            this.cosPhi = event.target.value;
                            this.updateme()
                        }} id="cosPhi" class="form-control" type="number" .value=${this.cosPhi} placeholder="cosPhi">
                    </div>
                </div>
        
                <div class="form-group  row">
                    <label for="Spenning" class="col-sm-2 col-5 col-form-label">Spenning</label>
                    <div class="col-sm-10 col-7">
                    <input @input=
                        ${(event: { target: { value: number; }; })=>{
                            this.kursSpenning = event.target.value;
                            this.updateme()
                        }} id="Spenning" type="number" class="form-control" .value=${this.kursSpenning} placeholder="Spenning">
                    </div>
                </div>

                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 col-5 pt-0">Faser</legend>
                        <div class="col-sm-10 col-7">
                            ${this.kabelFaser.map((product) => {
                                return html`
                                <div class="form-check">
                                    <input 
                                        @change=${()=>{
                                            this.valgtFase = product;
                                            this.updateme()
                                        }}
                                        type="radio"
                                            name="groupRadio1"
                                            .checked=${this.valgtFase === product}>
                                    <label class="form-check-label"
                                            for="groupRadio1">${product}<label>
                                </div>`
                            })}
                        </div>
                    </div>
                </fieldset>


                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 col-5 pt-0">Kabel typer</legend>
                        <div class="col-sm-10 col-7">
                            ${this.kabelTyper.map((product) => {
                                return html`
                                <div class="form-check">
                                    <input 
                                    @change=${()=>{
                                            debugger;
                                            this.valgtType = product;
                                            this.updateme()
                                        }}
                                    
                                    type="radio"
                                            name="groupRadio2"
                                            .checked=${this.valgtType === product}>
                                    <label class="form-check-label"
                                            for="groupRadio2">${product}<label>
                                </div>`
                            })}
                        </div>
                    </div>
                </fieldset>

                <fieldset class="form-group">
                    <div class="row">
                        <legend class="col-form-label col-sm-2 col-5 pt-0">Tverrsnitt</legend>
                        <div class="col-sm-10 col-7">
                            ${this.kabelTverrsnitt.map((product) => {
                                return html`
                                <div class="form-check">
                                    <input 
                                    @change=${()=>{
                                            debugger;
                                            this.valgtTverrsnitt = product;
                                            this.updateme()
                                        }}
                                    type="radio"
                                            name="groupRadio3"
                                            .checked=${this.valgtTverrsnitt === product}>
                                    <label class="form-check-label"
                                            for="groupRadio3">${product}<label>
                                </div>`
                            })}
                        </div>
                    </div>
                </fieldset>

                <div style="text-align: center;"
                    class="alert alert-primary"
                    role="alert">
                    <u>Spenning fall:</u>
                    <br>
                    <b>${this.voltTap}</b> V
                    <br>
                    <b>${this.prosentTap}</b> %
                </div>

            </form>
        </section>`;
    }
}
