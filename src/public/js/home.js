const SocialLogin = document.getElementById("SocialLogin");
const SocialLoginForm = document.querySelector("form");

const kakaoButton = SocialLoginForm.querySelector("#kakao");

kakaoButton.addEventListener("click", LoginKakao)

function LoginKakao(){
    window.location.href = 'http://localhost:3000/auth/kakao'
}