const emojis: Record<string, string> = {
  "t-shirt-noir": "👕",
  casquette: "🧢",
  sneakers: "👟",
  "sac-a-dos": "🎒",
  montre: "⌚",
  "lunettes-de-soleil": "🕶️",
};

export function productEmoji(slug: string) {
  return emojis[slug] ?? "📦";
}