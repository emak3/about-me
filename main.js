// public/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール効果
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(46, 139, 87, 0.9)'; // 半透明の芝色
        header.style.padding = '1rem 0';
      } else {
        header.style.background = 'var(--color-turf)';
        header.style.padding = '2rem 0';
      }
    });
  
    // 画像のlazy loading
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });
  
    lazyImages.forEach(img => {
      if (img.src) {
        const src = img.src;
        img.src = '';
        img.dataset.src = src;
        imageObserver.observe(img);
      }
    });
  
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // ギャラリーの画像クリック時の拡大表示
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const modal = document.createElement('div');
        modal.classList.add('image-modal');
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', function() {
          this.remove();
        });
      });
    });
  
    // CSSを動的に追加（モーダル用）
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: pointer;
      }
      
      .image-modal img {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      }
    `;
    document.head.appendChild(styleElement);
  });