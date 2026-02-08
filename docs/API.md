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

### 시간표 API
