# ⚙️ Fix for PowerShell SecurityException in MangaVerse Setup
**Updated:** October 17, 2025

When setting up **MangaVerse**, you might encounter an error like this:

```
SecurityException: Cannot run scripts on this system
```
or
```
Execution of scripts is disabled on this system.
```

This happens because **Windows PowerShell** blocks scripts by default.

---

## 🧩 Why It Happens

Windows PowerShell has an **Execution Policy** that prevents running `.js`, `.ps1`, or other scripts unless you explicitly allow it.

If your VSCode terminal or PowerShell shows a `SecurityException`, it means your current policy is set to:

```
Restricted
```

---

## 🛠️ Step-by-Step Fix

### 🪟 1. Open PowerShell as Administrator

- Click **Start**
- Search for **PowerShell**
- Right-click → **Run as administrator**

### 📜 2. Check Current Policy

Run this command:

```bash
Get-ExecutionPolicy
```

If it returns `Restricted`, proceed to the next step.

### 🔓 3. Allow Local Scripts

Run this command:

```bash
Set-ExecutionPolicy RemoteSigned
```

Then type:
```
Y
```
to confirm.

✅ This allows **locally created scripts** to run while keeping protection for downloaded ones.

---

## 💡 Alternative (for VSCode only)

If you want to enable it **only for your current user** instead of the whole system, open **VSCode** → **Terminal** → **New Terminal**, then run:

```bash
powershell Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This fixes the issue only for your account (safe and recommended).

---

## 🧠 After Fixing

Now try running your backend again:

```bash
node "Manga_Back End.js"
```

You should see:

```
✅ Connected to MongoDB
📚 Default mangas inserted.
🚀 Server running at http://localhost:3000
```

---

## ⚙️ Optional: Use Command Prompt Instead of PowerShell

If you prefer to avoid PowerShell issues entirely:

1. In **VSCode**, press `Ctrl + Shift + P`
2. Type: **"Terminal: Select Default Profile"**
3. Choose **Command Prompt**
4. Open a new terminal (`Ctrl + \``)

Then run your project again:

```bash
node "Manga_Back End.js"
```

---

## ✅ Summary

| Step | Command | Description |
|------|----------|-------------|
| Check Policy | `Get-ExecutionPolicy` | See if it's restricted |
| Allow Local Scripts | `Set-ExecutionPolicy RemoteSigned` | Enables local script execution |
| Limit to Current User | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` | Safer option |
| Run Server | `node "Manga_Back End.js"` | Starts MangaVerse backend |

---

**Now your setup will work normally — no more SecurityException errors. 🚀**
