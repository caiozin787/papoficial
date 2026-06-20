import { redirect } from 'next/navigation';
import { getCurrentProfile, type Profile } from '@/lib/auth';

export async function requireAdmin(): Promise<Profile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect('/login');
  if (profile.role !== 'admin') redirect('/dashboard');
  return profile;
}
