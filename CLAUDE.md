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

### 프롬프트 기록
- 한 단위의 작업 완료 시 사용자가 입력한 프롬프트를 `prompts/` 폴더에 마크다운 파일로 추출
- 파일명: `XX-작업명.md` 형식 (예: `02-data-model.md`)
- 내용: 해당 작업에서 사용자가 입력한 프롬프트 원문 기록

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

### Phase 1: 프로젝트 설정 ✅

- [x] 요구사항 분석
- [x] 기술 스택 결정
- [x] 프로젝트 초기 설정 (package.json, tsconfig.json)
- [x] README.md 작성
- [x] CLAUDE.md 작성
- [x] docs/REQUIREMENTS.md 기술 스택 섹션 작성

### Phase 2: 핵심 구조 구현 ✅

- [x] 데이터 모델 정의 → `src/types/index.ts`, `src/constants/*.ts`
- [x] 인메모리 DB 구현 → `src/db/database.ts` (싱글톤), `src/repositories/*.ts`
- [x] 초기 데이터 생성 로직 → `src/db/seed.ts` (결정론적 생성)

### Phase 3: API 구현 🔄

- [x] Express 앱 설정 → `src/app.ts`
- [x] 헬스체크 API (GET /health)
- [x] **seed() 호출 연결** → `src/index.ts`에서 seed() import 및 호출 완료
- [x] 학생 API (GET /students)
- [x] 교수 API (GET /professors)
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

- [x] Jest 설정
- [x] 헬스체크 테스트 작성
- [x] 학생 목록 테스트 작성
- [x] 교수 목록 테스트 작성
- [ ] 동시성 테스트 작성
- [ ] 비즈니스 로직 테스트 작성
- [ ] docs/API.md 작성
- [ ] docs/REQUIREMENTS.md 완성

---

## 에이전트 인수인계 (Claude Code → Codex)

### 즉시 해야 할 작업

1. **seed() 호출 연결**: `src/index.ts`에서 seed 함수를 import하고 서버 시작 전에 호출해야 함
   ```typescript
   import { seed } from './db/seed';
   seed();
   ```

2. **서버 실행 테스트**: `npm run dev`로 서버 시작 후 `GET /health` 응답 확인

### 구현된 파일 구조

```
src/
├── app.ts              # Express 앱 설정, 헬스체크 API
├── index.ts            # 서버 시작점 (seed 호출 필요)
├── types/index.ts      # 엔티티 타입 정의
├── constants/          # 상수 데이터
│   ├── departments.ts  # 10개 학과명
│   ├── names.ts        # 성/이름 목록
│   ├── courses.ts      # 학과별 강좌명
│   └── schedule.ts     # 요일/교시 정의
├── db/
│   ├── database.ts     # 싱글톤 인메모리 DB (Map 기반)
│   └── seed.ts         # 초기 데이터 생성 (결정론적)
└── repositories/       # 데이터 접근 계층
    ├── departmentRepository.ts
    ├── professorRepository.ts
    ├── studentRepository.ts
    ├── courseRepository.ts
    └── enrollmentRepository.ts
```

### 참고 문서

- 설계 결정 사항: `docs/REQUIREMENTS.md`
- 데이터 규모: 10개 학과, 100명 교수, 10,000명 학생, 500개 강좌
