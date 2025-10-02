import { toast } from "sonner";

export async function DeletePersona(userId: string, personaId: string) {
  console.log(userId);
  if (!userId) return toast(<span>user id not found </span>);
  const res = await fetch(`/api/persona/${personaId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });
  return await res.json();
}
