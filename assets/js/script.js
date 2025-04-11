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

    // 모바일 메뉴 관련 스크립트
    // 요소 선택
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const mobileCta = document.querySelector('.mobile-cta');

    // 모바일 메뉴 열기
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // 스크롤 방지
    });

    // 모바일 메뉴 닫기 함수
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // 스크롤 복원
    }

    // 닫기 버튼으로 메뉴 닫기
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    // 오버레이 클릭으로 메뉴 닫기
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // 메뉴 항목 클릭으로 메뉴 닫기
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 모바일 CTA 버튼 클릭으로 메뉴 닫기
    if (mobileCta) {
        mobileCta.addEventListener('click', closeMobileMenu);
    }

    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향 감지
        if (scrollTop > lastScrollTop) {
            // 아래로 스크롤
            if (scrollTop > 100) {
                header.style.transform = 'translateY(-100%)'; // 헤더 숨기기
            }
        } else {
            // 위로 스크롤
            header.style.transform = 'translateY(0)'; // 헤더 보이기
            
            // 스크롤 위치에 따라 헤더 스타일 변경
            if (scrollTop > 50) {
                header.style.backgroundColor = '#ffffff';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.backgroundColor = '#ffffff';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
});