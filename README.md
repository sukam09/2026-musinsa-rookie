# 대학교 수강신청 시스템

> 동시성 제어를 통해 정원 초과를 방지하는 수강신청 REST API 서버

## 프로젝트 소개

매 학기 수강신청 기간마다 발생하는 서버 다운과 정원 초과 문제를 해결하기 위한 백엔드 시스템입니다.
**정원이 1명 남은 강좌에 100명이 동시에 신청해도, 정확히 1명만 성공**하도록 설계되었습니다.

## 구현 기능

| 기능 | 설명 | 엔드포인트 |
|------|------|-----------|
| 헬스체크 | 서버 상태 확인 | `GET /health` |
| 학생 목록 조회 | 전체 학생 목록 | `GET /students` |
| 강좌 목록 조회 | 전체/학과별 강좌 목록 | `GET /courses` |
| 교수 목록 조회 | 전체 교수 목록 | `GET /professors` |
| 수강신청 | 강좌 등록 (기본 검증) | `POST /enrollments` |
| 수강취소 | 강좌 취소 | `DELETE /enrollments/:id` |
| 내 시간표 조회 | 학생별 수강 목록 | `GET /students/:id/enrollments` |

## 핵심 기술적 결정 사항

> 상세한 의사결정 근거는 [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md)를 참고하세요.

| 결정 사항 | 선택 | 핵심 근거 |
|----------|------|----------|
| 언어 | TypeScript | 타입 안전성으로 런타임 에러 방지, 엔티티 관계 명확화 |
| 프레임워크 | Express | 경량, 빠른 설정, 과제 규모에 적합 |
| 데이터베이스 | 인메모리 (Map) | 설치 불필요, 평가 환경 고려, 데이터 규모(~10MB) 충분히 처리 |
| 동시성 제어 | async-mutex | 강좌별 락으로 정원 초과 방지, 코드 레벨에서 명확한 제어 |
| 테스트 | Jest | 동시성 테스트 지원, 풍부한 문서 |

## 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| Runtime | Node.js | 20.x |
| Language | TypeScript | 5.3.0 |
| Framework | Express | 4.18.2 |
| Database | In-memory (Map) | - |
| Test | Jest | - |

## 프로젝트 구조

```
├── README.md
├── CLAUDE.md
├── docs/
│   ├── REQUIREMENTS.md      # 요구사항 분석 및 설계 결정
│   └── API.md               # API 명세
├── src/
│   ├── index.ts             # 서버 진입점
│   ├── app.ts               # Express 앱 설정
│   ├── routes/              # API 라우트
│   ├── services/            # 비즈니스 로직
│   ├── models/              # 데이터 모델
│   └── database/            # 인메모리 저장소
├── __tests__/               # 테스트 코드
├── package.json
└── tsconfig.json
```

## 실행 방법

### 의존성 설치

```bash
npm install
```

### 개발 모드 실행

```bash
npm run dev
```

### 프로덕션 빌드 및 실행

```bash
npm run build
npm start
```

### 테스트 실행

```bash
npm test
```

## API 서버 정보

| 항목 | 값 |
|------|-----|
| Port | 3000 |
| Base URL | http://localhost:3000 |
| Health Check | GET /health |

> API 상세 명세는 [docs/API.md](docs/API.md)를 참고하세요.

## 개발 진행 상황

| Phase | 내용 | 상태 |
|-------|------|------|
| 1 | 프로젝트 설정 | ✅ 완료 |
| 2 | 핵심 구조 구현 | ✅ 완료 |
| 3 | API 구현 | ✅ 완료 |
| 4 | 비즈니스 로직 | ⏳ 대기 |
| 5 | 테스트 및 문서화 | 🔄 진행중 |

> 상세 진행 상황은 [CLAUDE.md](CLAUDE.md)를 참고하세요.
