import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbconnect/databaseConnect';
import { Respberry } from '@/models/resberymodel';

export async function GET(request) {
  await dbConnect(); 
  const url = new URL(request.url);
  const exId = url.searchParams.get('exId');

  if (!exId) {
    console.log('Experiment ID not available');
    return NextResponse.json({ message: 'Experiment ID is required' }, { status: 400 });
  }

  try {
    const experiment = await Respberry.findOne({ ExperimentId: exId });

    if (!experiment) {
      return NextResponse.json({ message: 'Experiment not found' }, { status: 404 });
    }

    return NextResponse.json({ experiment }, { status: 200 });
  } catch (error) {
    console.error('Server error:', error); 
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
