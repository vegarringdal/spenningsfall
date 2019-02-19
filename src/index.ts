import './index.css';
import { configure, MF } from 'mframejs';
import { App } from './app';


configure(App).then((mf: MF) => {
    // register our elements/attributes
    // mf.register(component, attribute);
    mf.start(document.body);
});




// service worker start
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('serviceWorker.js').then(function (registration) {
            console.log('ServiceWorker suc  cessful, scope: ', registration.scope);
        }, function (err) {
            console.log('ServiceWorker failed: ', err);
        });
    });
}

