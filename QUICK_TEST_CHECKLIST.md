# Quick Post-Deployment Testing Checklist

Use this quick checklist for rapid testing after deployment.

## 🚀 Quick Test (5 minutes)

### Basic Functionality
- [ ] Visit deployed URL - page loads
- [ ] Click "Get Started" - registration page opens
- [ ] Register new account - redirects to dashboard
- [ ] Click "New Task" - dialog opens
- [ ] Create a task - appears in list
- [ ] Click edit icon - task updates
- [ ] Click delete icon - task removed
- [ ] Click logout - redirects to login
- [ ] Login again - dashboard accessible

**If all pass → ✅ Basic functionality works!**

---

## 🔍 Detailed Test (15 minutes)

### Authentication Flow
1. **Registration**
   - [ ] Go to `/register`
   - [ ] Fill form and submit
   - [ ] Verify redirect to dashboard
   - [ ] Check user name in nav

2. **Login**
   - [ ] Go to `/login`
   - [ ] Enter credentials
   - [ ] Verify redirect to dashboard
   - [ ] Refresh page - still logged in

3. **Logout**
   - [ ] Click logout
   - [ ] Verify redirect to login
   - [ ] Try `/dashboard` - redirects to login

### Task Management
1. **Create**
   - [ ] Create task with all fields
   - [ ] Create task with only title
   - [ ] Verify stats update

2. **Read**
   - [ ] View all tasks
   - [ ] Filter by status
   - [ ] Filter by priority
   - [ ] Verify stats accuracy

3. **Update**
   - [ ] Edit task title
   - [ ] Change status
   - [ ] Update priority
   - [ ] Verify changes persist

4. **Delete**
   - [ ] Delete a task
   - [ ] Verify removal
   - [ ] Check stats update

### UI/UX
- [ ] Test on mobile (dev tools)
- [ ] Test on tablet (dev tools)
- [ ] All buttons clickable
- [ ] Forms work correctly
- [ ] No console errors (F12)

### AI Features (if configured)
- [ ] Click sparkle icon - priority predicted
- [ ] Enter prompt in AI assistant
- [ ] Get suggestions - response appears

---

## 🐛 Common Issues & Quick Fixes

| Issue | Quick Check | Solution |
|-------|-------------|----------|
| Page not loading | Check URL | Verify deployment succeeded |
| Registration fails | Check console | Verify MongoDB connection |
| Login not working | Check cookies | Verify JWT_SECRET set |
| Tasks not loading | Check network tab | Verify API endpoint |
| AI not working | Check console | Verify OPENAI_API_KEY |

---

## ✅ Success Indicators

Your app is working if:
- ✅ Can register and login
- ✅ Can create/edit/delete tasks
- ✅ Filters work
- ✅ Stats are accurate
- ✅ No console errors
- ✅ Responsive on mobile

---

## 📝 Test Results Template

```
Date: ___________
URL: ___________
Tester: ___________

Results:
- Authentication: ✅ / ❌
- CRUD: ✅ / ❌
- Filters: ✅ / ❌
- UI/UX: ✅ / ❌
- Performance: ✅ / ❌

Issues: ___________
Status: Ready / Needs Fixes
```

---

**For detailed testing, see `POST_DEPLOYMENT_TESTING.md`**

