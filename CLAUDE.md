# AI 에이전트 지침

## 프로젝트 개요

대학교 수강신청 시스템 백엔드 API 서버

## 기술 스택

- TypeScript + Express + Node.js
- In-memory 데이터베이스

## 핵심 요구사항

1. 동시성 제어: 정원 초과 방지 필수
2. 최대 18학점 제한
3. 시간표 충돌 방지

## 코드 컨벤션

### 구조 및 선언
- Named Export 사용: 모든 모듈은 `export function` 또는 `export class` 형식 사용 (`export default` 금지)
- 기명 함수 사용: 내부 콜백을 제외한 모든 함수는 `function` 키워드 사용
- 제어문 중괄호 강제: 모든 `if`, `for`, `while` 등은 단 한 줄이라도 반드시 중괄호 `{}` 사용
- 1 파일 1 모듈: 하나의 파일에는 하나의 클래스 또는 관련 함수 그룹만 정의

### 책임 분리 (SoC)
- Controller: 요청/응답 처리만 담당, 비즈니스 로직 금지
- Service: 비즈니스 로직 처리, 트랜잭션 관리
- Repository: 데이터 접근만 담당, 비즈니스 로직 금지
- 설계 전 역할 정의: 코드 작성 전 각 레이어의 책임을 명확히 정의

### 네이밍 및 타입
- camelCase 사용
- Boolean 변수: `is`, `has`, `should`, `can` 접두사 사용
- 한 글자 변수 금지: map, filter 콜백에서도 `user`, `item` 등 명확한 명칭 사용
- Strict Typing: `any` 사용 절대 금지
- 주석은 꼭 필요한 경우에만 한국어로 작성

### 에러 핸들링
- 모든 API 엔드포인트에 적절한 에러 응답 구현
- HTTP 상태 코드 정확히 사용 (4xx, 5xx)
- 에러 메시지는 클라이언트가 이해할 수 있도록 명확하게 작성

### 상수 관리
- 모든 매직 스트링과 도메인 데이터는 `src/constants/` 폴더에 분리

## 작업 흐름

### 설계 우선 (Plan First)
- 코딩 시작 전 전체적인 구조와 데이터 흐름에 대한 설계를 먼저 제안하고 승인받음

### 문서화
- 한 단위의 작업 완료 시 `README.md` 및 `CLAUDE.md` 최신화
- 중요한 설계 결정 사항은 `docs/REQUIREMENTS.md`에 기록

### 커밋 규칙
- Conventional Commits 규칙 준수 (feat, fix, docs, refactor 등)
- AI 서명(Co-Authored-By) 제외
- 제목과 본문만 작성

## 디렉토리 구조

- src/routes: 라우트 정의
- src/controllers: 요청/응답 처리
- src/services: 비즈니스 로직
- src/models: 데이터 모델
- src/repositories: 데이터 접근 계층
- src/constants: 상수 및 도메인 데이터
- src/middlewares: Express 미들웨어
- src/utils: 유틸리티 함수
- src/types: TypeScript 타입 정의

---

## 작업 진행 상황

### Phase 1: 프로젝트 설정

- [x] 요구사항 분석
- [x] 기술 스택 결정
- [x] 프로젝트 초기 설정 (package.json, tsconfig.json)
- [x] README.md 작성
- [x] CLAUDE.md 작성
- [x] docs/REQUIREMENTS.md 기술 스택 섹션 작성

### Phase 2: 핵심 구조 구현

- [ ] 데이터 모델 정의 (types, models)
- [ ] 인메모리 DB 구현 (repositories)
- [ ] 초기 데이터 생성 로직

### Phase 3: API 구현

- [ ] Express 앱 설정 (app.ts)
- [ ] 헬스체크 API (GET /health)
- [ ] 학생 API (GET /students)
- [ ] 교수 API (GET /professors)
- [ ] 강좌 API (GET /courses)
- [ ] 수강신청 API (POST /enrollments)
- [ ] 수강취소 API (DELETE /enrollments/:id)
- [ ] 내 시간표 API (GET /students/:id/enrollments)

### Phase 4: 비즈니스 로직

- [ ] 동시성 제어 (async-mutex)
- [ ] 정원 초과 검증
- [ ] 학점 제한 검증 (18학점)
- [ ] 시간표 충돌 검증

### Phase 5: 테스트 및 문서화

- [ ] Jest 설정
- [ ] 동시성 테스트 작성
- [ ] 비즈니스 로직 테스트 작성
- [ ] docs/API.md 작성
- [ ] docs/REQUIREMENTS.md 완성
