document.addEventListener('DOMContentLoaded', () => {
    fetch('data/services.json')
        .then(response => response.json())
        .then(data => {
            displayGroceryStores(data.groceryStores);
            displayGadgets(data.electronicGadgets);
            displayBanks(data.banks);
            displayHospitals(data.hospitals);
            displaySchools(data.schools);
            displayRestaurants(data.restaurants);
            displayCabs(data.cabServices);
        });
});

function displayGroceryStores(stores) {
    const groceryList = document.getElementById('grocery-list');
    stores.forEach(store => {
        const storeDiv = document.createElement('div');
        storeDiv.innerHTML = `<strong>${store.name}</strong><br>Items: ${store.items.join(', ')}`;
        groceryList.appendChild(storeDiv);
    });
}

function displayGadgets(gadgets) {
    const gadgetList = document.getElementById('gadget-list');
    gadgets.forEach(gadget => {
        const gadgetDiv = document.createElement('div');
        gadgetDiv.innerHTML = `<strong>${gadget.name}</strong><br>Items: ${gadget.items.join(', ')}`;
        gadgetList.appendChild(gadgetDiv);
    });
}

function displayBanks(banks) {
    const bankList = document.getElementById('bank-list');
    banks.forEach(bank => {
        const bankDiv = document.createElement('div');
        bankDiv.innerHTML = `<strong>${bank.name}</strong><br>Branches: ${bank.branches.join(', ')}`;
        bankList.appendChild(bankDiv);
    });
}

function displayHospitals(hospitals) {
    const hospitalList = document.getElementById('hospital-list');
    hospitals.forEach(hospital => {
        const hospitalDiv = document.createElement('div');
        hospitalDiv.innerHTML = `<strong>${hospital.name}</strong><br>Doctors: ${hospital.doctors.join(', ')}`;
        hospitalList.appendChild(hospitalDiv);
    });
}

function displaySchools(schools) {
    const schoolList = document.getElementById('school-list');
    schools.forEach(school => {
        const schoolDiv = document.createElement('div');
        schoolDiv.innerHTML = `<strong>${school.name}</strong><br>Details: ${school.details}`;
        schoolList.appendChild(schoolDiv);
    });
}

function displayRestaurants(restaurants) {
    const restaurantList = document.getElementById('restaurant-list');
    restaurants.forEach(restaurant => {
        const restaurantDiv = document.createElement('div');
        restaurantDiv.innerHTML = `<strong>${restaurant.name}</strong><br>Menu: ${restaurant.menu.join(', ')}`;
        restaurantList.appendChild(restaurantDiv);
    });
}

function displayCabs(cabs) {
    const cabList = document.getElementById('cab-list');
    cabs.forEach(cab => {
        const cabDiv = document.createElement('div');
        cabDiv.innerHTML = `<strong>${cab.name}</strong><br>Contact: ${cab.contact}`;
        cabList.appendChild(cabDiv);
    });
}

const products = [
    { id: 1, name: 'Apple', quantity: '1kg', price: 150.00 },
    { id: 2, name: 'Banana', quantity: '1 dozen', price: 60.00 },
    { id: 3, name: 'Carrot', quantity: '1 kg',  price: 50.00 },
    { id: 4, name: 'Tomato', quantity: '1kg',  price: 30.00 },
    { id: 5, name: 'Potato', quantity:'1kg', price: 50.00 },
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById('productList');
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <h3>${product.name}</h3>
			<h3>${product.quantity}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    showBanner(`${product.name} has been added to your cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showBanner(`Item has been removed from your cart.`);
}

function showBanner(message) {
    const banner = document.getElementById('banner');
    banner.textContent = message;
    banner.style.display = 'block';

    // Hide the banner after 3 seconds
    setTimeout(() => {
        banner.style.display = 'none';
    }, 3000);
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price.toFixed(2)}`;
		
		// Add the Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = ' Remove';
        removeButton.onclick = () => removeFromCart(item.id);
        
        li.appendChild(removeButton);
        cartList.appendChild(li);
        total += item.price;
    });

    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

displayProducts();
