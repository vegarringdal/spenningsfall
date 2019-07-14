import { html } from 'lit-html';


export const select = (s: {
    label: string;
    type: 'number' | 'text';
    defaultvalue: string | number | Date;
    items: any[];
    callback: Function;
}) => {
    return html`
<div class="flex flex-col m-3 ">
    <label class="mr-2 w-full text-xs font-medium text-gray-600"><u>${s.label}</u></label>
    <select class="w-full border border-gray-100 bg-white" .value=${<string>s.defaultvalue} @change=${(e:
        { target: HTMLSelectElement }) => {
            if (s.type === 'number') {
                s.callback(e.target.options[e.target.options.selectedIndex].value);
            } else {
                s.callback(e.target.options[e.target.options.selectedIndex].value);
            }

        }}>
        ${s.items.map((item) => {
        return html`<option .value=${item}>
            ${item}
        </option>`;
    })};
    </select>
</div>`;
};
