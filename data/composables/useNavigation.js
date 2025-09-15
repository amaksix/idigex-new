// composables/useNavigation.js
import { ref } from 'vue';

export const useNavigation = () => {
  const activePanel = ref(null); // "menu" | "privacy" | null

  const toggleMenu = () => {
    const hamenu = document.querySelector('.hamenu');
    const navDark = document.querySelector('.topnav');
    const menuIcon = document.querySelector('.topnav .menu-icon');

    if (activePanel.value === 'menu') {
      // Close menu
      hamenu?.classList.remove('open');
      hamenu && (hamenu.style.top = '-100%');
      menuIcon?.classList.remove('open');
      navDark?.classList.remove('navlit');
      activePanel.value = null;
    } else {
      // Open menu
      hamenu?.classList.add('open');
      hamenu && (hamenu.style.top = '0');
      menuIcon?.classList.add('open');
      navDark?.classList.add('navlit');
      activePanel.value = 'menu';
    }
  };

  const togglePrivacy = () => {
    const haprivacy = document.querySelector('.haprivacy');
    const navDark = document.querySelector('.topnav');
    const menuIcon = document.querySelector('.topnav .menu-icon');

    if (activePanel.value === '.haprivacy') {
      // Close privacy
      haprivacy?.classList.remove('open');
      haprivacy && (haprivacy.style.top = '-100%');
      menuIcon?.classList.remove('open');
      navDark?.classList.remove('navlit');
      activePanel.value = null;
    } else {
      // Open privacy
      haprivacy?.classList.add('open');
      haprivacy && (haprivacy.style.top = '0');
      menuIcon?.classList.add('open');
      navDark?.classList.add('navlit');
      activePanel.value = '.haprivacy';
    }
  };

  const closePanel = () => {
    if (activePanel.value === 'menu') toggleMenu();
    if (activePanel.value === '.haprivacy') togglePrivacy();
  };

  return { activePanel, toggleMenu, togglePrivacy, closePanel };
};
