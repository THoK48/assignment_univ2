function typeText(element, text, speed = 40) {
  element.textContent = '';
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}


document.addEventListener("DOMContentLoaded", () => {
    alert("제가 좋아하는 것들을 띄워봤습니다")
  const objects = document.querySelectorAll('.object');
  const descriptionBox = document.getElementById('description-box');
  const closeBtn = document.getElementById('close-description');

  let originalPositions = new Map();

  objects.forEach((obj) => {
    const rect = obj.getBoundingClientRect();
    const containerRect = document.getElementById('object-container').getBoundingClientRect();
    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;
    const width = rect.width;
    const height = rect.height;
    originalPositions.set(obj, { left, top, width, height });

    obj.style.left = `${left}px`;
    obj.style.top = `${top}px`;

    const title = obj.dataset.title;
    const titleDiv = obj.querySelector('.object-title');

    obj.addEventListener('mouseenter', () => {
      if (obj.classList.contains('selected')) return;
      typeText(titleDiv, title); 
    });

    obj.addEventListener('click', () => {
      const desc = obj.dataset.description.replace(/\n/g, '<br>');
      descriptionBox.querySelector('h2').textContent = title;
      descriptionBox.querySelector('p').innerHTML = desc;
      descriptionBox.classList.add('show');
      obj.style.width = '300px';
      obj.style.height = '300px';
      obj.style.left = '30%';
      obj.style.top = '50%';
      obj.style.transform = 'translate(-50%, -50%) scale(1.1)';
      obj.style.zIndex = 10;

      objects.forEach(other => {
        if (other !== obj) other.classList.add('fade');
      });

      obj.classList.add('selected');
    });
  });

  closeBtn.addEventListener('click', () => {
    descriptionBox.classList.remove('show');

    const selectedObj = document.querySelector('.object.selected');
    if (selectedObj && originalPositions.has(selectedObj)) {
    const { left, top, width, height } = originalPositions.get(selectedObj);
      selectedObj.style.width = `${width}px`;
      selectedObj.style.height = `${height}px`;
      selectedObj.style.left = `${left}px`;
      selectedObj.style.top = `${top}px`;
      selectedObj.style.transform = 'none';
      selectedObj.style.zIndex = 1;
      selectedObj.classList.remove('selected');
    }

    objects.forEach(obj => obj.classList.remove('fade'));
  });

document.addEventListener('mousemove', (e) => {
  const container = document.getElementById('object-container');
  const xRatio = e.clientX / container.clientWidth;
  const yRatio = e.clientY / container.clientHeight;

  const offsetX_main = (xRatio - 0.5) * 50;
  const offsetY_main = (yRatio - 0.5) * 50;

  const offsetX_shadow = (xRatio - 0.5) * 20;
  const offsetY_shadow = (yRatio - 0.5) * 20;

  document.querySelectorAll(".main, .main_sha").forEach(el => {
    el.style.transform = `translate(${offsetX_main}px, ${offsetY_main}px)`;
  });

  document.querySelectorAll(".shadow").forEach(el => {
    el.style.transform = `translate(${offsetX_shadow}px, ${offsetY_shadow}px)`;
  });
  document.querySelectorAll(".object-title").forEach(el => {
    el.style.transform = `translate(${offsetX_shadow}px, ${(offsetX_shadow + 10)}px)`;
  });
  
});

});