// Bosh sahifa yuklanganda ishga tushuvchi asosiy skript
document.addEventListener('DOMContentLoaded', () => {
    console.log("Jadidbobo bosh sahifasi muvaffaqiyatli yuklandi!");

    // Kartochkalar uchun oddiy kirish animatsiyasi
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}); 