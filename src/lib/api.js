const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error(`Failed to fetch ${endpoint}:`, err);
    return null;
  }
}

export function formatCurrency(amount, currency = 'USD', compact = false) {
  const opts = compact
    ? { notation: 'compact', compactDisplay: 'short', maximumFractionDigits: 1 }
    : { style: 'currency', currency, maximumFractionDigits: 0 };
  if (compact) {
    return new Intl.NumberFormat('en-US', opts).format(amount);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
}

export function formatPrice(prop, displayCurrency = 'USD') {
  const rate = 12.0;
  const isUSD = prop.price.currency === 'USD';
  let val = prop.price.amount;
  if (displayCurrency === 'USD' && !isUSD) val = val / rate;
  if (displayCurrency === 'GHS' && isUSD) val = val * rate;
  const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: displayCurrency, maximumFractionDigits: 0 }).format(val);
  return prop.price.period === 'monthly' ? `${formatted} / mo` : formatted;
}
