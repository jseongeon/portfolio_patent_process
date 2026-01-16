// Main JavaScript entry point
document.addEventListener('DOMContentLoaded', function() {

    // 로딩 화면 처리
    function initLoading() {
        const loader = document.querySelector('.loader');
        if (!loader) return;

        document.body.classList.add('loading');

        // 프로그레스 바 애니메이션 완료 후 (약 2.5초) 로더 퇴장
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('loaded');

                // 로더 퇴장 애니메이션 완료 후 스크롤 허용
                setTimeout(() => {
                    document.body.classList.remove('loading');
                    loader.style.display = 'none';
                }, 1000);
            }, 2500);
        });
    }

    // 섹션 1 스크롤 트리거 애니메이션
    function initSection1Animation() {
        const section1 = document.getElementById('section1');
        if (!section1) return;

        const animateElements = section1.querySelectorAll('.section1-animate');
        const animateBox = section1.querySelector('.section1-animate-box');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 왼쪽 요소들 순차 애니메이션
                    animateElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('visible');
                        }, index * 150);
                    });

                    // 검은 박스 슬라이드 인
                    if (animateBox) {
                        setTimeout(() => {
                            animateBox.classList.add('visible');
                        }, 300);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(section1);
    }

    initLoading();

    // Scroll utilities
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 프로그레스 네비게이션 바
    function initProgressNav() {
        const progressBar = document.querySelector('.progress-nav-bar');
        if (!progressBar) return;

        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }

    // 텍스트 Parallax 효과
    function initTextParallax() {
        const parallaxSections = ['intro', 'section3', 'section9', 'section13', 'section15'];

        function onScroll() {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;

            parallaxSections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (!section) return;

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
                    const mainElements = section.querySelectorAll('.intro-title, .section3-text, .section9-title, .section13-title, .section15-text');

                    mainElements.forEach((el, index) => {
                        const speed = 0.3 + (index * 0.1);
                        const yPos = (scrolled - sectionTop) * speed;
                        el.style.transform = `translateY(${yPos}px)`;
                    });
                }
            });
        }

        window.addEventListener('scroll', onScroll);
        onScroll();
    }

    // 가로 스크롤 섹션 초기화 - 카드 슬라이드 방식
    function initHorizontalScroll() {
        const horizontalSections = document.querySelectorAll('.horizontal-scroll-section');

        // 모바일/태블릿에서는 가로 스크롤 비활성화
        if (window.innerWidth <= 1024) {
            return;
        }

        // 각 섹션의 상태를 저장할 배열
        const sectionStates = [];

        horizontalSections.forEach((section, sectionIndex) => {
            const track = section.querySelector('.horizontal-scroll-track');
            if (!track) return;

            const cards = track.children;
            const cardCount = cards.length;
            if (cardCount === 0) return;

            const stickyWrapper = section.querySelector('.sticky-wrapper');

            // 상태 객체 생성
            const state = {
                section: section,
                currentIndex: 0,
                cardCount: cardCount,
                wheelTimeout: null,
                isLocked: false,
                atEnd: false,
                atStart: false
            };
            sectionStates.push(state);

            // 화살표 버튼 생성
            const prevArrow = document.createElement('button');
            prevArrow.className = 'slide-arrow prev';
            prevArrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"></polyline></svg>';

            const nextArrow = document.createElement('button');
            nextArrow.className = 'slide-arrow next';
            nextArrow.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6"></polyline></svg>';

            stickyWrapper.appendChild(prevArrow);
            stickyWrapper.appendChild(nextArrow);

            // 인디케이터 생성
            const indicator = document.createElement('div');
            indicator.className = 'slide-indicator';
            for (let i = 0; i < cardCount; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.dataset.index = i;
                indicator.appendChild(dot);
            }
            stickyWrapper.appendChild(indicator);

            state.prevArrow = prevArrow;
            state.nextArrow = nextArrow;
            state.indicator = indicator;
            state.cards = cards;

            function goToSlide(index, direction = 'next') {
                if (index < 0 || index >= cardCount) return false;

                const prevIndex = state.currentIndex;
                state.currentIndex = index;

                // 모든 카드 클래스 업데이트
                Array.from(cards).forEach((card, i) => {
                    card.classList.remove('active', 'prev-card');

                    if (i === state.currentIndex) {
                        card.classList.add('active');
                    } else if (i < state.currentIndex) {
                        // 현재 카드보다 이전 카드들은 왼쪽으로 나간 상태
                        card.classList.add('prev-card');
                    }
                });

                // 인디케이터 업데이트
                indicator.querySelectorAll('.dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === state.currentIndex);
                });

                // 화살표 상태 업데이트
                prevArrow.disabled = state.currentIndex === 0;
                nextArrow.disabled = state.currentIndex === cardCount - 1;

                return true;
            }

            state.goToSlide = goToSlide;

            // 화살표 클릭 이벤트
            prevArrow.addEventListener('click', () => {
                goToSlide(state.currentIndex - 1);
            });

            nextArrow.addEventListener('click', () => {
                goToSlide(state.currentIndex + 1);
            });

            // 인디케이터 클릭 이벤트
            indicator.querySelectorAll('.dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    goToSlide(parseInt(dot.dataset.index));
                });
            });

            // 초기 상태 설정 - 첫 번째 카드 활성화
            Array.from(cards).forEach((card, i) => {
                if (i === 0) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
            prevArrow.disabled = true;
            nextArrow.disabled = cardCount <= 1;
        });

        // 전역 wheel 이벤트 핸들러
        function globalWheelHandler(e) {
            for (let i = 0; i < sectionStates.length; i++) {
                const state = sectionStates[i];
                const rect = state.section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;

                // 섹션 중앙이 화면 중앙 근처인지
                const sectionCenter = rect.top + rect.height / 2;
                const viewportCenter = viewportHeight / 2;
                const isCentered = Math.abs(sectionCenter - viewportCenter) < 200;

                // 잠금 안된 상태에서 중앙에 없으면 스킵
                if (!isCentered && !state.isLocked) continue;

                // 섹션 중앙이 화면 중앙에 도달하면 잠금 시작
                if (isCentered && !state.isLocked) {
                    state.isLocked = true;
                }

                if (!state.isLocked) continue;

                // 스크롤 감도 임계값
                const threshold = 30;
                const isSignificantScroll = Math.abs(e.deltaY) >= threshold;

                // 스크롤 방향 확인
                const scrollingDown = e.deltaY > 0;
                const scrollingUp = e.deltaY < 0;

                // 마지막 카드에서 아래로 스크롤
                if (scrollingDown && state.currentIndex === state.cardCount - 1) {
                    if (state.atEnd) {
                        // 두 번째 스크롤 -> 잠금 해제
                        state.isLocked = false;
                        state.atEnd = false;
                        return;
                    }
                    // 첫 번째 스크롤 -> 스크롤 막고 atEnd 표시
                    e.preventDefault();
                    e.stopPropagation();
                    if (isSignificantScroll && !state.wheelTimeout) {
                        state.atEnd = true;
                        state.wheelTimeout = setTimeout(() => {
                            state.wheelTimeout = null;
                        }, 500);
                    }
                    return;
                }

                // 첫 번째 카드에서 위로 스크롤
                if (scrollingUp && state.currentIndex === 0) {
                    if (state.atStart) {
                        // 두 번째 스크롤 -> 잠금 해제
                        state.isLocked = false;
                        state.atStart = false;
                        return;
                    }
                    // 첫 번째 스크롤 -> 스크롤 막고 atStart 표시
                    e.preventDefault();
                    e.stopPropagation();
                    if (isSignificantScroll && !state.wheelTimeout) {
                        state.atStart = true;
                        state.wheelTimeout = setTimeout(() => {
                            state.wheelTimeout = null;
                        }, 500);
                    }
                    return;
                }

                // 중간 카드 상태 리셋
                state.atEnd = false;
                state.atStart = false;

                // 그 외 모든 경우 스크롤 차단
                e.preventDefault();
                e.stopPropagation();

                // threshold 미만이면 카드 전환 안함
                if (!isSignificantScroll) return;

                // 디바운스
                if (state.wheelTimeout) return;

                state.wheelTimeout = setTimeout(() => {
                    state.wheelTimeout = null;
                }, 500);

                // 카드 전환
                if (scrollingDown) {
                    state.goToSlide(state.currentIndex + 1);
                } else if (scrollingUp) {
                    state.goToSlide(state.currentIndex - 1);
                }

                return;
            }
        }

        // capture phase에서 먼저 처리
        window.addEventListener('wheel', globalWheelHandler, { passive: false, capture: true });
    }

    // 섹션 5 - 휠 이벤트로 1,2,3,4 순차 등장 (스크롤 잠금)
    function initSection5Animation() {
        const section5 = document.getElementById('section5');
        const section5Lists = document.querySelectorAll('#section5 .section5-list');
        if (!section5 || section5Lists.length === 0) return;

        // 모바일에서는 모두 보이게
        if (window.innerWidth <= 1024) {
            section5Lists.forEach(list => list.classList.add('visible'));
            return;
        }

        let currentIndex = -1; // -1: 아무것도 안보임, 0~3: 해당 인덱스까지 보임
        const itemCount = section5Lists.length;
        let wheelTimeout = null;
        let isLocked = false;

        function showUpToIndex(index) {
            section5Lists.forEach((list, i) => {
                if (i <= index) {
                    list.classList.add('visible');
                } else {
                    list.classList.remove('visible');
                }
            });
            currentIndex = index;
        }

        function handleWheel(e) {
            const rect = section5.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // 섹션 중앙이 화면 중앙에 위치했는지 확인
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = viewportHeight / 2;
            const isInView = Math.abs(sectionCenter - viewportCenter) < 150;

            if (!isInView && !isLocked) return;

            // 섹션 중앙이 화면 중앙에 도달하면 잠금
            if (isInView) {
                isLocked = true;
            }

            if (!isLocked) return;

            // 모두 보이고 아래로 스크롤 - 잠금 해제
            if (currentIndex >= itemCount - 1 && e.deltaY > 0) {
                isLocked = false;
                return;
            }

            // 아무것도 안보이고 위로 스크롤 - 잠금 해제
            if (currentIndex <= -1 && e.deltaY < 0) {
                isLocked = false;
                return;
            }

            // 잠금 상태면 무조건 스크롤 차단
            e.preventDefault();
            e.stopPropagation();

            // 스크롤 감도 임계값 - 차단은 하되 아이템 전환은 threshold 이상일 때만
            const threshold = 30;
            if (Math.abs(e.deltaY) < threshold) {
                return; // 스크롤은 이미 막혔음
            }

            // 디바운스 (스크롤은 이미 막혔음)
            if (wheelTimeout) return;

            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, 500);

            if (e.deltaY > 0) {
                // 아래로 스크롤 - 다음 아이템 표시
                showUpToIndex(Math.min(currentIndex + 1, itemCount - 1));
            } else {
                // 위로 스크롤 - 이전 아이템 숨기기
                showUpToIndex(Math.max(currentIndex - 1, -1));
            }
        }

        // capture phase에서 먼저 처리
        window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    }

    // 섹션 10, 11 - Progress Bar 카운트 애니메이션
    function initProgressBarAnimation() {
        const section10 = document.getElementById('section10');
        const section11 = document.getElementById('section11');

        const observerOptions = {
            threshold: 0.5
        };

        const animatedSections = new Set();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animatedSections.has(entry.target.id)) {
                    animatedSections.add(entry.target.id);

                    if (entry.target.id === 'section10') {
                        animateProgressBars(entry.target, [
                            { selector: '.section10-progress-fill-1', width: '30%' },
                            { selector: '.section10-progress-fill-2', width: '95%' }
                        ]);
                    }

                    if (entry.target.id === 'section11') {
                        animateProgressBars(entry.target, [
                            { selector: '.section11-progress-fill-1', width: '95%' },
                            { selector: '.section11-progress-fill-2', width: '74%' }
                        ]);
                    }
                }
            });
        }, observerOptions);

        if (section10) observer.observe(section10);
        if (section11) observer.observe(section11);
    }

    function animateProgressBars(section, bars) {
        bars.forEach((bar, index) => {
            const element = section.querySelector(bar.selector);
            if (element) {
                // 초기값 0으로 설정
                element.style.width = '0%';

                // 딜레이 후 애니메이션
                setTimeout(() => {
                    element.style.width = bar.width;

                    // 숫자 카운트 애니메이션
                    const valueElement = element.querySelector('.section10-progress-value, .section11-progress-value');
                    if (valueElement) {
                        animateNumber(valueElement, bar.width);
                    }
                }, 100 + (index * 200));
            }
        });
    }

    function animateNumber(element, targetWidth) {
        const targetNum = parseInt(targetWidth);
        const originalText = element.textContent;
        const prefix = originalText.includes('약') ? '약 ' : '';
        const suffix = originalText.includes('효율') ? '% 효율 향상' : '%';

        let current = 0;
        const duration = 800;
        const increment = targetNum / (duration / 16);

        function update() {
            current += increment;
            if (current >= targetNum) {
                current = targetNum;
                element.textContent = prefix + Math.round(current) + suffix;
            } else {
                element.textContent = prefix + Math.round(current) + suffix;
                requestAnimationFrame(update);
            }
        }

        update();
    }

    // Initialize all
    initProgressNav();
    initSmoothScroll();
    initTextParallax();
    initHorizontalScroll();
    initSection5Animation();
    initProgressBarAnimation();
    initSection1Animation();
});
