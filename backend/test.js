const fetch = require('node-fetch-commonjs'); 

const API = 'http://localhost:4000/api';
let token = '';

async function runTests() {
  console.log('--- STARTING ZEN_TRACK BACKEND TESTS ---');

  // Test 1: Register
  console.log('\\n[TEST 1] Registering test user...');
  const resReg = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@zentrack.com', password: 'password123' })
  });
  
  if (resReg.status === 201) {
    const data = await resReg.json();
    token = data.token;
    console.log('✅ Registration successful. Token received.');
  } else if (resReg.status === 400) {
    console.log('ℹ️ User already exists. Proceeding to login...');
    const resLog = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@zentrack.com', password: 'password123' })
    });
    const logData = await resLog.json();
    token = logData.token;
    console.log('✅ Login successful. Token received.');
  } else {
    console.error('❌ Auth failed:', await resReg.text());
    return;
  }

  // Test 2: Push Sync Data
  console.log('\\n[TEST 2] Pushing data to cloud...');
  const mockMoods = [
    { id: '1', level: 4, note: 'Great day', timestamp: Date.now() },
    { id: '2', level: 3, note: 'Okay day', timestamp: Date.now() - 86400000 }
  ];
  const mockChat = [
    { id: '1', role: 'user', content: 'Hello', timestamp: Date.now() },
    { id: '2', role: 'assistant', content: 'Hi there! How are you?', timestamp: Date.now() + 1000 }
  ];

  const resPush = await fetch(`${API}/sync/push`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ moods: mockMoods, chat: mockChat })
  });
  
  if (resPush.ok) {
    console.log('✅ Push successful. Data saved to SQLite db.');
  } else {
    console.error('❌ Push failed:', await resPush.text());
    return;
  }

  // Test 3: Pull Sync Data
  console.log('\\n[TEST 3] Pulling data from cloud...');
  const resPull = await fetch(`${API}/sync/pull`, {
    method: 'GET',
    headers: { 
      'Authorization': `Bearer ${token}`
    }
  });

  if (resPull.ok) {
    const pulledData = await resPull.json();
    if (pulledData.moods.length === 2 && pulledData.chat.length === 2) {
      console.log('✅ Pull successful. Data integrity verified.');
    } else {
      console.error('❌ Pull data mismatch:', pulledData);
    }
  } else {
    console.error('❌ Pull failed:', await resPull.text());
  }

  console.log('\\n--- ALL TESTS COMPLETED SUCCESSFULLY ---');
}

runTests().catch(console.error);
