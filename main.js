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
};
let lastTouch = {
    x: 0,
    y: 0,
};

// Hàm xác định thẻ đầu tiên
function getTopCard() {
    const cards = document.querySelectorAll(".card");
    return cards[cards.length - 1];
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
    badge.style.transition = "all 0.05s ease ";

    if (direction === "right") {
        card.style.transform = "translate(400px 100px) rotate(60deg)";
        card.style.opacity = "0";
        if (badge) {
            badge.style.opacity = "1";
            badge.style.visibility = "visible";
        }
    } else if (direction === "left") {
        card.style.transform = "translate(-400px 100px) rotate(-60deg)";
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

// Hàm xử lý events touch || mouse
function getEvents(e) {
    return e.touches?.length ? e.touches[0] : e;
}

// Hàm xử lý sự kiện túm
function handleMouseDown(e) {
    e.preventDefault(); // Loại bỏ tính chất mặc định 

    const event = getEvents(e);
    currentCard = getTopCard();

    if (!currentCard) return;
    isDragging = true
    mouseCoord.x = event.clientX;
};

// Hàm xử lý sự kiện kéo ảnh
function handleMouseMove(e) {
    e.preventDefault(); // Loại bỏ tính chất mặc định của img
    currentCard = getTopCard();
    if (!isDragging || !currentCard) return;

    if (isDragging) {
        const event = getEvents(e);
        lastTouch.x = event.clientX;

        const distanceX = event.clientX - mouseCoord.x;
        setDragPosition(distanceX);
        if (distanceX > 280) {
            swipeCard(currentCard, "right");
        } else if (distanceX < -280) {
            swipeCard(currentCard, "left");
        }
    }
};

// Hàm xử lý sự kiến thả ảnh
function handleMouseUp(e) {
    e.preventDefault();

    const event = getEvents(e);

    // Nếu kéo chưa đủ thì sẽ trở về vị trí cũ
    const distanceX = event.clientX - mouseCoord.x;
    if (distanceX < 280 && distanceX > -280) setDragPosition(0, false);

    isDragging = false;
};

// Hàm di chuyển 
function setDragPosition(x, instant = true) {
    currentCard.style.transition = `${instant ? "none" : "0.2s"}`;
    currentCard.style.transform = `translateX(${x}px) rotate(${x * 0.15}deg)`;
}

// Sự kiện chuột
stacksCard.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);

// Sự kiện ngón tay
stacksCard.addEventListener("touchstart", handleMouseDown, { passive: false });
document.addEventListener("touchmove", handleMouseMove, { passive: false });
document.addEventListener("touchend", handleMouseUp, { passive: false });


// Hàm sử lý sự kiện ấn nút Nope
btnNope.addEventListener("click", () => {
    const card = getTopCard();
    if (card) swipeCard(card, "left");
});

// Hàm xử lý sự kiện ấn nút Love
btnLove.addEventListener("click", () => {
    const card = getTopCard();
    if (card) swipeCard(card, "right");
});
// Hàm xử lý sự kiện ấn nút Star
btnStar.addEventListener("click", () => {
    const card = getTopCard();
    if (card) swipeCard(card, "up");
});






