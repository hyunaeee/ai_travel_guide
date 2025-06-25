class RouteStoryAgentReal {
            constructor() {
                this.isActive = false;
                this.monitoringInterval = null;
                this.currentLocation = "강남역";
                this.locationIndex = 0;
                this.locations = ["강남역", "한강대교", "남산타워", "명동"];
                this.actionHistory = [];
                this.apiKey = null;
                this.speechEnabled = true; // 음성 출력 활성화
                this.currentSpeech = null; // 현재 재생 중인 음성
                this.setupEventListeners();
            }

            setupEventListeners() {
                // API 키 입력 감지
                document.getElementById('api-key').addEventListener('input', (e) => {
                    this.apiKey = e.target.value.trim();
                    const startBtn = document.getElementById('start-btn');

                    if (this.apiKey.length > 10) {
                        startBtn.disabled = false;
                        document.getElementById('brain-status').textContent = 'API 연결 준비 완료';
                        this.logAction('info', 'Gemini API 키가 설정되었습니다');
                    } else {
                        startBtn.disabled = true;
                        document.getElementById('brain-status').textContent = 'API 키 입력 대기 중...';
                    }
                });

                // 음성 설정 이벤트
                document.getElementById('speech-enabled').addEventListener('change', (e) => {
                    this.speechEnabled = e.target.checked;
                    this.logAction('info', `음성 출력 ${this.speechEnabled ? '활성화' : '비활성화'}`);

                    if (!this.speechEnabled && this.currentSpeech) {
                        speechSynthesis.cancel();
                        this.currentSpeech = null;
                    }
                });

                // 음성 속도 조절
                document.getElementById('speech-rate').addEventListener('input', (e) => {
                    const rate = parseFloat(e.target.value);
                    document.getElementById('rate-value').textContent = `${rate}x`;
                });

                this.simulateLocationChange();
            }

            simulateLocationChange() {
                setInterval(() => {
                    if (this.isActive) {
                        this.locationIndex = (this.locationIndex + 1) % this.locations.length;
                        this.currentLocation = this.locations[this.locationIndex];
                        document.getElementById('current-location').textContent = this.currentLocation;
                        this.logAction('info', `위치 변경: ${this.currentLocation}`);
                    }
                }, 20000); // 20초마다 위치 변경
            }

            async start() {
                if (!this.apiKey) {
                    alert('Gemini API 키를 먼저 입력해주세요!');
                    return;
                }

                this.isActive = true;
                document.getElementById('start-btn').style.display = 'none';
                document.getElementById('stop-btn').style.display = 'inline-block';
                document.getElementById('brain-status').innerHTML = 'Gemini AI 연결 중 <div class="thinking-dots"><span>●</span><span>●</span><span>●</span></div>';

                this.logAction('info', 'AI Agent 시작됨 (Gemini 2.0 Flash 연동)');

                // API 연결 테스트
                const testResult = await this.testGeminiConnection();
                if (!testResult.success) {
                    this.logAction('error', `API 연결 실패: ${testResult.error}`);
                    this.stop();
                    return;
                }

                this.logAction('info', 'Gemini 2.0 Flash API 연결 성공!');

                this.monitoringInterval = setInterval(() => {
                    this.autonomousDecision();
                }, 45000); // 45초마다 실행 (이야기 재생 시간 고려)

                setTimeout(() => this.autonomousDecision(), 2000);
            }

            stop() {
                this.isActive = false;
                clearInterval(this.monitoringInterval);

                // 음성 중단
                if (this.currentSpeech) {
                    speechSynthesis.cancel();
                    this.currentSpeech = null;
                    this.logAction('info', '음성 재생 중단됨');
                }

                document.getElementById('start-btn').style.display = 'inline-block';
                document.getElementById('stop-btn').style.display = 'none';
                document.getElementById('brain-status').textContent = 'AI Agent 정지됨';

                this.logAction('info', 'AI Agent 정지됨');
            }

            async testGeminiConnection() {
                try {
                    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;

                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: "Hello, this is a connection test."
                                }]
                            }]
                        })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        return {
                            success: false,
                            error: `HTTP ${response.status}: ${errorData.error?.message || 'Unknown error'}`
                        };
                    }

                    return { success: true };

                } catch (error) {
                    return {
                        success: false,
                        error: `Network error: ${error.message}`
                    };
                }
            }

            async autonomousDecision() {
                if (!this.isActive) return;

                try {
                    this.logAction('info', '상황 분석 시작...');
                    document.getElementById('brain-status').innerHTML = 'Gemini가 상황 분석 중 <div class="thinking-dots"><span>●</span><span>●</span><span>●</span></div>';

                    const context = await this.gatherContext();
                    this.updateContextDisplay(context);

                    await this.delay(1000);
                    this.logAction('decision', 'Gemini AI 의사결정 요청 중...');
                    document.getElementById('brain-status').innerHTML = 'Gemini AI 사고 중 <div class="thinking-dots"><span>●</span><span>●</span><span>●</span></div>';

                    const decision = await this.callGeminiForDecision(context);
                    this.updateDecisionDisplay(decision);

                    await this.delay(1000);
                    this.logAction('action', `AI 결정: ${decision.action} - ${decision.reason}`);
                    document.getElementById('brain-status').textContent = 'Gemini AI 실행 중...';

                    await this.executeAction(decision);

                    document.getElementById('brain-status').innerHTML = 'Gemini AI 모니터링 중 <div class="thinking-dots"><span>●</span><span>●</span><span>●</span></div>';

                } catch (error) {
                    this.logAction('error', `AI 처리 중 오류: ${error.message}`);
                    document.getElementById('brain-status').textContent = 'AI 오류 발생 - 재시도 대기 중...';

                    const errorCard = document.getElementById('decision-card');
                    errorCard.className = 'status-card error';
                    document.getElementById('decision-content').innerHTML = `
                        <strong>오류 발생:</strong><br>
                        ${error.message}<br>
                        <div class="error-message">다음 주기에 재시도합니다...</div>
                    `;
                }
            }

            async gatherContext() {
                const currentTime = new Date();
                const hour = currentTime.getHours();
                const trafficConditions = ['원활', '보통', '혼잡'];
                const randomTraffic = trafficConditions[Math.floor(Math.random() * 3)];

                return {
                    location: this.currentLocation,
                    time: hour,
                    traffic: randomTraffic,
                    speed: Math.floor(Math.random() * 40) + 20,
                    lastAction: this.actionHistory[this.actionHistory.length - 1]?.action || '없음',
                    weather: '맑음', // 실제로는 날씨 API 연동 가능
                    dayOfWeek: ['일', '월', '화', '수', '목', '금', '토'][currentTime.getDay()]
                };
            }

            updateContextDisplay(context) {
                document.getElementById('context-content').innerHTML = `
                    <strong>위치:</strong> ${context.location}<br>
                    <strong>시간:</strong> ${context.time}시 (${context.dayOfWeek}요일)<br>
                    <strong>교통상황:</strong> ${context.traffic}<br>
                    <strong>속도:</strong> ${context.speed}km/h<br>
                    <strong>날씨:</strong> ${context.weather}<br>
                    <strong>이전 행동:</strong> ${context.lastAction}
                `;
            }

            async callGeminiForDecision(context) {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;

                const prompt = `
당신은 RouteStory AI Agent입니다. 운전자의 현재 상황을 분석하여 최적의 행동을 결정해주세요.

현재 상황:
- 위치: ${context.location}
- 시간: ${context.time}시 (${context.dayOfWeek}요일)
- 교통상황: ${context.traffic}
- 속도: ${context.speed}km/h
- 날씨: ${context.weather}
- 이전 행동: ${context.lastAction}

다음 중 하나를 선택하고, 반드시 JSON 형태로만 응답해주세요:

1. STORY - 현재 위치의 흥미로운 역사나 문화 이야기 제공
2. WAIT - 복잡한 교통상황이므로 조용히 대기
3. SUGGEST - 맛집, 관광지, 편의시설 추천
4. SAFETY - 안전 운전 관련 조언 제공

응답 형식 (반드시 이 형식으로만 답변):
{
  "action": "선택한 행동",
  "reason": "선택한 이유를 상세히 설명",
  "confidence": 신뢰도(0-100 숫자)
}

운전자의 안전을 최우선으로 고려하여 판단해주세요.
                `;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 300
                        }
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Gemini API Error: ${errorData.error?.message || 'Unknown error'}`);
                }

                const data = await response.json();
                const aiResponse = data.candidates[0].content.parts[0].text;

                try {
                    // JSON 파싱 시도
                    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
                    if (jsonMatch) {
                        return JSON.parse(jsonMatch[0]);
                    } else {
                        throw new Error('JSON 형식을 찾을 수 없음');
                    }
                } catch (parseError) {
                    // JSON 파싱 실패 시 텍스트에서 정보 추출
                    return this.parseGeminiResponse(aiResponse);
                }
            }

            parseGeminiResponse(text) {
                const actionMatch = text.match(/(?:action|행동)["\s]*:?\s*["\s]*([A-Z]+)/i);
                const reasonMatch = text.match(/(?:reason|이유)["\s]*:?\s*["\s]*([^",}]+)/i);
                const confidenceMatch = text.match(/(?:confidence|신뢰도)["\s]*:?\s*(\d+)/i);

                return {
                    action: actionMatch ? actionMatch[1].toUpperCase() : 'STORY',
                    reason: reasonMatch ? reasonMatch[1].trim().replace(/['"]/g, '') : 'Gemini AI가 상황에 적합한 행동을 선택했습니다.',
                    confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : 85
                };
            }

            updateDecisionDisplay(decision) {
                document.getElementById('decision-content').innerHTML = `
                    <strong>Gemini 결정:</strong> ${decision.action}<br>
                    <strong>AI 분석:</strong> ${decision.reason}<br>
                    <strong>신뢰도:</strong> ${decision.confidence}%
                `;

                const card = document.getElementById('decision-card');
                card.className = 'status-card acting';
            }

            async executeAction(decision) {
                this.actionHistory.push({
                    timestamp: new Date(),
                    action: decision.action,
                    location: this.currentLocation,
                    reason: decision.reason
                });

                const storyOutput = document.getElementById('story-output');
                const storyContent = document.getElementById('story-content');

                switch (decision.action) {
                    case 'STORY':
                        storyOutput.style.display = 'block';
                        document.getElementById('story-title').textContent = `📖 ${this.currentLocation}의 AI 생성 이야기`;

                        try {
                            const aiStory = await this.generateStoryWithGemini(this.currentLocation);
                            this.typeWriterWithSpeech(storyContent, aiStory);
                        } catch (error) {
                            this.logAction('error', `스토리 생성 실패: ${error.message}`);
                            const errorMsg = `죄송합니다. ${this.currentLocation}에 대한 이야기를 생성하는 중 오류가 발생했습니다.`;
                            storyContent.textContent = errorMsg;
                            if (this.speechEnabled) {
                                this.speakText(errorMsg);
                            }
                        }
                        break;

                    case 'SUGGEST':
                        storyOutput.style.display = 'block';
                        document.getElementById('story-title').textContent = `🎯 ${this.currentLocation} AI 추천`;

                        try {
                            const suggestion = await this.generateSuggestionWithGemini(this.currentLocation);
                            this.typeWriterWithSpeech(storyContent, suggestion);
                        } catch (error) {
                            this.logAction('error', `추천 생성 실패: ${error.message}`);
                            const errorMsg = `${this.currentLocation} 근처 추천 정보를 생성하는 중 오류가 발생했습니다.`;
                            storyContent.textContent = errorMsg;
                            if (this.speechEnabled) {
                                this.speakText(errorMsg);
                            }
                        }
                        break;

                    case 'SAFETY':
                        storyOutput.style.display = 'block';
                        document.getElementById('story-title').textContent = `⚠️ AI 안전 조언`;

                        try {
                            const safetyTip = await this.generateSafetyTipWithGemini();
                            this.typeWriterWithSpeech(storyContent, safetyTip);
                        } catch (error) {
                            this.logAction('error', `안전 조언 생성 실패: ${error.message}`);
                            const errorMsg = "안전 운전을 위해 충분한 안전거리를 유지하고 전방을 주시해주세요.";
                            storyContent.textContent = errorMsg;
                            if (this.speechEnabled) {
                                this.speakText(errorMsg);
                            }
                        }
                        break;

                    case 'WAIT':
                        storyOutput.style.display = 'block';
                        document.getElementById('story-title').textContent = `🤐 AI 대기 모드`;
                        const waitMsg = decision.reason || "현재 상황을 고려하여 잠시 조용히 대기하겠습니다.";
                        storyContent.textContent = waitMsg;
                        if (this.speechEnabled) {
                            this.speakText(waitMsg);
                        }
                        break;
                }
            }

            async generateStoryWithGemini(location) {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;

                const prompt = `
${location}에 대한 흥미로운 역사적 이야기를 운전자를 위해 들려주세요.

요구사항:
- 읽는 시간 30초 분량 (약 300-400자, 충분히 길게 작성)
- 운전 중 듣기 좋게 자연스럽고 재미있게
- 역사적 사실이나 문화적 배경 기반
- 구체적인 에피소드나 흥미로운 세부사항 포함
- 너무 복잡하지 않게, 쉽게 이해할 수 있도록
- 한국어로 작성
- 이야기만 작성하고 다른 설명은 포함하지 마세요
- 최소 300자 이상으로 충분히 자세하게 작성해주세요

위치: ${location}
                `;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.8,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 600  // 더 긴 이야기를 위해 토큰 수 증가
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`스토리 생성 API 오류: ${response.status}`);
                }

                const data = await response.json();
                return data.candidates[0].content.parts[0].text.trim();
            }

            async generateSuggestionWithGemini(location) {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;

                const prompt = `
${location} 근처의 맛집이나 관광지, 편의시설을 추천해주세요.

요구사항:
- 운전자에게 유용한 정보 위주
- 구체적인 장소명과 간단한 설명
- 30초 분량으로 간결하게
- 추천 이유도 함께 포함
- 한국어로 작성

위치: ${location}
                `;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            maxOutputTokens: 300
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`추천 생성 API 오류: ${response.status}`);
                }

                const data = await response.json();
                return data.candidates[0].content.parts[0].text.trim();
            }

            async generateSafetyTipWithGemini() {
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`;

                const prompt = `
운전자를 위한 안전 운전 조언을 해주세요.

요구사항:
- 현재 상황에 맞는 실용적인 안전 팁
- 30초 분량으로 간결하게
- 구체적이고 실행 가능한 조언
- 한국어로 작성

일반적인 안전 조언보다는 상황별 맞춤 조언을 부탁드립니다.
                `;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.6,
                            maxOutputTokens: 250
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error(`안전 조언 생성 API 오류: ${response.status}`);
                }

                const data = await response.json();
                return data.candidates[0].content.parts[0].text.trim();
            }

            // 음성 출력 함수
            speakText(text, options = {}) {
                if (!this.speechEnabled) {
                    this.logAction('info', '음성 출력이 비활성화되어 있습니다');
                    return;
                }

                // 이전 음성 중단
                if (this.currentSpeech) {
                    speechSynthesis.cancel();
                }

                // Web Speech API 지원 확인
                if (!('speechSynthesis' in window)) {
                    this.logAction('error', '이 브라우저는 음성 출력을 지원하지 않습니다');
                    return;
                }

                const utterance = new SpeechSynthesisUtterance(text);

                // 음성 설정
                utterance.lang = options.lang || 'ko-KR';
                utterance.rate = parseFloat(document.getElementById('speech-rate').value) || 1.0;
                utterance.pitch = options.pitch || 1.0;
                utterance.volume = options.volume || 1.0;

                // 한국어 음성 찾기
                const voices = speechSynthesis.getVoices();
                const koreanVoice = voices.find(voice =>
                    voice.lang.startsWith('ko') || voice.name.includes('Korean')
                );

                if (koreanVoice) {
                    utterance.voice = koreanVoice;
                    this.logAction('info', `한국어 음성 사용: ${koreanVoice.name}`);
                } else {
                    this.logAction('info', '기본 음성으로 재생');
                }

                // 이벤트 리스너
                utterance.onstart = () => {
                    this.logAction('info', '🔊 음성 재생 시작');
                    this.currentSpeech = utterance;
                };

                utterance.onend = () => {
                    this.logAction('info', '🔇 음성 재생 완료');
                    this.currentSpeech = null;
                };

                utterance.onerror = (event) => {
                    this.logAction('error', `음성 재생 오류: ${event.error}`);
                    this.currentSpeech = null;
                };

                // 음성 재생
                speechSynthesis.speak(utterance);

                return utterance;
            }

            typeWriterWithSpeech(element, text) {
                element.textContent = '';

                // 먼저 음성 재생
                this.speakText(text);

                // 그 다음 타이핑 효과 (음성과 동시에)
                let i = 0;
                const targetDuration = 30000; // 30초
                const typingSpeed = Math.max(targetDuration / text.length, 50);

                this.logAction('info', `이야기 표시 시작 (음성과 함께)`);

                const timer = setInterval(() => {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                        this.logAction('info', '이야기 표시 완료');
                    }
                }, typingSpeed);
            }

            logAction(type, message) {
                const log = document.getElementById('agent-log');
                const timestamp = new Date().toLocaleTimeString();
                const entry = document.createElement('div');
                entry.className = `log-entry log-${type}`;
                entry.textContent = `[${timestamp}] ${message}`;
                log.appendChild(entry);
                log.scrollTop = log.scrollHeight;
            }

            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }

        const agent = new RouteStoryAgentReal();

        function startAgent() {
            agent.start();
        }

        function stopAgent() {
            agent.stop();
        }

        function testSpeech() {
            const testText = "안녕하세요! RouteStory AI Agent 음성 테스트입니다.";
            agent.speakText(testText);
        }

        // 음성 목록 로드 (페이지 로드 후)
        window.addEventListener('load', () => {
            document.getElementById('current-location').textContent = agent.currentLocation;

            // 음성 목록 로드 대기
            if ('speechSynthesis' in window) {
                speechSynthesis.onvoiceschanged = () => {
                    const voices = speechSynthesis.getVoices();
                    const koreanVoices = voices.filter(voice =>
                        voice.lang.startsWith('ko') || voice.name.includes('Korean')
                    );

                    if (koreanVoices.length > 0) {
                        agent.logAction('info', `${koreanVoices.length}개의 한국어 음성을 찾았습니다`);
                    } else {
                        agent.logAction('info', '한국어 음성을 찾지 못했습니다. 기본 음성을 사용합니다');
                    }
                };
            }
        });