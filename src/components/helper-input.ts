import { html } from 'lit-element';

export const textInput = (s: {
    label: string;
    type: 'number' | 'text';
    defaultvalue: string | number | Date;
    placeholder: string;
    callback: Function;
}) => {
return html`
<div class="flex flex-col m-3 ">
    <label class="mr-2 w-full text-xs font-medium text-gray-600"><u>${s.label}</u></label>
    <input class="w-full border border-gray-100" .value=${<string>s.defaultvalue} type=${s.type} placeholder=${s.placeholder}
        @input=${(e: {target: HTMLInputElement}) => s.callback(s.type === 'number' ? e.target.valueAsNumber : e.target.value)}>
</div>`;
};
