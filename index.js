const load = async (input_text, showall) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${input_text}`);
    const data = await res.json();
    display(data.data, showall);
}
const show = () => {
    clicked(true);
}
const display = (phones, showall) => {
    const div_container = document.getElementById('phone_container');
    // clear container before adding new things;
    div_container.textContent = '';
    // if i want to see 5 phones among 15 or more phone 
    const show_button = document.getElementById('show_button');

    if (phones.length > 12 && !showall) {
        show_button.classList.remove('hidden');
    }

    else {
        show_button.classList.add("hidden");
    }
    if (!showall) {
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList = `card w-96 bg-white shadow-xl`;
        div.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                <button class="btn btn-primary" onclick = showdetails('${phone.slug}')>Show details</button>
                </div>
            </div > `;
        div_container.appendChild(div)
    })
    load_spinner(false);
}
const showdetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data.data, id);
    showalldetails(data)
}
const showalldetails = (data) => {
    const div_container = document.getElementById('show_container');
    // console.log();
    // div_container.innerHTML = ``;
    document.getElementById('detail_name').innerText = `${data.data.name}`;
    // const div_container = document.getElementById('show_container');
    div_container.innerHTML = `
    <img src='${data.data.image}' alt=''>
    <p>Storage: ${data.data.mainFeatures.storage}</p>
    <p>Display Size: ${data.data.mainFeatures.displaySize}</p>
    <p>chipset: ${data.data.mainFeatures.chipSet}</p>
    <p>Memory: ${data.data.mainFeatures.memory}</p>
    <p>Secsors: ${data.data.mainFeatures.sensors}</p>`

    my_modal_2.showModal();

}
const clicked = (showall) => {
    load_spinner(true);
    const input_text = document.getElementById('search').value;
    load(input_text, showall);
}
const load_spinner = (isloading) => {
    const spin = document.getElementById('spinners');
    if (isloading) {
        spin.classList.remove('hidden');
    }
    else {
        spin.classList.add('hidden');
    }
}

