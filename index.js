const load = async (input_text) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${input_text}`);
    const data = await res.json();
    display(data.data);
}
const display = phones => {
    const div_container = document.getElementById('phone_container');
    // clear container before adding new things;
    div_container.textContent = '';
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList = `card w-96 bg-white shadow-xl`;
        div.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div > `;
        div_container.appendChild(div)
    })
}
const clicked = () => {
    const input_text = document.getElementById('search').value;
    load(input_text);
}

