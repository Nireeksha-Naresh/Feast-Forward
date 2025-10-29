
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    localStorage.setItem('user', JSON.stringify({ email, password, role }));
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid credentials');
    }
});

if (window.location.pathname.includes('dashboard.html')) {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('userEmail').textContent = user.email;

    document.getElementById('foodForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const foodType = document.getElementById('foodType').value;
        const quantity = document.getElementById('quantity').value;
        const location = document.getElementById('location').value;
        const description = document.getElementById('description').value;

        const foodItem = {
            foodType, quantity, location, description, email: user.email
        };

        let sharedFoods = JSON.parse(localStorage.getItem('sharedFoods') || "[]");
        sharedFoods.push(foodItem);
        localStorage.setItem('sharedFoods', JSON.stringify(sharedFoods));
        renderSharedFoods();
    });

    function renderSharedFoods() {
        const sharedFoods = JSON.parse(localStorage.getItem('sharedFoods') || "[]");
        const container = document.getElementById('sharedList');
        container.innerHTML = "";
        sharedFoods.forEach(food => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${food.foodType}</strong> (${food.quantity})<br>
            Location: <a href="https://www.google.com/maps/search/${encodeURIComponent(food.location)}" target="_blank">${food.location}</a><br>
            Donated by: ${food.email}<br>
            <em>${food.description}</em><br>`;
            container.appendChild(div);
        });
    }

    renderSharedFoods();
}

function logout() {
    window.location.href = 'login.html';
}
