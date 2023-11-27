const toggleMenu = () => {
    const contactList = document.querySelector('.workchat_style_contact__CiU17');
    
    if (contactList) {
      contactList.style.display = contactList.style.display === 'none' ? 'flex' : 'none';
    }
  };
  
  export default toggleMenu;
  