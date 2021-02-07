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

    if(getTypeAttr === 'password') {
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

    return res.json();
}

function deleteData(el, redirectPath) {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        let path = el.getAttribute('href');
        console.log('desde fn');

        fetchData('POST', path).then((res) => {
            if (res.status === 200) {
                location.href = redirectPath;
            }
        });
    });
}

function updateData(form, type, redirectPath ) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let pid;
        let FD = new FormData(form);

        for (let [k, v] of FD) {
            if (k == 'id') {
                pid = v;
            }
        }

        fetchData('POST', `/admin/c/${type}/${pid}/update?_method=PUT`, FD).then(
            (res) => {
                if (res.status === 200) {
                    location.href = redirectPath;
                }
            }
        );
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

    // El sku visible se compone por marca - tipo prod - nombre
    let [marca, tipoProducto, nombre] = ['marca', 'tipo_de_producto', 'nombre'];

    if (target.value) {
        marca = arrTargetVal[0];
        tipoProducto = arrTargetVal[1];
        nombre = arrTargetVal[2];
    }

    switch (currEl.getAttribute('name')) {
        case 'marca':
            marca = formatString(currEl.value);
            break;

        case 'tipo_de_producto':
            tipoProducto = formatString(currEl.value);
            break;

        case 'product_name':
            nombre = formatString(currEl.value);
            break;

        default:
            break;
    }

    function formatString(str) {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replaceAll(' ', '_');
    }

    // Devuelvo el sku visible
    target.value = `${marca}-${tipoProducto}-${nombre}`;
}

function handleTablaTalles(currEl, targetElement, ...stock_talles) {
    // Templates tabla talles
    // Perdon! esta horrible esto
    const tabla_talles_calzado_35_al_45 = `
        <div class="tablita talles_calzado" data_table="tabla_talles_calzado_35_al_45">
            <h4>Calzado</h4>
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <th>
                    Talles 
                    </th>
                    <th>
                        35
                    </th>
                    <th>
                        35.5
                    </th>
                    <th>
                        36
                    </th>
                    <th>
                        36.5
                    </th>
                    <th>
                        37
                    </th>
                    <th>
                        37.5
                    </th>
                    <th>
                        38
                    </th>
                    <th>
                        38.5
                    </th>
                    <th>
                        39
                    </th>
                    <th>
                        39.5
                    </th>
                    <th>
                        40
                    </th>
                    <th>
                        40.5
                    </th>
                    <th>
                        41
                    </th>
                    <th>
                        41.5
                    </th>
                    <th>
                        42
                    </th>
                    <th>
                        42.5
                    </th>
                    <th>
                        43
                    </th>
                    <th>
                        43.5
                    </th>
                    <th>
                        44
                    </th>
                    <th>
                        44.5
                    </th>
                    <th>
                        45
                    </th>
                    <th>
                        45.5
                    </th>
                </tr>
                <tr>
                    <td>
                        Color stock
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number"  name="stock_talles"  id="stock_talles"  placeholder="0" value="0">
                    </td>
                </tr>
            </table>
        
        </div>
    `;
    const tabla_talles_36_al_48 = `
        <div class="tablita talles_prendas_inf" data_table="tabla_talles_36_al_48">
            <h4>Prendas inferiores</h4>
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <th>
                    Talles 
                    </th>
                    <th>
                        36
                    </th>
                    <th>
                        38
                    </th>
                    <th>
                        40
                    </th>
                    <th>
                        42
                    </th>
                    <th>
                        44
                    </th>
                    <th>
                        46
                    </th>
                    <th>
                        48
                    </th>
                </tr>
                <tr>
                    <td>
                        Color stock
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                </tr>
            </table>
        
        </div>
    `;
    const tabla_talles_xxs_al_xxl = `
        <div class="tablita talles_prendas_sup" data_table="tabla_talles_xxs_al_xxl">
            <h4>Prendas superiores</h4>
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <th>
                    Talles 
                    </th>
                    <th>
                        xxs
                    </th>
                    <th>
                        xs
                    </th>
                    <th>
                        s
                    </th>
                    <th>
                        m
                    </th>
                    <th>
                        l
                    </th>
                    <th>
                        xl
                    </th>
                    <th>
                        xxl
                    </th>
                </tr>
                <tr>
                    <td>
                        Color stock
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                    <td>
                        <input type="number" name="stock_talles" id="stock_talles" placeholder="0" value="0">
                    </td>
                </tr>
            </table>
        
        </div>
    `;

    let selectedTabla, target, targetMsg;

    target = document.querySelector(`#${targetElement} .form_data`);
    targetMsg = target.children[1];

    // Oculto el mensaje
    targetMsg.style.display = 'none';

    selectedTabla = currEl.options[currEl.selectedIndex].value;
    switch (selectedTabla) {
        case 'tabla_talles_calzado_35_al_45':
            removerTablas();
            target.innerHTML += tabla_talles_calzado_35_al_45;
            break;

        case 'tabla_talles_36_al_48':
            removerTablas();
            target.innerHTML += tabla_talles_36_al_48;
            break;

        case 'tabla_talles_xxs_al_xxl':
            removerTablas();
            target.innerHTML += tabla_talles_xxs_al_xxl;
            break;

        default:
            removerTablas();
            // Muestro el mensaje
            targetMsg.style.display = 'block';
            break;
    }

    if (stock_talles.length > 0) {
        let currTable = document.querySelector(`[data_table="${selectedTabla}"]`);
        let _inputs = currTable.querySelectorAll('input');
        _inputs.forEach((input, i) => {
            input.value = stock_talles[i];
        });
    }

    function removerTablas() {
        let tablas = document.querySelectorAll('.tablita');
        if (tablas.length > 0) {
            tablas.forEach((tabla) => tabla.remove());
        }
    }
}

function handleImagesUploaded(filesInput, outputEl) {
    let filesArray = [];
    // Valido la api de file
    if (window.File && window.FileList && window.FileReader) {
        filesInput.addEventListener('change', (e) => {
            let files, output;

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