# Test Coverage Analysis

**Date:** 2026-01-06
**Analyzed By:** Claude Code
**Branch:** claude/analyze-test-coverage-lnIwv

## Executive Summary

The codebase currently has **minimal test coverage** with only 2 test files covering the SES email provider. Critical business logic including OCR processing, company registration, authentication, form validation, and all React components have **zero test coverage**.

### Current State

- **Total TypeScript files:** ~85+ files
- **Files with tests:** 1 (SES email provider)
- **Estimated coverage:** < 5%
- **Test infrastructure:** ✅ Jest + React Testing Library configured

## Detailed Analysis

### 1. Services Layer (0% coverage) 🔴 CRITICAL

#### TextractService (`lib/services/ocr.ts`) - 500+ lines
**Complexity:** Very High | **Risk:** Critical | **Priority:** 🔴 P0

**Untested functionality:**
- OCR document processing (sync/async strategies)
- AWS Textract integration
- S3 file upload/download operations
- PDF and image file handling
- Key-value pair extraction from documents
- Date parsing (multiple format support)
- Address parsing and normalization
- Document type detection (INE, passport, license)
- RFC/CURP extraction with regex patterns
- Job polling mechanism with timeout handling

**Recommended tests:** 40+ test cases
```typescript
describe('TextractService', () => {
  describe('File Validation', () => {
    it('should accept supported image formats')
    it('should accept PDF files')
    it('should reject unsupported formats')
  })

  describe('Strategy Resolution', () => {
    it('should use sync strategy for small images')
    it('should use async strategy for PDF files')
    it('should use async strategy for files > 5MB')
  })

  describe('OCR Processing', () => {
    it('should extract key-value pairs from blocks')
    it('should extract document text')
    it('should build block map correctly')
  })

  describe('Date Parsing', () => {
    it('should parse DD/MM/YYYY format')
    it('should parse YYYY-MM-DD format')
    it('should parse textual dates (e.g., "12 de enero de 2024")')
    it('should handle invalid dates gracefully')
  })

  describe('Address Parsing', () => {
    it('should parse CSF formatted addresses')
    it('should extract postal codes')
    it('should handle incomplete addresses')
  })

  describe('Document Type Detection', () => {
    it('should detect INE documents')
    it('should detect passports')
    it('should detect licenses')
  })

  describe('Error Handling', () => {
    it('should handle UnsupportedDocumentException')
    it('should cleanup S3 files after processing')
    it('should timeout async jobs after max attempts')
  })
})
```

#### RegisterCompanyService (`lib/services/register-company.ts`) - 194 lines
**Complexity:** High | **Risk:** Critical | **Priority:** 🔴 P0

**Untested functionality:**
- File uploads to Supabase storage
- Database insertions (Company, CompanyStructure tables)
- Structure member document handling
- Data transformation and field removal
- Email notifications
- Transaction management

**Recommended tests:** 25+ test cases
```typescript
describe('RegisterCompanyService', () => {
  describe('File Upload', () => {
    it('should upload files to Supabase storage')
    it('should handle upload failures')
    it('should generate correct file paths')
    it('should upload structure member documents')
  })

  describe('Company Registration', () => {
    it('should persist company data successfully')
    it('should handle database errors')
    it('should remove irrelevant fields before insertion')
  })

  describe('Structure Members', () => {
    it('should persist structure members')
    it('should handle multiple members')
    it('should upload member documents')
    it('should handle member insertion errors')
  })
})
```

#### EmailService (`lib/services/email.ts`)
**Priority:** 🟢 P2 (Lower priority, likely thin wrapper)

### 2. Server Actions (0% coverage) 🔴 CRITICAL

#### Authentication (`lib/actions/auth.ts`)
**Complexity:** Medium | **Risk:** Critical | **Priority:** 🔴 P0

**Untested functionality:**
- User lookup and creation
- OTP email generation
- Supabase auth integration
- Error handling and user feedback

**Recommended tests:** 15+ test cases
```typescript
describe('Auth Actions', () => {
  describe('login', () => {
    it('should send OTP for existing user')
    it('should create user if not exists')
    it('should handle database errors')
    it('should handle auth errors')
    it('should return success message')
  })

  describe('logout', () => {
    it('should sign out user')
    it('should redirect to login page')
  })
})
```

#### Company Registration (`lib/actions/register-company.ts`)
**Priority:** 🔴 P0

#### OCR Actions (`lib/actions/ocr.ts`)
**Priority:** 🟡 P1

### 3. Custom Hooks (0% coverage) 🟡 HIGH

#### useRegistrationForm (`lib/hooks/useRegistrationForm.ts`) - 287 lines
**Complexity:** Very High | **Risk:** High | **Priority:** 🟡 P1

**Untested functionality:**
- Multi-step form state management
- Field validation with Zod schemas
- File upload handling
- Address synchronization (fiscal/operative)
- Error state management
- Step navigation logic
- Form submission flow

**Recommended tests:** 35+ test cases
```typescript
describe('useRegistrationForm', () => {
  describe('Form State', () => {
    it('should initialize with default values')
    it('should update form data on change')
    it('should handle select changes')
    it('should handle file uploads')
  })

  describe('Validation', () => {
    it('should validate step fields')
    it('should show field errors')
    it('should clear errors on valid input')
  })

  describe('Address Handling', () => {
    it('should sync addresses when checkbox checked')
    it('should allow different addresses')
  })

  describe('Step Navigation', () => {
    it('should advance to next step when valid')
    it('should block navigation when invalid')
    it('should allow going back')
  })

  describe('Submission', () => {
    it('should upload files before submission')
    it('should submit valid form data')
    it('should handle submission errors')
    it('should show success notification')
    it('should trigger fireworks on success')
  })
})
```

### 4. Domain Entities & Validation (0% coverage) 🟡 HIGH

#### Zod Schemas
**Files:** `company.ts`, `person.ts`, `address.ts`, `company-structure.ts`, `file-schema.ts`
**Priority:** 🟡 P1

**Recommended tests:** 50+ test cases
```typescript
describe('Company Schema', () => {
  it('should validate complete company data')
  it('should require nombre_compañia')
  it('should validate email format')
  it('should validate CLABE format (18 digits)')
  it('should validate RFC format')
  it('should validate document type enum')
  it('should validate nested address objects')
  it('should validate estructura_societaria array')
  it('should provide clear error messages')
})

describe('Address Schema', () => {
  it('should validate complete address')
  it('should require direccion field')
  it('should validate postal code format')
})

describe('File Schema', () => {
  it('should accept File objects')
  it('should accept string paths')
  it('should reject other types')
})
```

### 5. React Components (0% coverage) 🟢 MEDIUM

**Total components:** 51 files
**Priority:** 🟢 P2-P3 (varies by component)

#### High Priority Components
- `components/login-form.tsx` - 🟡 P1
- `components/register_company/registration-form.tsx` - 🟡 P1
- `components/dashboard/dashboard-view.tsx` - 🟢 P2

#### Medium Priority Components
- `components/landing/*` (4 files) - 🟢 P2
- `components/dashboard/*` (2 files) - 🟢 P2
- `components/register_company/steps/*` (6 files) - 🟢 P2

#### Lower Priority Components
- `components/ui/*` (24 files) - 🟢 P3

**Recommended tests:** 80-100 test cases total

**Example test structure:**
```typescript
describe('LoginForm', () => {
  it('should render email input')
  it('should validate email format')
  it('should disable submit when invalid')
  it('should show loading state')
  it('should display error messages')
  it('should call login action on submit')
})

describe('RegistrationForm', () => {
  it('should render initial step')
  it('should navigate between steps')
  it('should persist data across steps')
  it('should validate each step')
  it('should upload files')
  it('should submit complete form')
})
```

### 6. Providers (25% coverage) 🟢 MEDIUM

#### Tested
- ✅ `lib/providers/ses-email-provider.ts` (unit + integration tests)

#### Untested
- `lib/providers/aws.ts` - AWS client configuration - 🟢 P2
- `lib/providers/supabase/client.ts` - Browser client - 🟢 P2
- `lib/providers/supabase/server.ts` - Server client - 🟢 P2
- `lib/providers/supabase/proxy.ts` - Proxy client - 🟢 P3

**Recommended tests:** 20+ test cases
```typescript
describe('AwsClient', () => {
  it('should initialize with env variables')
  it('should create S3 client')
  it('should create SES client')
  it('should create Textract client')
  it('should handle missing configuration')
})
```

### 7. Utilities (0% coverage) 🟢 LOW

**Files:** `lib/utils.ts`
**Priority:** 🟢 P3

**Recommended tests:** 5-10 test cases
```typescript
describe('utils', () => {
  describe('cn', () => {
    it('should merge class names')
    it('should handle conditional classes')
    it('should resolve conflicts')
  })
})
```

## Test Configuration Improvements

### 1. Create Jest Setup File

**File:** `jest.setup.ts`
```typescript
import '@testing-library/jest-dom'

// Mock environment variables
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'
process.env.AWS_REGION = 'us-east-1'
process.env.AWS_ACCESS_KEY_ID = 'test-key'
process.env.AWS_SECRET_ACCESS_KEY = 'test-secret'
process.env.AWS_TEXTRACT_BUCKET = 'test-bucket'

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}))
```

### 2. Update Jest Config

**File:** `jest.config.ts`
```typescript
setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
collectCoverageFrom: [
  'lib/**/*.{js,jsx,ts,tsx}',
  'components/**/*.{js,jsx,ts,tsx}',
  'app/**/*.{js,jsx,ts,tsx}',
  '!**/*.d.ts',
  '!**/node_modules/**',
],
```

### 3. Add Test Scripts

**File:** `package.json`
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testMatch='**/*.integration.test.ts'",
    "test:unit": "jest --testPathIgnorePatterns=integration"
  }
}
```

## Testing Strategy Roadmap

### Phase 1: Critical Business Logic (Weeks 1-2)
**Priority:** 🔴 P0
**Estimated effort:** 40 hours

1. ✅ TextractService - OCR processing core
2. ✅ RegisterCompanyService - Company registration flow
3. ✅ Domain schemas - Data validation
4. ✅ Auth actions - Security critical

**Target coverage:** 80%+ for these modules

### Phase 2: Form & Validation (Week 3)
**Priority:** 🟡 P1
**Estimated effort:** 20 hours

1. ✅ useRegistrationForm hook - Complex state management
2. ✅ OCR actions - Document processing
3. ✅ Login form component - User entry point
4. ✅ Registration form component - Core feature

**Target coverage:** 70%+ for these modules

### Phase 3: Components & UI (Week 4)
**Priority:** 🟢 P2
**Estimated effort:** 25 hours

1. ✅ Dashboard components - Data display
2. ✅ Landing page components - Marketing
3. ✅ Core UI components (Button, Input, Card)
4. ✅ Registration step components

**Target coverage:** 60%+ for these modules

### Phase 4: Infrastructure & Polish (Week 5)
**Priority:** 🟢 P3
**Estimated effort:** 15 hours

1. ✅ AWS provider tests
2. ✅ Supabase provider tests
3. ✅ Utility function tests
4. ✅ Remaining UI components
5. ✅ E2E integration tests

**Target coverage:** 50%+ for these modules

## Coverage Goals

### Short-term (1 month)
- **Overall coverage:** 50%+
- **Critical paths:** 80%+
- **CI/CD integration:** Enforce 40% minimum

### Medium-term (3 months)
- **Overall coverage:** 70%+
- **Critical paths:** 90%+
- **CI/CD integration:** Enforce 60% minimum

### Long-term (6 months)
- **Overall coverage:** 80%+
- **Critical paths:** 95%+
- **CI/CD integration:** Enforce 75% minimum

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| OCR bugs in production | High | Medium | Add comprehensive TextractService tests |
| Registration failures | High | Medium | Add RegisterCompanyService + form tests |
| Auth vulnerabilities | Critical | Low | Add auth action tests |
| Data validation issues | High | High | Add schema validation tests |
| File upload failures | Medium | Medium | Add file upload integration tests |
| UI regressions | Low | High | Add component snapshot tests |

## Recommendations

### Immediate Actions (This Sprint)
1. ✅ Create `jest.setup.ts` with mocks
2. ✅ Write TextractService tests (highest complexity)
3. ✅ Write RegisterCompanyService tests
4. ✅ Add schema validation tests
5. ✅ Set up coverage reporting in CI/CD

### Near-term Actions (Next Sprint)
1. ✅ Add auth action tests
2. ✅ Write useRegistrationForm tests
3. ✅ Add integration tests for registration flow
4. ✅ Begin component testing (login, registration)

### Long-term Actions (Next Quarter)
1. ✅ Achieve 80% coverage on critical paths
2. ✅ Add E2E tests with Playwright/Cypress
3. ✅ Implement visual regression testing
4. ✅ Add performance testing for OCR operations

## Conclusion

The codebase has **significant test coverage gaps** that pose risks to production stability. The most critical areas—OCR processing, company registration, and authentication—have **zero test coverage** despite being complex and business-critical.

**Recommended immediate focus:**
1. TextractService (500+ lines of complex logic)
2. RegisterCompanyService (file uploads, DB operations)
3. Domain validation schemas (data integrity)
4. Auth actions (security)

With dedicated effort over 4-5 weeks, we can achieve 50%+ overall coverage and 80%+ coverage on critical paths, significantly reducing production risk.

---

**Report Generated:** 2026-01-06
**Total Recommended Tests:** 260-340 test cases
**Estimated Implementation Time:** 100+ hours
