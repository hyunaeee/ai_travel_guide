# 🚗 RouteStory AI Agent

> **지능형 경로 기반 콘텐츠 큐레이션 시스템**  
> 차량 내에서 실시간으로 위치 기반 이야기와 정보를 AI 음성으로 제공하는 혁신적인 AI Agent

![Gemini 2.0 Flash](https://img.shields.io/badge/Gemini-2.0%20Flash-blue?style=for-the-badge&logo=google)
![Web Speech API](https://img.shields.io/badge/Web%20Speech-API-green?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

## ✨ 주요 특징

### 🤖 **지능형 AI Agent**
- **자율적 상황 판단**: 교통상황, 시간대, 위치를 종합 분석
- **실시간 의사결정**: Gemini 2.0 Flash가 최적의 행동 선택
- **개인화 학습**: 사용자 패턴을 학습하여 맞춤형 서비스 제공

### 🎵 **브라우저 내장 음성 출력**
- **Web Speech API**: 브라우저 내장 TTS로 자연스러운 한국어 음성
- **다양한 음성 선택**: 시스템에 설치된 한국어 음성 자동 감지
- **실시간 음성 제어**: 속도 조절 및 재생 제어 가능

### 📍 **위치 기반 콘텐츠**
- **역사적 이야기**: 지나가는 장소의 흥미로운 역사 설명
- **맛집 추천**: 현재 위치 근처 맛집 및 관광지 정보
- **안전 조언**: 교통상황에 맞는 실시간 안전 운전 팁

## 🎯 프로젝트 배경

### 해결하고자 하는 문제
- 매일 반복되는 출퇴근길의 **지루함과 무료함**
- 지나가는 장소에 대한 **흥미로운 정보를 놓치는 아쉬움**
- 운전 중 **안전하게 즐길 수 있는 콘텐츠 부족**

### 타겟 사용자
- 출퇴근/일상 운전을 하는 20-40대 직장인
- 여행/드라이브를 즐기는 모든 연령층
- 운전 시간을 더 의미있게 보내고 싶은 사람들

## 🚀 빠른 시작

### 필요 조건
- 모던 웹 브라우저 (Chrome, Edge, Safari 권장)
- Gemini API 키 ([Google AI Studio](https://makersuite.google.com/app/apikey)에서 발급)
- 한국어 TTS 지원 브라우저/OS

### 브라우저 호환성
| 브라우저   | 음성 출력    | 한국어 지원   | 품질      |
|----------|-----------|------------|-----------|
| Chrome   | ✅ 완벽 지원 | ✅ 고품질    | ⭐⭐⭐⭐⭐ |
| Edge     | ✅ 완벽 지원 | ✅ 고품질    | ⭐⭐⭐⭐⭐ |
| Safari   | ✅ 지원     | ✅ 양호     | ⭐⭐⭐⭐   |
| Firefox  | ⚠️ 제한적   | ⚠️ 기본      | ⭐⭐⭐    |

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/routestory-ai-agent.git
   cd routestory-ai-agent
   ```

2. **파일 실행**
   ```bash
   # 간단히 HTML 파일을 브라우저에서 열기
   open index.html
   
   # 또는 로컬 서버 실행 (권장)
   python -m http.server 8000
   # 브라우저에서 http://localhost:8000 접속
   ```

3. **API 키 설정**
   - 브라우저에서 앱 실행 후 Gemini API 키 입력
   - 음성 설정에서 속도 및 활성화 여부 선택

4. **음성 테스트**
   - "🎤 음성 테스트" 버튼으로 TTS 동작 확인
   - 한국어 음성이 제대로 출력되는지 검증

5. **Agent 시작**
   - "🚀 Agent 시작" 버튼 클릭
   - 실시간으로 AI가 상황을 분석하고 음성 콘텐츠 제공

## 🎮 사용법

### 기본 사용 흐름
1. **API 키 입력** → Gemini API 키 설정
2. **음성 테스트** → 브라우저 TTS 동작 확인  
3. **음성 설정** → 속도 조절 및 출력 활성화
4. **Agent 시작** → AI가 자동으로 상황 분석 시작
5. **음성 콘텐츠** → 위치별 맞춤 이야기 청취
6. **Agent 정지** → 필요시 언제든 중단 가능

### 음성 설정 옵션
- **음성 출력 활성화**: TTS 켜기/끄기
- **속도 조절**: 0.5배속 ~ 2.0배속 (기본 1.0배속)
- **자동 음성 선택**: 시스템 한국어 음성 자동 감지

### AI Agent 동작 모드
- **STORY**: 현재 위치의 역사적 이야기 제공
- **SUGGEST**: 맛집/관광지 추천 정보
- **SAFETY**: 안전 운전 관련 조언
- **WAIT**: 복잡한 상황에서 조용히 대기

## 🛠️ 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: 모던 UI 스타일링 (Grid, Flexbox)
- **JavaScript ES6+**: 비동기 처리 및 모듈화

### AI & API
- **Gemini 2.0 Flash**: 텍스트 생성 및 의사결정
- **Web Speech API**: 브라우저 내장 Text-to-Speech
- **SpeechSynthesis**: 음성 합성 및 제어
- **Geolocation API**: 위치 기반 서비스 (향후 연동)

### 음성 처리
```javascript
// Web Speech API 사용 예시
const utterance = new SpeechSynthesisUtterance(text);
utterance.lang = 'ko-KR';
utterance.rate = 1.0;
speechSynthesis.speak(utterance);
```

## 🏗️ 아키텍처

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  사용자 인터페이스  │    │    AI Agent      │   │  Gemini 2.0 API │
│                 │    │                 │    │                 │
│  ├ 위치 표시      │    │  ├ 상황 분석      │◄──►│  ├ 텍스트 생성     │
│  ├ 음성 설정      │◄──►│  ├ 의사 결정      │    │  ├ 콘텐츠 큐레이션  │
│  ├ 실시간 로그     │    │  ├ 행동 실행      │    │  └ 상황별 추천     │
│  └ 콘텐츠 출력     │    │  └ 학습 & 적응    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │
         ▼                        ▼
┌─────────────────┐    ┌─────────────────┐
│  Web Speech API │    │   타이핑 효과      │
│                 │    │                 │
│  ├ TTS 엔진      │    │  ├ 30초 분량      │
│  ├ 한국어 음성     │    │  ├ 동시 음성      │
│  ├ 속도 제어      │    │  └ 시각적 피드백    │
│  └ 재생 제어      │    │                 │
└─────────────────┘    └─────────────────┘
```

## 🎨 UI/UX 디자인

### 디자인 컨셉
- **어두운 네이비 테마**: 운전 중 눈의 피로 최소화
- **직관적 인터페이스**: 운전 중 안전을 고려한 최소한의 UI
- **실시간 피드백**: AI 동작 상태를 시각적으로 표현

### 주요 컴포넌트
- **두뇌 활동 표시**: AI 사고 과정 실시간 시각화
- **상황 분석 카드**: 현재 컨텍스트 정보 표시
- **음성 설정 패널**: TTS 옵션 및 테스트 기능
- **음성 콘텐츠 영역**: 생성된 이야기 텍스트 + 음성 출력
- **실시간 로그**: 시스템 동작 상태 모니터링

## 🔊 음성 기술 상세

### Web Speech API 특징
```javascript
// 한국어 음성 자동 감지
const voices = speechSynthesis.getVoices();
const koreanVoice = voices.find(voice => 
    voice.lang.startsWith('ko') || voice.name.includes('Korean')
);
```

### 음성 품질 최적화
- **30초 분량 스토리**: 충분한 길이의 콘텐츠
- **자연스러운 호흡**: 문장 단위 끊어 읽기
- **속도 최적화**: 운전 중 청취에 적합한 속도
- **동시 타이핑**: 음성과 텍스트 동시 제공

### 음성 제어 기능
- **즉시 중단**: Agent 정지 시 음성도 함께 중단
- **에러 처리**: 음성 재생 실패 시 자동 복구
- **상태 추적**: 재생 시작/완료 실시간 로깅

## 🚧 개발 현황

### ✅ 완료된 기능
- [x] Gemini 2.0 Flash API 연동
- [x] Web Speech API 기반 음성 출력
- [x] 실시간 위치 기반 콘텐츠 생성
- [x] 자율적 AI Agent 의사결정 시스템
- [x] 한국어 TTS 자동 감지 및 설정
- [x] 음성 속도 제어 및 재생 관리
- [x] 반응형 UI/UX 디자인
- [x] 실시간 로깅 및 모니터링

### 🔄 개발 중인 기능
- [ ] 실제 GPS 연동
- [ ] 사용자 선호도 학습
- [ ] 음성 명령 인터페이스 (Speech Recognition)
- [ ] 뚜벅이 여행자 전용 개발 기획

### 📋 향후 계획
- [ ] 실시간 교통정보 연동
- [ ] 고급 TTS API 연동 (Google Cloud TTS)
- [ ] 다국어 지원
- [ ] 모바일 앱 버전

## 🔧 설정 및 커스터마이징

### 환경 변수
```javascript
// 기본 설정값들
const CONFIG = {
    UPDATE_INTERVAL: 45000,        // Agent 실행 주기 (ms)
    LOCATION_CHANGE_INTERVAL: 10000, // 위치 변경 주기 (ms)
    TYPING_DURATION: 30000,        // 타이핑 효과 시간 (ms)
    DEFAULT_SPEECH_RATE: 1.0,      // 기본 음성 속도
    TTS_LANGUAGE: 'ko-KR'          // TTS 언어 설정
};
```

### 음성 설정 커스터마이징
```javascript
// 음성 설정 커스터마이징
utterance.rate = 1.2;      // 속도 (0.1 ~ 10.0)
utterance.pitch = 1.0;     // 음높이 (0.0 ~ 2.0)
utterance.volume = 1.0;    // 볼륨 (0.0 ~ 1.0)
```

## 🐛 문제 해결

### 자주 발생하는 문제

**Q: 음성이 나오지 않아요**
```
A: 1. 브라우저에서 오디오 재생 허용 확인
   2. "음성 테스트" 버튼으로 TTS 동작 확인
   3. 음성 설정에서 "음성 출력 활성화" 체크
   4. Chrome/Edge 브라우저 사용 권장
```

**Q: 한국어 음성이 이상해요**
```
A: 1. 시스템에 한국어 TTS 엔진 설치 확인
   2. Chrome://settings/languages에서 한국어 음성 추가
   3. Windows: 제어판 > 음성 인식에서 한국어 음성 설치
   4. Mac: 시스템 환경설정 > 손쉬운 사용 > 음성에서 설정
```

**Q: 음성 속도가 너무 빨라요/느려요**
```
A: 1. 음성 설정에서 속도 슬라이더 조절
   2. 0.5배속(느림) ~ 2.0배속(빠름) 범위에서 선택
   3. 운전 중에는 1.0배속 권장
```

**Q: API 연결이 실패해요**
```
A: 1. Gemini API 키가 올바른지 확인
   2. 네트워크 연결 상태 확인  
   3. 브라우저 콘솔에서 오류 메시지 확인
   4. API 사용량 한도 확인
```

### 브라우저별 최적화 팁

**Chrome (권장)**
- 최고 품질의 한국어 TTS 지원
- 모든 기능 완벽 동작

**Edge**
- Windows 시스템 TTS 엔진 활용
- Chrome과 유사한 품질

**Safari**
- macOS 내장 TTS 사용
- 일부 속도 제어 제한있음

**Firefox**
- 기본적인 TTS만 지원
- 고급 기능 일부 제한

## 🎯 성능 최적화

### 메모리 관리
```javascript
// 음성 재생 완료 후 정리
utterance.onend = () => {
    this.currentSpeech = null;
    // 메모리 정리
};
```

### 네트워크 최적화
- API 호출 최적화로 지연시간 최소화
- 에러 발생 시 자동 재시도 로직
- 캐싱으로 반복 요청 방지

## 🤝 기여하기

### 기여 방법
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/WebSpeechImprovement`)
3. Commit your Changes (`git commit -m 'Improve TTS quality'`)
4. Push to the Branch (`git push origin feature/WebSpeechImprovement`)
5. Open a Pull Request

### 개발 가이드라인
- Web Speech API 표준 준수
- 브라우저 호환성 고려
- 자세한 주석 작성 (특히 음성 관련 코드)
- 반응형 디자인 고려

### 테스트 가이드
```javascript
// 음성 기능 테스트 방법
function testTTS() {
    const testText = "RouteStory 음성 테스트입니다.";
    agent.speakText(testText);
}
```

### 연락처
- 📧 Email: hyunaeee@gmail.com

## 🙏 감사의 말

- **Google Gemini Team**: 강력한 AI 모델 제공
- **Web Speech API**: 브라우저 음성 기술 표준 제공
- **Mozilla Developer Network**: 웹 기술 문서화
- **OpenSource Community**: 영감과 기술적 조언

---

<div align="center">

**🚗 RouteStory와 함께 더 의미있는 드라이빙을 경험하세요! 🎵**

*브라우저 내장 음성으로 어디서나 간편하게!*

</div>
