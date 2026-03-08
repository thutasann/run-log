// @ts-check

import { parseDate } from './utils.js';

/**
 * Generate GitHub-style heatmap calendar for the year
 * @param {string[]} dates - Array of exercise dates
 * @param {number} [year] - Year to display (defaults to current year)
 * @returns {string} ASCII heatmap
 */
export function generateYearHeatmap(dates, year = new Date().getFullYear()) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Create a set for quick lookup
  const dateSet = new Set(dates.filter(d => d.startsWith(String(year))));
  
  let heatmap = '\n';
  
  // Month headers
  heatmap += '      ';
  for (let m = 0; m < 12; m++) {
    heatmap += months[m].padEnd(9, ' ');
  }
  heatmap += '\n';
  
  // Week rows (7 rows for days of week)
  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
  
  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    heatmap += dayLabels[dayOfWeek].padEnd(6, ' ');
    
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Mon = 0, Sun = 6
      
      let weekStr = '';
      for (let week = 0; week < 5; week++) {
        const dayNum = week * 7 + dayOfWeek - adjustedFirstDay + 1;
        
        if (dayNum >= 1 && dayNum <= daysInMonth) {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
          weekStr += dateSet.has(dateStr) ? '🟢' : '⚫';
        } else {
          weekStr += ' ';
        }
      }
      heatmap += weekStr.padEnd(9, ' ');
    }
    heatmap += '\n';
  }
  
  heatmap += '\n      🟢 = Ran    ⚫ = Rest\n';
  
  return heatmap;
}

/**
 * Generate monthly summary with bar chart
 * @param {string[]} dates - Array of exercise dates
 * @param {number} [monthsToShow=6] - Number of recent months to show
 * @returns {string} Monthly summary with bar chart
 */
export function generateMonthlySummary(dates, monthsToShow = 6) {
  const monthCounts = new Map();
  
  // Count runs per month
  dates.forEach(dateStr => {
    const date = parseDate(dateStr);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthCounts.set(monthKey, (monthCounts.get(monthKey) || 0) + 1);
  });
  
  // Get recent months
  const sortedMonths = Array.from(monthCounts.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, monthsToShow);
  
  if (sortedMonths.length === 0) return '\nNo data to display\n';
  
  const maxCount = Math.max(...sortedMonths.map(([, count]) => count));
  const barWidth = 50;
  
  let summary = '\n';
  
  sortedMonths.reverse().forEach(([month, count]) => {
    const barLength = Math.round((count / maxCount) * barWidth);
    const bar = '█'.repeat(barLength);
    const [year, monthNum] = month.split('-');
    const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'short' });
    
    summary += `${monthName} ${year}  ${bar} ${count} runs\n`;
  });
  
  return summary;
}

/**
 * Generate weekly summary for last N weeks
 * @param {string[]} dates - Array of exercise dates
 * @param {number} [weeksToShow=4] - Number of recent weeks to show
 * @returns {string} Weekly summary with bar chart
 */
export function generateWeeklySummary(dates, weeksToShow = 4) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const weekCounts = [];
  
  for (let i = 0; i < weeksToShow; i++) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - (i + 1) * 7);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    let count = 0;
    dates.forEach(dateStr => {
      const date = parseDate(dateStr);
      date.setHours(0, 0, 0, 0);
      
      if (date >= weekStart && date <= weekEnd) {
        count++;
      }
    });
    
    weekCounts.push({
      start: weekStart,
      end: weekEnd,
      count
    });
  }
  
  const maxCount = Math.max(...weekCounts.map(w => w.count), 1);
  const barWidth = 30;
  
  let summary = '\n';
  
  weekCounts.reverse().forEach(({ start, end, count }) => {
    const barLength = Math.round((count / maxCount) * barWidth);
    const bar = '▓'.repeat(barLength);
    const dateRange = `${start.getMonth() + 1}/${start.getDate()}-${end.getMonth() + 1}/${end.getDate()}`;
    
    summary += `Week ${dateRange.padEnd(11)}  ${bar.padEnd(barWidth)} ${count} runs\n`;
  });
  
  return summary;
}

/**
 * Generate streak history visualization
 * @param {string[]} dates - Array of exercise dates sorted
 * @returns {string} Streak history stats
 */
export function generateStreakHistory(dates) {
  if (dates.length === 0) return '\nNo running history yet!\n';
  
  const streaks = [];
  let currentStreak = 1;
  
  for (let i = 1; i < dates.length; i++) {
    const prevDate = parseDate(dates[i - 1]);
    const currDate = parseDate(dates[i]);
    
    const diffTime = currDate.getTime() - prevDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak++;
    } else {
      if (currentStreak > 1) {
        streaks.push(currentStreak);
      }
      currentStreak = 1;
    }
  }
  
  if (currentStreak > 1) {
    streaks.push(currentStreak);
  }
  
  const longestStreak = streaks.length > 0 ? Math.max(...streaks) : 1;
  const avgStreak = streaks.length > 0 ? (streaks.reduce((a, b) => a + b, 0) / streaks.length).toFixed(1) : 0;
  
  let history = '\n';
  history += `🏆 Longest Streak: ${longestStreak} days\n`;
  history += `📊 Average Streak: ${avgStreak} days\n`;
  history += `🔥 Total Streaks: ${streaks.length}\n`;
  history += `📅 First Run: ${dates[0]}\n`;
  history += `⏱️  Days Active: ${dates.length} days\n`;
  
  // Calculate consistency (% of days since first run)
  const firstDate = parseDate(dates[0]);
  const lastDate = parseDate(dates[dates.length - 1]);
  const totalDays = Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const consistency = ((dates.length / totalDays) * 100).toFixed(1);
  
  history += `💯 Consistency: ${consistency}% (${dates.length}/${totalDays} days)\n`;
  
  return history;
}

/**
 * Generate day of week analysis
 * @param {string[]} dates - Array of exercise dates
 * @returns {string} Day of week breakdown
 */
export function generateDayOfWeekAnalysis(dates) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts = new Array(7).fill(0);
  
  dates.forEach(dateStr => {
    const date = parseDate(dateStr);
    dayCounts[date.getDay()]++;
  });
  
  const maxCount = Math.max(...dayCounts, 1);
  const barWidth = 30;
  
  let analysis = '\n';
  
  dayCounts.forEach((count, index) => {
    const barLength = Math.round((count / maxCount) * barWidth);
    const bar = '▓'.repeat(barLength);
    const dayName = dayNames[index].padEnd(10);
    
    analysis += `${dayName} ${bar.padEnd(barWidth)} ${count} runs\n`;
  });
  
  // Find favorite day
  const maxDayCount = Math.max(...dayCounts);
  const favoriteDays = dayNames.filter((_, i) => dayCounts[i] === maxDayCount);
  
  analysis += `\n⭐ Favorite Day: ${favoriteDays.join(', ')}\n`;
  
  return analysis;
}

/**
 * Generate current month calendar with marks
 * @param {string[]} dates - Array of exercise dates
 * @returns {string} Current month calendar
 */
export function generateCurrentMonthCalendar(dates) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const dateSet = new Set(dates);
  
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  
  let calendar = `\n${monthName}\n`;
  calendar += 'Su Mo Tu We Th Fr Sa\n';
  
  // Add leading spaces
  for (let i = 0; i < firstDay; i++) {
    calendar += '   ';
  }
  
  // Add days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasRun = dateSet.has(dateStr);
    const isToday = day === today.getDate();
    
    let dayStr = String(day).padStart(2, ' ');
    if (hasRun && isToday) {
      dayStr = `*${day}`;
    } else if (hasRun) {
      dayStr = `+${day}`;
    } else if (isToday) {
      dayStr = `[${day}]`.substring(0, 2);
    }
    
    calendar += dayStr + ' ';
    
    const currentDay = new Date(year, month, day).getDay();
    if (currentDay === 6 && day !== daysInMonth) {
      calendar += '\n';
    }
  }
  
  calendar += '\n\n';
  calendar += 'Legend: *Today+Ran  +Ran  [Today]\n';
  
  return calendar;
}
