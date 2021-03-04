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

async function getsizeTables() {
    let data = await fetch('http://localhost:3000/admin/tablitas/todas');
    data = await data.json();
    return data;
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
