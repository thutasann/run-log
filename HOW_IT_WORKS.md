# 🏃 How This Exercise Streak Tracker Works

## 🚀 Quick Start

### 1. Initial Setup (One time only)
```bash
git clone <your-repo>
npm install
```

### 2. Daily Routine
After running, just run:
```bash
npm run log
```

**That's it!** You'll be prompted for:
- Date (press Enter for today)
- Strava activity ID (press Enter to skip)

Everything else happens automatically - files update, commit, and push to GitHub.

### 3. View Statistics
Want to see cool visualizations and stats?
```bash
npm run stats
```

This shows you:
- 📊 Current streak and totals
- 📈 Weekly and monthly summaries with charts
- 🗓️ Year heatmap (GitHub-style)
- 📅 Current month calendar
- 📊 Day of week breakdown
- 🏆 Streak history and records

## 📁 What Gets Updated

| File | What it tracks |
|------|---------------|
| `exercises.json` | All exercise dates |
| `streak.json` | Current streak & total days |
| `README.md` | Live stats, calendar, weekly chart & milestones |
| `logs/LOGS.md` | Exercise table & Strava embeds |

## 📊 Visualizations

Your running data comes to life with beautiful ASCII visualizations!

### Auto-Generated (in README.md)
- 📅 Current month calendar with run markers
- 📈 Last 4 weeks bar chart
- 🏆 Milestone progress tracker

### On-Demand (via `npm run stats`)
- 🗓️ Full year heatmap (GitHub-style contribution graph)
- 📊 6-month running summary with bar charts
- 📈 Streak history and records (longest streak, average, consistency %)
- 📊 Day of week breakdown (find your favorite running day!)
- 🎯 All-time statistics

## 🔔 GitHub Actions

Daily at 8 PM UTC, if you haven't pushed:
- Creates a reminder issue with funny titles
- Shows your current streak
- Motivates you to keep going

## 💡 Tips & Tricks

### Getting Strava Activity ID
1. Open activity: `https://www.strava.com/activities/15875620162`
2. The number at the end is your ID: `15875620162`
3. Paste when prompted

### Advanced Usage
```bash
npm run log
# Date: 2025-09-19  (backdate entry)
# Strava ID: 15875620162  (add activity)
```

### Multiple Runs per Day
Just run `npm run log` again - it creates empty commits!

### Check Your Progress
```bash
npm run stats
```

View comprehensive statistics including:
- Year heatmap showing all your runs
- Monthly and weekly trends
- Day of week preferences
- Longest streaks and consistency metrics

## ❓ FAQ

**Q: What if I forget to log?**  
A: You'll get a reminder issue. Just run `npm run log` when you see it.

**Q: Can I backdate?**  
A: Yes! Enter any date in YYYY-MM-DD format when prompted.

**Q: Where do Strava embeds appear?**  
A: In `logs/LOGS.md` with a clickable link to the activity.

## 🏆 Motivation

> "Your body is not a machine that breaks down with use. It's a system that breaks down from lack of use."

After 3 years of non-stop coding and developing heart rate issues, I learned that health isn't a nice-to-have feature - it's the core infrastructure everything else runs on.

**Remember:**
- Code can be refactored tomorrow, your health cannot
- A healthy developer ships better code
- Exercise is debugging for your body
- Your future self will thank you

Keep that streak alive! 🔥

## 🛠️ Technical Details

- **Node.js 20+** with ES modules
- **Type-safe** with JSDoc + TypeScript checking
- **GitHub Actions** for daily reminders
- **No dependencies** except dev tools

---

**Just `npm run log` and keep moving!** 🏃‍♂️💻