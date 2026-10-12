// Simple cart in localStorage, shared by the catalogue and the checkout page.
const CART_KEY = "goudenkorst-cart";
function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; }
}
function writeCart(cart) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  updateCount();
}
function updateCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = Object.values(readCart()).reduce((n, q) => n + q, 0);
}
document.addEventListener("click", (e) => {
  const slug = e.target.dataset && e.target.dataset.add;
  if (!slug) return;
  const cart = readCart();
  cart[slug] = (cart[slug] || 0) + 1;
  writeCart(cart);
  e.target.textContent = "Added ✓";
  setTimeout(() => (e.target.textContent = "Add to order"), 900);
});
updateCount();
