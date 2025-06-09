// Theme controller logic for DaisyUI theme switching.
// Syncs all theme-controller checkboxes and persists theme selection in localStorage.
(function setupThemeController() {
  document.addEventListener('DOMContentLoaded', function () {
    var controllers = document.querySelectorAll('.theme-controller');
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      controllers.forEach(function (cb) {
        cb.checked = cb.value === savedTheme;
      });
    }
    controllers.forEach(function (cb) {
      cb.addEventListener('change', function () {
        var newTheme = cb.checked ? cb.value : 'corporate';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        controllers.forEach(function (other) {
          other.checked = other.value === newTheme;
        });
      });
    });
  });
})();
