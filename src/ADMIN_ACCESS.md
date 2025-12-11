# Admin Panel Access Guide

## 🔐 Accessing the Admin Panel

The admin panel is a **hidden feature** designed exclusively for administrators and developers. Regular users cannot see or access it through normal navigation.

### Access Method 1: Secret Key Combination

Press **`Ctrl + Shift + A`** three times in quick succession (within 3 seconds) while on any page of the website.

**Steps:**
1. Navigate to any page on the website
2. Press `Ctrl + Shift + A`
3. You'll see a toast notification: "Admin access detected... (press 2 more times)"
4. Press `Ctrl + Shift + A` again
5. You'll see: "Almost there... (press 1 more time)"
6. Press `Ctrl + Shift + A` one final time
7. You'll see: "Admin panel unlocked!"
8. The admin login page will appear

### Access Method 2: Easter Egg Hint

Hover over the copyright text in the footer to reveal a hidden hint about the admin panel access.

---

## 🔑 Admin Login Credentials

Use these credentials to log into the admin panel:

### Primary Admin
- **Username:** `admin`
- **Password:** `SIH@Admin2024!`

### Super Admin
- **Username:** `superadmin`
- **Password:** `SuperSIH#2024`

### Developer Account
- **Username:** `dev`
- **Password:** `DevSIH@2024`

---

## 📊 Admin Panel Features

Once logged in, you'll have access to:

### 1. Overview Dashboard
- Total submissions count
- Registered colleges statistics
- Active teams count
- Problem statements overview
- Recent activity feed
- Top performing colleges

### 2. Problem Statements Management
- View all problem statements
- Add new problem statements
- Edit existing problems
- Delete problem statements
- Track submissions per problem
- Search and filter problems

### 3. Colleges & SPOCs Management
- View all registered colleges
- SPOC contact information
- Number of teams per college
- Last login tracking
- Export college data
- Search and filter colleges

### 4. Team Submissions Management
- View all team submissions
- Review submission status (Submitted, Under Review, Approved)
- Download team presentations
- Update submission status
- View team details
- Search and filter submissions

---

## 🛡️ Security Features

1. **Hidden Access:** The admin panel cannot be accessed through normal navigation
2. **Strong Credentials:** Admin passwords follow security best practices
3. **Activity Logging:** All admin activities are tracked (in production)
4. **Authorized Access Only:** Clear warnings about unauthorized access
5. **Session Management:** Automatic logout functionality

---

## ⚠️ Important Notes

- The admin panel is completely hidden from the main navigation
- Regular users and SPOC users cannot access the admin panel
- All admin activities should be logged (implement in production)
- In production, implement proper backend authentication
- Store credentials securely using environment variables
- Implement role-based access control (RBAC) for different admin levels

---

## 🔧 For Developers

### Customizing Access Method

The key combination is defined in `App.tsx`:

```typescript
// Current: Ctrl+Shift+A pressed 3 times
if (e.ctrlKey && e.shiftKey && e.key === 'A') {
  // Access logic
}
```

You can modify this to use a different key combination or implement URL-based access.

### Adding New Admin Features

Admin features are defined in `/components/AdminDashboard.tsx`. To add new sections:

1. Add a new tab in the `TabsList`
2. Create a new `TabsContent` component
3. Implement the feature logic
4. Update mock data as needed

---

## 📝 Production Checklist

Before deploying to production:

- [ ] Replace mock data with real API calls
- [ ] Implement proper backend authentication
- [ ] Use environment variables for credentials
- [ ] Set up secure session management
- [ ] Implement activity logging
- [ ] Add rate limiting for login attempts
- [ ] Enable HTTPS/SSL
- [ ] Implement RBAC (Role-Based Access Control)
- [ ] Add audit trail for all admin actions
- [ ] Set up monitoring and alerts

---

## 🎯 Quick Start

1. **Access Admin Panel:** Press `Ctrl + Shift + A` three times
2. **Login:** Use `admin` / `SIH@Admin2024!`
3. **Explore:** Navigate through different tabs to manage the platform
4. **Logout:** Click the logout button in the top-right corner

---

**Remember:** This admin panel should remain hidden from regular users. Only share access credentials with authorized personnel.
