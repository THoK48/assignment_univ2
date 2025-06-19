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
  const objects = document.querySelectorAll('.object');
  const descriptionBox = document.getElementById('description-box');
  const closeBtn = document.getElementById('close-description');

  let originalPositions = new Map();

  // 초기 좌표 기억시키기
  objects.forEach((obj) => {
    const rect = obj.getBoundingClientRect();
    const containerRect = document.getElementById('object-container').getBoundingClientRect();
    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;
    const width = rect.width;
    const height = rect.height;
    originalPositions.set(obj, { left, top, width, height });

    // 초기 위치 적용 (style로 박제)
    obj.style.left = `${left}px`;
    obj.style.top = `${top}px`;

    // 🔥 타자기 효과용 요소
    const title = obj.dataset.title;
    const titleDiv = obj.querySelector('.object-title');

    obj.addEventListener('mouseenter', () => {
      if (obj.classList.contains('selected')) return;
      typeText(titleDiv, title); 
    });

    // 클릭 시 중앙 이동 + 설명 박스 표시
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
});
