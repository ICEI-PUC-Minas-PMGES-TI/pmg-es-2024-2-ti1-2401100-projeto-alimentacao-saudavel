document.addEventListener("DOMContentLoaded", function() {
    const profilePicture = document.getElementById("profilePicture");
    const profileInitials = document.getElementById("profileInitials");
  
    // Se houver uma foto de perfil, esconde as iniciais
    // profilePicture.style.backgroundImage = "url('path-to-profile-picture.jpg')";
    if (/* verifica se há uma foto */ false) { // Alterar a condição conforme necessário
      profileInitials.style.display = "none";
    } else {
      profileInitials.style.display = "flex";
    }
  });