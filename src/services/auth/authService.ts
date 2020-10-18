export async function login(username: string, password: string) {
  return { username };
}

export async function logout() {
  return true;
}
