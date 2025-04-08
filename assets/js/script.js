document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".input-area input");
    const requiredCheckbox = document.querySelector(".checkbox-area .required");
    const button = document.querySelector(".contact-btn button");

    // 입력 필드와 체크박스 상태 확인 함수
    const checkInputs = () => {
        const allInputsFilled = Array.from(inputs).every(input => input.value.trim() !== "");
        const isCheckboxChecked = requiredCheckbox.checked;
        // 필수 체크박스 상태 확인
        button.disabled = !(allInputsFilled && isCheckboxChecked);
        // 모든 조건 충족 시 버튼 활성화
    };

    // 입력 필드와 체크박스에 이벤트 리스너 추가
    inputs.forEach(input => {
        input.addEventListener("input", checkInputs);
    });
    requiredCheckbox.addEventListener("change", checkInputs);

    // 초기 상태 설정
    checkInputs();

    // 이름 입력 필드에서 숫자 입력 방지
    const nameInput = document.querySelector('.input-name input');
    nameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[0-9]/g, '');
        // 숫자를 제거
    });

    // 연락처 입력 필드에서 하이픈('-') 자동 추가 및 길이 제한
    const phoneInput = document.querySelector('.input-num input');
    phoneInput.addEventListener('input', function () {
        let value = this.value.replace(/[^0-9]/g, '');
        // 숫자만 남기기
        if (value.length > 11) {
            value = value.slice(0, 11);
            // 최대 11자리까지만 허용
        }
        if (value.length > 3 && value.length <= 7) {
            this.value = value.replace(/(\d{3})(\d+)/, '$1-$2');
            // 010-000 형식
        } else if (value.length > 7) {
            this.value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
            // 010-0000-0000 형식
        } else {
            this.value = value;
            // 3자리 이하일 경우 그대로 유지
        }
    });

    const modal = document.getElementById("modal");

    button.addEventListener("click", () => {
        if (!button.disabled) {
            // 모달 표시
            modal.classList.remove("hidden");
            modal.classList.add("show");

            // 6초 후 모달 숨기기
            setTimeout(() => {
                modal.classList.remove("show");
                modal.classList.add("hidden");
            }, 6000); // 6초
        }
    });

});