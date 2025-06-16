const signUpBtn = document.getElementById('signUpBtn');
signUpBtn.addEventListener("click", () =>{
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const pw = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  const gender = document.getElementById('gender').value.trim();
  const phonenum = document.getElementById('phonenum').value.trim();
  const birthday = document.getElementById('birthday').value.trim();
  const age = document.getElementById('age').value.trim();
  const check = document.getElementById('check').value.trim();


if (pw !== confirm) {
    alert("비밀번호를 확인해주세요")
    return
}
if (!name || !email || !pw || !confirm || !gender || !phonenum || !birthday || !age || !check) {
    return
}
alert(`입력하신 회원정보는\n
이름 : ${name}\n
이메일 : ${email}\n
비밀번호 : ${pw}\n
확인용 비밀번호 : ${confirm}\n
성별 : ${gender}\n
전화번호 : ${phonenum}\n
생일 : ${birthday}\n
나이 : ${age}\n
개인정보 이용 동의 ${check}\n
입니다`)


})