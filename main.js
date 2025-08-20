// Khởi tạo
const stacksCard = document.querySelector(".stacks-card");
const btnNope = document.getElementById("btn-nope");
const btnLove = document.getElementById("btn-love");
const btnStar = document.getElementById("btn-star");

// Biến kiểm tra xem có đang túm ảnh không
let isDragging = false;

let currentCard = null;
let mouseCoord = {
    x: 0,
    y: 0,
}

// Hàm xác định thẻ đầu tiên
function getTopCard() {
    const cards = document.querySelectorAll(".card");
    return cards[cards.length - 1];
    // console.log(document.querySelector(".stacks-card .card:last-child"));
}

// Hàm lấy ra các badge
function getBadge(direction) {
    if (direction === "left") return document.querySelector(".badge-nope");
    if (direction === "right") return document.querySelector(".badge-love");
    if (direction === "up") return document.querySelector(".badge-save");
    return null;
}

// Hàm ảnh trượt sang trái, phải hoặc lên trên
function swipeCard(card, direction) {
    const badge = getBadge(direction);
    card.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    badge.style.transition = "all 0.1s ease ";

    if (direction === "right") {
        card.style.transform = "translateX(400px) rotate(30deg)";
        card.style.opacity = "0";
        if (badge) {
            badge.style.opacity = "1";
            badge.style.visibility = "visible";
        }
    } else if (direction === "left") {
        card.style.transform = "translateX(-400px) rotate(-30deg)";
        card.style.opacity = "0";
        if (badge) {
            badge.style.opacity = "1";
            badge.style.visibility = "visible";
        }
    } else if (direction === "up") {
        card.style.transform = "translateY(-400px) rotate(0deg)";
        card.style.opacity = "0";
        if (badge) {
            badge.style.opacity = "1";
            badge.style.visibility = "visible";
        }
    }
    card.addEventListener("transitionend", function handler() {
        card.remove();
        card.removeEventListener("transitionend", handler);
        // Ẩn badge sau khi xóa thẻ
        if (badge) {
            badge.style.opacity = "0";
            badge.style.visibility = "hidden";
        }
        currentCard = null;
    });
}

// Hàm xử lý sự kiện túm
function handleMouseDown(e) {
    currentCard = getTopCard();
    // if (!currentCard) return;
    isDragging = true
    mouseCoord.x = e.clientX;
    console.log("Đang túm");
};


// Hàm xử lý sự kiện kéo ảnh
function handleMouseMove(e) {

    currentCard = getTopCard();
    // if (!isDragging || !currentCard) return;
    console.log("Đang kéo");

    if (isDragging) {
        const distanceX = e.clientX - mouseCoord.x;
        currentCard.style.transform = `translateX(${distanceX}px) rotate(${distanceX * 0.15}deg)`;

        // if (distanceX > 300) {
        //     swipeCard(currentCard, "right");
        // } else if (distanceX < -300) {
        //     swipeCard(currentCard, "left");
        // }
    }
};

// Hàm xử lý sự kiến thả ảnh
function handleMouseUp(e) {
    isDragging = false;


};

// Sự kiện chuột
stacksCard.addEventListener("mousedown", handleMouseDown);
stacksCard.addEventListener("mousemove", handleMouseMove);
stacksCard.addEventListener("mouseup", handleMouseUp);

// Hàm sử lý sự kiện ấn nút Nope
btnNope.addEventListener("click", () => {
    console.log("Nút Nope đã được ấn");
    const card = getTopCard();
    if (card) swipeCard(card, "left");
});

// Hàm xử lý sự kiện ấn nút Love
btnLove.addEventListener("click", () => {
    console.log("Nút Love đã được ấn");
    const card = getTopCard();
    if (card) swipeCard(card, "right");
});
// Hàm xử lý sự kiện ấn nút Star
btnStar.addEventListener("click", () => {
    console.log("Nút Star đã được ấn");
    const card = getTopCard();
    if (card) swipeCard(card, "up");
});






