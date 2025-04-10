# Kakao REST API Node.js 예제

이 프로젝트는 Kakao REST API를 Node.js로 구현한 예제입니다.

## 주요 기능

- 카카오 로그인
- 사용자 정보 가져오기
- 친구 목록 가져오기
- 나에게 메시지 발송
- 친구에게 메시지 발송
- 로그아웃
- 연결 끊기

## 프로젝트 구조
```
.
│
├── index.html # 메인 HTML 파일
└── style.css # 스타일시트
├── app.js # 메인 애플리케이션 파일
├── package.json # 프로젝트 메타데이터 및 의존성
└── README.md # 프로젝트 설명 파일
```


## 설치 방법

1. 프로젝트 클론
```bash
git clone [repository-url]
cd [project-directory]
```

2. 의존성 설치
```bash
npm install
```

3. 카카오 개발자 설정
- [Kakao Developers](https://developers.kakao.com)에서 애플리케이션 생성
- `app.js`의 `client_id`를 발급받은 REST API 키로 변경
- 카카오 로그인 활성화 설정
- Redirect URI 설정: `http://localhost:4000/redirect`

4. 서버 실행
```bash
npm start
```

## 사용 방법

1. 브라우저에서 `http://localhost` 접속
2. 카카오 로그인 버튼 클릭
3. 각 기능 버튼을 통해 API 테스트

## 주의사항

- 카카오 로그인 Redirect URI가 정확히 설정되어 있어야 합니다.
- 친구 목록 조회와 메시지 발송을 위해서는 추가 동의가 필요합니다.

## 의존성

- express: ^4.18.2
- express-session: ^1.17.3
- qs: ^6.11.2
- axios: ^1.6.7

## 스크린샷
![image](https://github.com/user-attachments/assets/a64d2a83-c036-4cb2-88e5-07bba3890ec3)

