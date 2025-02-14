export default async function Login(state: {}, formData: any) {
  console.log("formData:", formData); // 🔹 Verificando se os dados estão corretos

  const nome_usuario = formData.username;
  const password = formData.password;

  try {
    if (!nome_usuario || !password) throw new Error("Preencha os dados.");

    const response = await fetch("http://192.168.1.4:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome_usuario, senha: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { data: null, ok: false, error: errorData.erro || "nome usuario ou senha inválidos." };
    }

    const data = await response.json();

    if (!data.usuario) {
      return { data: null, ok: false, error: "Dados do usuário não foram recebidos." };
    }

    console.log("Login bem-sucedido:", data.usuario);

    return { data: data.usuario, ok: true, error: "" }; // 🔹 Retornando `ok: true` para indicar sucesso
  } catch (error: any) {
    return { data: null, ok: false, error: error.message || "Erro desconhecido" };
  }
}
