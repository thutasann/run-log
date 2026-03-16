#!/usr/bin/env node
// @ts-check

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { loadJSON, getTodayDate } from './utils.js';
import {
  generateMonthlySummary,
  generateWeeklySummary,
  generateStreakHistory,
  generateDayOfWeekAnalysis,
  generateCurrentMonthCalendar
} from './visualize.js';

/** @typedef {import('./types.js').ExerciseData} ExerciseData */
/** @typedef {import('./types.js').StreakData} StreakData */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Display all statistics and visualizations
 */
function displayStats() {
  console.log('\n🏃 RUNNING TRACKER STATISTICS 🏃\n');
  console.log('='.repeat(60));
  
  // Load data
  const exercisesPath = join(__dirname, '..', 'exercises.json');
  const streakPath = join(__dirname, '..', 'streak.json');
  
  /** @type {ExerciseData} */
  const data = loadJSON(exercisesPath, { exercises: [] });
  
  /** @type {StreakData} */
  const streak = loadJSON(streakPath, {
    current_streak: 0,
    total_days: 0,
    last_updated: 'Never'
  });
  
  const dates = [...new Set(data.exercises.map(e => e.date))].sort();
  
  if (dates.length === 0) {
    console.log('\n❌ No running data found. Start tracking your runs with `npm run log`!\n');
    return;
  }
  
  // Current Stats
  console.log('\n📊 CURRENT STATS');
  console.log('-'.repeat(60));
  console.log(`🔥 Current Streak: ${streak.current_streak} days`);
  console.log(`🏃 Total Running Days: ${streak.total_days}`);
  console.log(`📅 Last Run: ${streak.last_updated}`);
  console.log(`📆 Today: ${getTodayDate()}`);
  
  // Streak History
  console.log('\n📈 STREAK HISTORY');
  console.log('-'.repeat(60));
  console.log(generateStreakHistory(dates));
  
  // Current Month Calendar
  console.log('\n📅 THIS MONTH');
  console.log('-'.repeat(60));
  console.log(generateCurrentMonthCalendar(dates));
  
  // Weekly Summary
  console.log('\n📊 LAST 4 WEEKS');
  console.log('-'.repeat(60));
  console.log(generateWeeklySummary(dates, 4));
  
  // Monthly Summary
  console.log('\n📊 LAST 6 MONTHS');
  console.log('-'.repeat(60));
  console.log(generateMonthlySummary(dates, 6));
  
  // Day of Week Analysis
  console.log('\n📊 DAY OF WEEK BREAKDOWN');
  console.log('-'.repeat(60));
  console.log(generateDayOfWeekAnalysis(dates));
  
  console.log('\n' + '='.repeat(60));
  console.log('\n💪 Keep up the great work! See you on the road! 🏃‍♂️\n');
}

// Run
displayStats();
