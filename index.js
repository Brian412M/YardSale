//Loading Lazy Config
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });

  });



// Vehicle category Toggle
let categories = document.querySelectorAll('.categoryTab');

function categoryChange() {
  categories.forEach(category => {
    if (category.innerText === 'Offroad') {
      category.style.background = 'orange';
    } else if (category.innerText === 'Street') {
      category.style.background = '#45d545';
    } else if (category.innerText === 'Performance') {
      category.style.background = 'blue';
    }
  });
}

categoryChange();

// Search functionality
document.getElementById('search').addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const carCards = document.querySelectorAll('.card');

    carCards.forEach(card => {
        const model = card.getAttribute('data-model').toLowerCase();
        const year = card.getAttribute('data-year');
        if (model.includes(searchTerm) || `${model} ${year}`.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});



//Time Control On Card
function setCreationTime(cardId) {
    let creationTime = localStorage.getItem(`creationTime_${cardId}`);
    if (!creationTime) {
        creationTime = new Date().getTime();
        localStorage.setItem(`creationTime_${cardId}`, creationTime);
    }
    return creationTime;
}

function updateTime(card) {
    const cardId = card.getAttribute('data-id');
    const creationTime = setCreationTime(cardId);
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - creationTime;

    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeString = '';

    if (days > 0) {
        timeString = `${days}d ago`;
    } else if (hours > 0) {
        timeString = `${hours}h ago`;
    } else if (minutes > 0) {
        timeString = `${minutes}m ago`;
    } else {
        timeString = `${seconds}s ago`;
    }


    card.querySelector('#time').textContent = timeString;
}

//Time Clear
function clearStorageTime() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardId = card.getAttribute('data-id');
        localStorage.removeItem(`creationTime_${cardId}`);
        console.log('TimeReset');
    });
    updateAllTimes(); // Update the times immediately after clearing
}

function updateAllTimes() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(updateTime);
    
}

// Update the time every minute
setInterval(updateAllTimes, 60000);
updateAllTimes(); // Initial call to set the time immediately

function inquire() {
    window.open('https://wa.me/message/2PCV3N2ZHPUAB1', '_blank');
  }



     


