// Test file for currency converter
// Run this in browser console to test the converter

import { getUSDtoINRRate, convertUSDtoINR, convertUSDtoPaise } from './currencyConverter';

async function testCurrencyConverter() {
  console.log('Testing Currency Converter...\n');

  // Test 1: Get exchange rate
  console.log('Test 1: Fetching exchange rate...');
  const rate = await getUSDtoINRRate();
  console.log(`✓ Current rate: 1 USD = ₹${rate} INR\n`);

  // Test 2: Convert USD to INR
  console.log('Test 2: Converting $100 to INR...');
  const inr = await convertUSDtoINR(100);
  console.log(`✓ $100 USD = ₹${inr.toFixed(2)} INR\n`);

  // Test 3: Convert USD to Paise (for Razorpay)
  console.log('Test 3: Converting $170 to paise...');
  const paise = await convertUSDtoPaise(170);
  console.log(`✓ $170 USD = ${paise} paise (₹${(paise/100).toFixed(2)} INR)\n`);

  // Test 4: Multiple conversions
  console.log('Test 4: Converting multiple amounts...');
  const amounts = [50, 100, 150, 200, 250];
  for (const amount of amounts) {
    const converted = await convertUSDtoINR(amount, rate);
    console.log(`  $${amount} USD = ₹${converted.toFixed(2)} INR`);
  }

  console.log('\n✅ All tests completed!');
}

// Export for use in other files
export { testCurrencyConverter };
