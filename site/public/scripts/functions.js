function esMobile() {
    return window.matchMedia('(max-width: 720px)').matches;
}
function esTablet() {
    return window.matchMedia('(min-width: 721px) and (max-width: 999px)').matches;
}
function esDesktop() {
    return window.matchMedia('(min-width: 1000px)').matches;
}

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

function handleRemoveErrors(el) {
    const errorsContainer = el.parentNode.remove();
}

function changeTab(currentObj, target) {
    let formTab, formTabBtn;

    // Oculto todos los tabs
    formTab = document.querySelectorAll('.form_tab');
    formTab.forEach((tab) => tab.classList.add('dnone'));

    // Remuevo active class en todos los btns
    formTabBtn = document.querySelectorAll('.form_tab_btn');
    formTabBtn.forEach((btn) => btn.classList.remove('active'));

    // Muestro el tab actual y agrego active class al btn
    document.querySelector(`#${target}`).classList.remove('dnone');
    currentObj.classList.add('active');
}

function showHidePw(el) {
    let pwInput = el.parentNode.querySelector('input');
    let getTypeAttr = pwInput.getAttribute('type');

    if (getTypeAttr === 'password') {
        pwInput.setAttribute('type', 'text');
    } else {
        pwInput.setAttribute('type', 'password');
    }

    el.classList.toggle('ocultar');
}

// Fetch data
async function fetchData(_method = '', url = '', data = {}) {
    const res = await fetch(url, {
        method: _method,
        body: data,
    });

    //

    return res.json();
}

function deleteData(el, redirectPath) {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let path = el.getAttribute('href');

        fetchData('POST', path).then((res) => {
            if (res.status === 200) {
                location.href = redirectPath;
            }
        });
    });
}

function updateData(form, type, redirectPath) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let pid;
        let FD = new FormData(form);

        for (let [k, v] of FD) {
            if (k == 'id') {
                pid = v;
            }
        }

        fetchData('POST', `/admin/c/${type}/${pid}/update?_method=PUT`, FD).then((res) => {
            if (res.status === 200) {
                location.href = redirectPath;
            }
        });
    });
}

// Home
function switchSliderImageOnMobile(obj) {
    let imageSrc = obj.getAttribute('src');
    let imageSrcMobile = imageSrc.replace('--desktop', '--mobile');

    obj.setAttribute('src', imageSrcMobile);
}

// Admin
function handleSkuVisible(currEl, targetElement) {
    let target = document.querySelector(`#${targetElement}`);
    let arrTargetVal = target.value.split('-');

    // El sku visible se compone por marca - color - nombre
    let [marca, color, nombre] = ['marca', 'color', 'nombre'];

    if (target.value) {
        marca = arrTargetVal[0];
        color = arrTargetVal[1];
        nombre = arrTargetVal[2];
    }

    switch (currEl.getAttribute('name')) {
        case 'brandId':
            marca = formatString(currEl.value);
            break;

        case 'colorId':
            color = currEl.selectedIndex;
            break;

        case 'productName':
            nombre = formatString(currEl.value);
            break;

        default:
            break;
    }

    // Devuelvo el sku visible
    target.value = `${marca}-${color}-${nombre}`;
}

function tablita(currEl, table, target, stock) {
    let sinTablaSeleccionada = document.querySelector('.sinTablaSeleccionada');
    sinTablaSeleccionada.classList.add('dnone');

    let isTableContainer = document.querySelector('.tablita');
    if (isTableContainer) isTableContainer.remove();

    const selectedTableIndex = currEl.selectedIndex - 1;
    const selectedTable = table[selectedTableIndex];

    let stockArr = [];
    if (stock !== undefined) {
        stockArr = stock.split(',');
    }

    if (selectedTableIndex == -1) {
        sinTablaSeleccionada.classList.remove('dnone');
        return;
    }

    // Formateo el string a un array de numeros
    selectedTable.sizes = selectedTable.sizes
        .split(',')
        .map((item) => (isNaN(item) ? item : Number(item)));

    // Creo el div
    let tableContainer = document.createElement('div');
    tableContainer.classList.add('tablita');
    tableContainer.setAttribute('data_table', formatString(selectedTable.name));

    // Creo titulo
    let title = document.createElement('h4');
    title.innerText = selectedTable.name;
    tableContainer.appendChild(title);

    // Creo tabla principal
    let htmlTable = document.createElement('table');
    htmlTable.setAttribute('width', '100%');
    htmlTable.setAttribute('cellspacing', 0);
    htmlTable.setAttribute('cellpadding', 0);

    // Creo tr head
    let htmlTrHead = document.createElement('tr');
    selectedTable.sizes.forEach((size) => {
        let htmlTh = document.createElement('th');
        htmlTh.innerText = size;

        htmlTrHead.appendChild(htmlTh);
    });
    htmlTable.appendChild(htmlTrHead);

    // Creo tr content
    let htmlTrContent = document.createElement('tr');
    selectedTable.sizes.forEach((size, i) => {
        let htmlTd = document.createElement('td');
        let htmlInput = document.createElement('input');
        htmlInput.type = 'number';
        htmlInput.name = 'stock';
        htmlInput.id = 'stock';
        htmlInput.placeholder = '0';
        htmlInput.value = stock !== undefined ? stockArr[i] : '0';

        htmlTd.appendChild(htmlInput);
        htmlTrContent.appendChild(htmlTd);
    });
    htmlTable.appendChild(htmlTrContent);

    tableContainer.appendChild(htmlTable);

    // appendeo todo al target
    let _target = document.getElementById(target);
    _target.appendChild(tableContainer);
}
/* 
function ejemploLean(e, str) {
    console.log('e', e);
    console.log(str);
}
 */
function handleImagesUploaded(filesInput, outputEl) {
    let filesArray = [];
    // Valido la api de file
    if (window.File && window.FileList && window.FileReader) {
        filesInput.addEventListener('change', (e) => {
            let files, output;

            /* console.log('fi', filesInput);
            console.log('e', e); */

            files = e.target.files; // el FileList
            output = document.querySelector(outputEl);

            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                let fr = new FileReader();

                fr.addEventListener('load', function (e) {
                    let image = e.target;

                    let templateCard = `
                        <div id="${file.name}" class="form_images_card">
                            <img src="${image.result}" alt="${file.name}" class="form_images_card_image">
                            <span class="form_images_card_name">${file.name}</span>
                            <button class="form_images_card_delete button_main_action" onclick="removeCurrentFile('${file.name}')">Borrar</button>
                        </div>
                    `;

                    output.innerHTML += templateCard;
                    filesArray.push(file);
                });

                fr.readAsDataURL(file);
            }
        });
        return filesArray;
    } else {
        alert('El navegador no soporta la API FILE');
        return filesArray;
    }
}

function formatString(str) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replaceAll(' ', '_');
}

function handleFormRowError(formRow, errMsg = '', showHide) {
    let input = formRow.querySelector('input');
    let errContainer = formRow.querySelector('.errors_container');

    if (showHide) {
        errContainer.classList.remove('dnone');
        errContainer.querySelector('li').innerText = errMsg;
        input.style.border = '1px solid #e74c3c';
    } else {
        errContainer.classList.add('dnone');
        errContainer.querySelector('li').innerText = '';
        input.style.border = '1px solid #2ecc71';
    }
}
