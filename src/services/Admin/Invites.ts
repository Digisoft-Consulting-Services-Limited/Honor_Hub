export async function createInviteDraft(email: string) {
  return { email, status: 'draft' };
}
