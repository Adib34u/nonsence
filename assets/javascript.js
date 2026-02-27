const profileImg = document.querySelector(".profile-img");

const revealOnScroll = () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });

  const rectImg = profileImg.getBoundingClientRect();
  if (rectImg.top < window.innerHeight - 100) {
    profileImg.classList.add("visible");
  }
};

