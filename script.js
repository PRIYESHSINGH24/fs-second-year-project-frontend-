const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const openMenu = document.querySelector('.menu-call');
const login = document.querySelector('.login');
const onlineOrder = document.querySelector('.order-online');
const findTableBtn = document.getElementById('find-table-btn');
const closePopupBtn = document.getElementById('close-popup-btn');
const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const restaurantPage = document.getElementById('restaurant-page');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Navigate to the menu page
openMenu.addEventListener('click', () => {
  window.location.href = 'menu.html';
});

// Navigate to the login page
login.addEventListener('click', () => {
  window.location.href = 'login.html';
});

// Navigate to the order page
onlineOrder.addEventListener('click', () => {
  window.location.href = 'order.html';
});

// Handle table reservation and show the popup
findTableBtn.addEventListener('click', () => {
  const partySize = document.getElementById('party-size').value || '1'; // Default to 1 if not provided
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if (!date || !time) {
    alert('Please select a date and time for your reservation.');
    return;
  }

  const popupMessage = `Your table for ${partySize} guest(s) has been booked on ${date} at ${time}.`;
  const popupContent = popup.querySelector('p'); // Simplified selection
  popupContent.textContent = popupMessage;

  overlay.classList.remove('hidden');
  popup.classList.remove('hidden');
  restaurantPage.style.opacity = '0.5'; // Dim the background
});

// Close the popup
closePopupBtn.addEventListener('click', () => {
  overlay.classList.add('hidden');
  popup.classList.add('hidden');
  restaurantPage.style.opacity = '1'; // Restore background opacity
});
