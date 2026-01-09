# LangMaster Authentication System Documentation

## Overview

The authentication system is built using **React Context API** for global state management, making authentication data and functions accessible throughout the entire application without prop drilling.

## Architecture

### 1. **AuthContext** (`context/AuthContext.jsx`)
The core context that manages all authentication state and logic.

**Features:**
- Token management (store/retrieve from sessionStorage)
- User state management
- API communication with the backend
- Error handling
- Session initialization on app load

**State:**
```javascript
{
  user: null,           // Authenticated user data
  token: null,          // JWT/auth token
  loading: false,       // Loading state for async operations
  error: null,          // Error messages
  isAuthenticated: bool // Convenience flag
}
```

**Methods:**
- `login(email, password)` - Authenticate user
- `signup(signupData)` - Register new user
- `logout()` - Clear auth state and session
- `setError(message)` - Set custom error messages

### 2. **Custom Hooks** (`lib/auth/useAuthHooks.js`)

#### `useAuth()`
Access the full auth context anywhere in the app.

```javascript
const { user, token, login, signup, logout, loading, error } = useAuth();
```

#### `useSignup()`
Specialized hook for signup forms with simplified interface.

```javascript
const { signup, isLoading, error } = useSignup();
```

### 3. **AuthProvider** 
Wraps the entire app in `layout.js` to make auth context available globally.

```javascript
<AuthProvider>
  <ThemeProvider>{children}</ThemeProvider>
</AuthProvider>
```

## Data Flow

### Login Flow
1. User enters credentials in login form
2. Form calls `login(email, password)` hook
3. Hook sends POST request to `/v1/api/login`
4. Backend returns token (supports multiple formats: `jwt`, `token`, `data.token`, `data.jwt`)
5. Token stored in `sessionStorage` and state
6. User redirected to `/dashboard`

### Signup Flow
1. User fills signup form with all required fields
2. Form calls `signup(signupData)` hook
3. Hook validates data and sends POST request to `/v1/api/register`
4. Backend creates user account and returns token (optional)
5. User auto-redirected to `/login` on success
6. Token automatically stored if provided by backend

### Logout Flow
1. `logout()` clears sessionStorage
2. Clears all auth state (user, token, error)
3. User can be redirected to `/login`

## File Structure

```
lib/auth/
  ├── authClient.js          # Low-level API communication (HTTP wrapper)
  └── useAuthHooks.js        # Custom hooks (useAuth, useSignup)

context/
  └── AuthContext.jsx        # Auth context, provider, and state management

app/
  ├── layout.js              # Wraps app with AuthProvider
  ├── login/page.jsx         # Login page using useAuth hook
  └── signup/page.jsx        # Signup page using useSignup hook
```

## Integration Examples

### Using in a Login Page
```javascript
'use client';
import { useAuth } from '@/lib/auth/useAuthHooks';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect after success
    } catch (err) {
      // Show error toast
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Using in a Signup Page
```javascript
'use client';
import { useSignup } from '@/lib/auth/useAuthHooks';

export default function SignupPage() {
  const { signup, isLoading } = useSignup();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signup({
        email,
        password,
        username,
        fullName,
        preferredLanguage,
        proficiencyLevel
      });
      // Redirect after success
    } catch (err) {
      // Show error
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### Using in Protected Components
```javascript
'use client';
import { useAuth } from '@/lib/auth/useAuthHooks';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  if (!isAuthenticated) {
    router.push('/login');
    return null;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.full_name}</h1>
      <button onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
```

## Backend API Endpoints

### Login
- **Endpoint:** `POST /v1/api/login`
- **Body:** `{ email, password }`
- **Response:** `{ jwt|token|data: { jwt|token }, user, message }`

### Signup/Register
- **Endpoint:** `POST /v1/api/register`
- **Body:** `{ email, password, username, full_name, preferred_language, proficiency_level, agree_to_terms }`
- **Response:** `{ message, user, jwt|token|data: { jwt|token } }`

## Token Handling

Tokens are stored in **sessionStorage** (not localStorage for security).

**Key:** `lm_token`

The context supports multiple token response formats from the backend:
- Direct: `res.jwt` or `res.token`
- Nested: `res.data.jwt` or `res.data.token`

## Error Handling

Errors are stored in the context `error` state and can be accessed:

```javascript
const { error } = useAuth();

if (error) {
  // Display error to user
}
```

## Security Notes

1. **SessionStorage:** Tokens cleared when browser tab closes
2. **HTTPS:** All API calls require secure connection in production
3. **Error Messages:** Don't expose sensitive backend errors to users
4. **Token Validation:** Implement token refresh if needed (not currently included)

## Future Enhancements

- [ ] Token refresh mechanism
- [ ] Remember me functionality (localStorage option)
- [ ] Refresh token rotation
- [ ] Protected route wrapper component
- [ ] Email verification flow
- [ ] Password reset functionality
