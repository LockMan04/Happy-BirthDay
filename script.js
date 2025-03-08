// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo scene Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('birthdayCanvas'),
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Đặt màu nền
scene.background = new THREE.Color(0x111111);

// Đặt vị trí camera
camera.position.z = 20;

// Tạo hiệu ứng ánh sáng
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff71ce, 1, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x01cdfe, 1, 100);
pointLight2.position.set(-10, -10, 10);
scene.add(pointLight2);

// Tạo các hình khối trang trí
const particles = [];
const confettiCount = 200;

// Tạo hộp quà
const giftBoxGeometry = new THREE.BoxGeometry(2, 2, 2);
const giftBoxMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff71ce,
    metalness: 0.3,
    roughness: 0.5
});

const giftBox = new THREE.Mesh(giftBoxGeometry, giftBoxMaterial);
giftBox.position.set(-8, -5, 0);
scene.add(giftBox);

// Tạo nơ cho hộp quà
const ribbonGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const ribbonMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x01cdfe,
    metalness: 0.7,
    roughness: 0.2
});

const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
ribbon.position.set(-8, -3.5, 0);
scene.add(ribbon);

// Tạo bánh sinh nhật
const cakeBaseGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
const cakeBaseMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xfff1e6,
    roughness: 0.8
});

const cakeBase = new THREE.Mesh(cakeBaseGeometry, cakeBaseMaterial);
cakeBase.position.set(8, -5, 0);
scene.add(cakeBase);

// Tạo lớp kem bánh
const frostingGeometry = new THREE.CylinderGeometry(1.5, 1.7, 0.3, 32);
const frostingMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffb3ba,
    roughness: 0.5
});

const frosting = new THREE.Mesh(frostingGeometry, frostingMaterial);
frosting.position.set(8, -4.2, 0);
scene.add(frosting);

// Tạo nến sinh nhật
const candleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 16);
const candleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffba, 
    roughness: 0.5
});

const candle = new THREE.Mesh(candleGeometry, candleMaterial);
candle.position.set(8, -3.5, 0);
scene.add(candle);

// Tạo ngọn lửa
const flameGeometry = new THREE.SphereGeometry(0.2, 16, 16);
const flameMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff9d00,
    emissive: 0xff9d00,
    emissiveIntensity: 1
});

const flame = new THREE.Mesh(flameGeometry, flameMaterial);
flame.position.set(8, -2.9, 0);
scene.add(flame);

// Tạo các hạt confetti
for (let i = 0; i < confettiCount; i++) {
    // Tạo hình dạng ngẫu nhiên cho confetti
    let geometry;
    const shapeType = Math.floor(Math.random() * 3);
    
    if (shapeType === 0) {
        geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    } else if (shapeType === 1) {
        geometry = new THREE.CircleGeometry(0.1, 6);
    } else {
        geometry = new THREE.TetrahedronGeometry(0.2);
    }
    
    // Tạo màu sắc ngẫu nhiên
    const colors = [0xff71ce, 0x01cdfe, 0x05ffa1, 0xffffba, 0xffffff];
    const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        metalness: 0.3,
        roughness: 0.7
    });
    
    const particle = new THREE.Mesh(geometry, material);
    
    // Đặt vị trí ngẫu nhiên
    particle.position.x = Math.random() * 40 - 20;
    particle.position.y = Math.random() * 40 - 20;
    particle.position.z = Math.random() * 40 - 20;
    
    // Lưu vận tốc và góc quay
    particle.userData = {
        velocity: {
            x: (Math.random() - 0.5) * 0.05,
            y: (Math.random() - 0.5) * 0.05,
            z: (Math.random() - 0.5) * 0.05
        },
        rotation: {
            x: Math.random() * 0.02,
            y: Math.random() * 0.02,
            z: Math.random() * 0.02
        }
    };
    
    particles.push(particle);
    scene.add(particle);
}

// Tạo hiệu ứng bong bóng
const bubbleGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const bubbleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.95,
    roughness: 0,
    metalness: 0,
    clearcoat: 1.0,
    clearcoatRoughness: 0,
    ior: 1.5,
    thickness: 0.01
});

const bubbles = [];
for (let i = 0; i < 15; i++) {
    const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
    bubble.position.x = Math.random() * 40 - 20;
    bubble.position.y = -30 + Math.random() * 10;
    bubble.position.z = Math.random() * 20 - 10;
    bubble.scale.set(
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5,
        Math.random() * 0.5 + 0.5
    );
    
    bubble.userData = {
        speed: Math.random() * 0.05 + 0.02
    };
    
    bubbles.push(bubble);
    scene.add(bubble);
}

// Tạo các trang thiệp 3D
const cardPages = [];
const cardPageCount = 10;
const cardPageGeometry = new THREE.PlaneGeometry(4, 5);

// Tạo các trang thiệp
for (let i = 0; i < cardPageCount; i++) {
    // Màu sắc cho các trang thiệp
    const pageColors = [0xffb3ba, 0xffdfba, 0xffffba, 0xbaffc9, 0xbae1ff];
    const pageMaterial = new THREE.MeshStandardMaterial({
        color: pageColors[i % pageColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    
    const cardPage = new THREE.Mesh(cardPageGeometry, pageMaterial);
    
    // Ẩn các trang thiệp ban đầu
    cardPage.position.y = 100; // Vị trí ban đầu ở ngoài màn hình
    
    // Thông tin cho animation
    cardPage.userData = {
        targetX: (i % 2 === 0) ? -10 - i : 10 + i, // Mục tiêu bên trái hoặc phải
        speed: 0.1 + Math.random() * 0.1,
        rotationSpeed: 0.02 + Math.random() * 0.03,
        fallDelay: i * 100, // Độ trễ khi rơi
        fallStarted: false,
        opacity: 1.0
    };
    
    cardPages.push(cardPage);
    scene.add(cardPage);
}

// Sự kiện khi thay đổi kích thước cửa sổ
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Biến để theo dõi trạng thái lật thiệp
let isCardFlipped = false;
let hasCardAnimationStarted = false;

// Xử lý sự kiện click card
const card = document.querySelector('.card');
card.addEventListener('click', function() {
    this.classList.toggle('flipped');
    isCardFlipped = this.classList.contains('flipped');
    
    // Kích hoạt hiệu ứng các trang thiệp rơi khi mở thiệp
    if (isCardFlipped && !hasCardAnimationStarted) {
        hasCardAnimationStarted = true;
        
        // Bắt đầu hiệu ứng các trang thiệp rơi
        for (let i = 0; i < cardPages.length; i++) {
            // Đặt vị trí bắt đầu ở giữa màn hình
            setTimeout(() => {
                cardPages[i].position.set(0, 5, 0);
                cardPages[i].rotation.z = Math.random() * Math.PI * 2;
                cardPages[i].userData.fallStarted = true;
            }, cardPages[i].userData.fallDelay);
        }
        
        // Tạo thêm confetti khi thiệp được mở
        createExtraConfetti();
    }
});

// Tạo thêm confetti khi mở thiệp
function createExtraConfetti() {
    const extraConfettiCount = 100;
    
    for (let i = 0; i < extraConfettiCount; i++) {
        let geometry;
        const shapeType = Math.floor(Math.random() * 3);
        
        if (shapeType === 0) {
            geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        } else if (shapeType === 1) {
            geometry = new THREE.CircleGeometry(0.15, 6);
        } else {
            geometry = new THREE.TetrahedronGeometry(0.3);
        }
        
        // Màu sắc rực rỡ hơn cho confetti mới
        const colors = [0xff71ce, 0x01cdfe, 0x05ffa1, 0xffffba, 0xffffff, 0xff0000, 0x00ff00, 0x0000ff];
        const material = new THREE.MeshStandardMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            metalness: 0.5,
            roughness: 0.5
        });
        
        const particle = new THREE.Mesh(geometry, material);
        
        // Đặt vị trí bắt đầu từ thiệp
        particle.position.x = 0;
        particle.position.y = 0;
        particle.position.z = 0;
        
        // Vận tốc bắn ra từ giữa
        const speed = 0.1 + Math.random() * 0.2;
        const angle = Math.random() * Math.PI * 2;
        
        particle.userData = {
            velocity: {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed + 0.05, // Thêm một chút vận tốc hướng lên
                z: (Math.random() - 0.5) * 0.1
            },
            rotation: {
                x: Math.random() * 0.05,
                y: Math.random() * 0.05,
                z: Math.random() * 0.05
            },
            gravity: 0.001 + Math.random() * 0.002 // Thêm trọng lực
        };
        
        particles.push(particle);
        scene.add(particle);
    }
}

// Hiệu ứng nhấp nháy cho ngọn lửa
function flicker() {
    flameMaterial.emissiveIntensity = 0.5 + Math.random() * 0.5;
    
    // Thay đổi kích thước ngọn lửa
    const scaleChange = 0.8 + Math.random() * 0.4;
    flame.scale.set(scaleChange, scaleChange, scaleChange);
    
    // Hiệu ứng rung nhẹ
    flame.position.x = 8 + (Math.random() * 0.05 - 0.025);
    flame.position.z = (Math.random() * 0.05 - 0.025);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Hiệu ứng nhấp nháy cho ngọn lửa
    flicker();
    
    // Xoay hộp quà và nơ
    giftBox.rotation.y += 0.01;
    giftBox.rotation.x += 0.005;
    ribbon.rotation.y += 0.02;
    
    // Di chuyển các hạt confetti
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Cập nhật vị trí
        particle.position.x += particle.userData.velocity.x;
        particle.position.y += particle.userData.velocity.y;
        particle.position.z += particle.userData.velocity.z;
        
        // Thêm trọng lực nếu có
        if (particle.userData.gravity) {
            particle.userData.velocity.y -= particle.userData.gravity;
        }
        
        // Cập nhật góc quay
        particle.rotation.x += particle.userData.rotation.x;
        particle.rotation.y += particle.userData.rotation.y;
        particle.rotation.z += particle.userData.rotation.z;
        
        // Đặt lại vị trí nếu đi ra ngoài màn hình
        if (
            particle.position.x > 20 || particle.position.x < -20 ||
            particle.position.y > 20 || particle.position.y < -20 ||
            particle.position.z > 20 || particle.position.z < -20
        ) {
            particle.position.x = Math.random() * 40 - 20;
            particle.position.y = Math.random() * 40 - 20;
            particle.position.z = Math.random() * 40 - 20;
        }
    }
    
    // Di chuyển bong bóng lên trên
    for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        bubble.position.y += bubble.userData.speed;
        bubble.rotation.x += 0.01;
        bubble.rotation.y += 0.01;
        
        // Hiệu ứng lắc nhẹ
        bubble.position.x += Math.sin(Date.now() * 0.001 + i) * 0.01;
        
        // Đặt lại vị trí khi ra khỏi màn hình
        if (bubble.position.y > 30) {
            bubble.position.y = -30;
            bubble.position.x = Math.random() * 40 - 20;
            bubble.position.z = Math.random() * 20 - 10;
        }
    }
    
    // Cập nhật chuyển động của các trang thiệp
    for (let i = 0; i < cardPages.length; i++) {
        const cardPage = cardPages[i];
        
        if (cardPage.userData.fallStarted) {
            // Di chuyển về phía mục tiêu (trái hoặc phải)
            const targetX = cardPage.userData.targetX;
            cardPage.position.x += (targetX - cardPage.position.x) * 0.05;
            
            // Rơi xuống từ từ
            cardPage.position.y -= cardPage.userData.speed;
            
            // Xoay trang
            cardPage.rotation.z += cardPage.userData.rotationSpeed;
            
            // Mờ dần khi rơi xa
            if (cardPage.position.y < -15) {
                cardPage.userData.opacity -= 0.01;
                if (cardPage.userData.opacity < 0) {
                    cardPage.userData.opacity = 0;
                }
                cardPage.material.opacity = cardPage.userData.opacity;
            }
            
            // Đặt lại khi rơi ra ngoài màn hình
            if (cardPage.position.y < -30) {
                cardPage.position.y = 100; // Ẩn
                cardPage.userData.fallStarted = false;
                cardPage.userData.opacity = 1.0;
                cardPage.material.opacity = 1.0;
            }
        }
    }

    renderer.render(scene, camera);
}

animate();

// Hiệu ứng đặc biệt khi load trang
document.querySelector('.message').style.opacity = 0;
document.querySelector('.card-container').style.opacity = 0;

setTimeout(() => {
    document.querySelector('.message').style.transition = 'opacity 1s, transform 1s';
    document.querySelector('.message').style.opacity = 1;
    document.querySelector('.message').style.transform = 'translateZ(50px)';
}, 500);

setTimeout(() => {
    document.querySelector('.card-container').style.transition = 'opacity 1s';
    document.querySelector('.card-container').style.opacity = 1;
}, 1500);

// Xử lý phần âm nhạc
const musicToggle = document.getElementById("music-toggle");
const birthdayMusic = document.getElementById("birthday-music");
let musicInitialized = false;
// Xử lý sự kiện click vào card để phát nhạc lần đầu tiên
document.querySelector(".card").addEventListener("click", function (e) {
  // Khởi tạo nhạc khi người dùng tương tác lần đầu
  if (!musicInitialized) {
    birthdayMusic.volume = 0.5; // Đặt âm lượng ở mức 50%
    birthdayMusic.play().catch((error) => {
      console.log("Không thể tự động phát nhạc:", error);
    });
    musicInitialized = true;
    musicToggle.classList.add("playing");
  }
});
// Xử lý nút bật/tắt nhạc
musicToggle.addEventListener("click", function () {
  if (!musicInitialized) {
    // Lần đầu bấm vào nút nhạc
    birthdayMusic.volume = 0.5;
    birthdayMusic.play().catch((error) => {
      console.log("Không thể tự động phát nhạc:", error);
    });
    musicInitialized = true;
    this.classList.add("playing");
  } else {
    // Đã khởi tạo nhạc, bật/tắt
    if (birthdayMusic.paused) {
      birthdayMusic.play();
      this.classList.add("playing");
      this.classList.remove("muted");
      this.querySelector(".music-icon").textContent = "🔊";
    } else {
      birthdayMusic.pause();
      this.classList.remove("playing");
      this.classList.add("muted");
      this.querySelector(".music-icon").textContent = "🔈";
    }
  }
});
// Thêm xử lý sự kiện khi người dùng đóng thiệp
document.querySelector(".close-card").addEventListener("click", function (e) {
  e.stopPropagation(); // Ngăn sự kiện click lan tỏa đến thẻ cha
  document.querySelector(".card").classList.remove("flipped");
});
});
