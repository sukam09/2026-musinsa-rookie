# API 문서

## Base URL

```
http://localhost:3000
```

## 공통 응답 형식

### 성공 응답

- 상태 코드: 200 OK
- 본문: 요청에 따라 JSON 객체 또는 배열

### 에러 응답

- 상태 코드: 4xx/5xx
- 본문 형식:
  ```
  {
    "message": "에러 메시지"
  }
  ```

## 엔드포인트

### Health Check

**GET /health**

서버 상태를 확인합니다.

- 응답: `200 OK`
  ```
  { "status": "ok" }
  ```

### 학생 API

**GET /students**

학생 목록을 조회합니다. `departmentId`로 학과별 필터링이 가능합니다.

#### Query Parameters

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| departmentId | number | 선택 | 학과 ID (양의 정수) |

#### 성공 응답

- 상태 코드: `200 OK`
- 응답 예시:
  ```
  [
    {
      "id": 1,
      "name": "김민준",
      "departmentId": 1,
      "grade": 1
    }
  ]
  ```

#### 에러 응답

- `400 Bad Request`: `departmentId`가 양의 정수가 아닌 경우
  ```
  { "message": "departmentId는 양의 정수여야 합니다." }
  ```

### 강좌 API

**GET /courses**

강좌 목록을 조회합니다. `departmentId`로 학과별 필터링이 가능합니다.

#### Query Parameters

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| departmentId | number | 선택 | 학과 ID (양의 정수) |

#### 성공 응답

- 상태 코드: `200 OK`
- 응답 예시:
  ```
  [
    {
      "id": 1,
      "name": "자료구조 1",
      "professorId": 1,
      "departmentId": 1,
      "credits": 3,
      "capacity": 30,
      "enrolled": 0,
      "schedule": ["MON_1", "WED_1"]
    }
  ]
  ```

#### 에러 응답

- `400 Bad Request`: `departmentId`가 양의 정수가 아닌 경우
  ```
  { "message": "departmentId는 양의 정수여야 합니다." }
  ```

### 교수 API

**GET /professors**

교수 목록을 조회합니다. `departmentId`로 학과별 필터링이 가능합니다.

#### Query Parameters

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| departmentId | number | 선택 | 학과 ID (양의 정수) |

#### 성공 응답

- 상태 코드: `200 OK`
- 응답 예시:
  ```
  [
    {
      "id": 1,
      "name": "김영훈",
      "departmentId": 1
    }
  ]
  ```

#### 에러 응답

- `400 Bad Request`: `departmentId`가 양의 정수가 아닌 경우
  ```
  { "message": "departmentId는 양의 정수여야 합니다." }
  ```

### 수강신청 API

**POST /enrollments**

수강신청을 생성합니다. (1차 구현: 기본 검증 및 중복 방지)

#### 요청 바디

```
{
  "studentId": 1,
  "courseId": 1
}
```

#### 성공 응답

- 상태 코드: `201 Created`
- 응답 예시:
  ```
  {
    "id": 1,
    "studentId": 1,
    "courseId": 1,
    "enrolledAt": "2026-02-08T09:00:00.000Z"
  }
  ```

#### 에러 응답

- `400 Bad Request`: `studentId` 또는 `courseId`가 양의 정수가 아닌 경우
  ```
  { "message": "studentId는 양의 정수여야 합니다." }
  ```
- `404 Not Found`: 학생 또는 강좌가 존재하지 않는 경우
  ```
  { "message": "학생을 찾을 수 없습니다." }
  ```
  ```
  { "message": "강좌를 찾을 수 없습니다." }
  ```
- `409 Conflict`: 동일 학생이 동일 강좌를 중복 신청한 경우
  ```
  { "message": "이미 수강신청된 강좌입니다." }
  ```

**DELETE /enrollments/:id**

수강신청을 취소합니다.

#### Path Parameters

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | 필수 | 수강신청 ID (양의 정수) |

#### 성공 응답

- 상태 코드: `200 OK`
- 응답 예시:
  ```
  {
    "id": 1,
    "studentId": 10,
    "courseId": 10,
    "enrolledAt": "2026-02-08T09:00:00.000Z"
  }
  ```

#### 에러 응답

- `400 Bad Request`: `id`가 양의 정수가 아닌 경우
  ```
  { "message": "enrollmentId는 양의 정수여야 합니다." }
  ```
- `404 Not Found`: 수강신청 내역이 존재하지 않는 경우
  ```
  { "message": "수강신청을 찾을 수 없습니다." }
  ```

### 시간표 API

**GET /students/:id/enrollments**

학생의 시간표(수강 내역)를 조회합니다.

#### Path Parameters

| 이름 | 타입 | 필수 | 설명 |
|------|------|------|------|
| id | number | 필수 | 학생 ID (양의 정수) |

#### 성공 응답

- 상태 코드: `200 OK`
- 응답 스키마 (옵션 B)
  - 배열 요소 예시:
  ```
  {
    "enrollmentId": 1,
    "studentId": 10,
    "course": {
      "id": 25,
      "name": "자료구조 1",
      "credits": 3,
      "departmentId": 1,
      "professorId": 7,
      "schedule": ["MON_1", "WED_1"]
    },
    "enrolledAt": "2026-02-08T09:00:00.000Z"
  }
  ```
- 여러 항목이 있을 때의 응답 예시:
  ```
  [
    {
      "enrollmentId": 1,
      "studentId": 10,
      "course": {
        "id": 25,
        "name": "자료구조 1",
        "credits": 3,
        "departmentId": 1,
        "professorId": 7,
        "schedule": ["MON_1", "WED_1"]
      },
      "enrolledAt": "2026-02-08T09:00:00.000Z"
    },
    {
      "enrollmentId": 2,
      "studentId": 10,
      "course": {
        "id": 31,
        "name": "운영체제 1",
        "credits": 3,
        "departmentId": 1,
        "professorId": 12,
        "schedule": ["TUE_2", "THU_2"]
      },
      "enrolledAt": "2026-02-08T10:00:00.000Z"
    }
  ]
  ```

#### 정렬 기준

- 시간표 순(요일/교시 기준)으로 정렬

#### 에러 응답

- `400 Bad Request`: `id`가 양의 정수가 아닌 경우
  ```
  { "message": "studentId는 양의 정수여야 합니다." }
  ```
- `404 Not Found`: 학생이 존재하지 않는 경우
  ```
  { "message": "학생을 찾을 수 없습니다." }
  ```
