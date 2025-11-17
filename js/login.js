// Simple front-end login demo
// Demo credentials (replace with server-side auth in production)
const DEMO_USER = {
  email: 'user@exemplo.com',
  password: 'senha123'
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const errorBox = document.getElementById('loginError');
  const toggle = document.querySelector('.toggle-pass');

  if (!form) return; // nothing to do on other pages

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.hidden = false;
    emailInput.setAttribute('aria-invalid', 'true');
    passwordInput.setAttribute('aria-invalid', 'true');
  }

  function clearError() {
    errorBox.textContent = '';
    errorBox.hidden = true;
    emailInput.removeAttribute('aria-invalid');
    passwordInput.removeAttribute('aria-invalid');
  }

  toggle?.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggle.setAttribute('aria-label', type === 'password' ? 'Mostrar senha' : 'Ocultar senha');
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    clearError();

    const email = (emailInput.value || '').trim();
    const password = (passwordInput.value || '').trim();

    if (!email || !password) {
      showError('Preencha e-mail e senha.');
      return;
    }

    // Basic validation: compare with demo credentials
    if (email.toLowerCase() !== DEMO_USER.email || password !== DEMO_USER.password) {
      showError('E-mail ou senha incorretos. Verifique e tente novamente.');
      return;
    }

    // Success: mark authenticated (demo) and redirect
    try {
      localStorage.setItem('tv_auth', JSON.stringify({ email }));
    } catch (e) {
      // ignore
    }

    // Redirect to index or to a dashboard page
    window.location.href = 'index.html';
  });

  // Clear error while typing
  emailInput.addEventListener('input', clearError);
  passwordInput.addEventListener('input', clearError);
});
