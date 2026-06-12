import { NextResponse } from 'next/server';
import { db } from '@/lib/data';

export async function GET(request, context) {
  const params = await context.params;
  const [resource, slug] = params.route;
  
  if (!db[resource]) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  if (slug) {
    const item = db[resource].find(i => i.slug === slug || i.id === slug);
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    // Add listings for agents
    if (resource === 'agents') {
      const listings = db.properties.filter(p => p.agent_id === item.id);
      return NextResponse.json({ data: { ...item, listings } });
    }
    
    return NextResponse.json({ data: item });
  }

  return NextResponse.json({ data: db[resource] });
}
