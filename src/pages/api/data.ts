import { NextApiRequest, NextApiResponse } from 'next';
import { raceEvents } from '@/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(raceEvents);
}
