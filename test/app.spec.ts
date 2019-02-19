import { JSDOM } from 'jsdom';
const document = new JSDOM('').window.document;
(<any>global).NodeFilter = {
    SHOW_ALL: -1
};
(<any>global).document = document;


// todo
describe('App', () => {


    it('app to be good', () => {

        expect(0).toBe(0);
    });


});
