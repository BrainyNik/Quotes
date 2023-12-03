const categories = [
  "random",
  "happiness",
  "alone",
  "anger",
  "art",
  "beauty",
  "change",
  "best",
  "dating",
  "death",
  "dreams",
  "environmental",
  "equality",
  "experience",
  "failure",
  "faith",
  "family",
  "famous",
  "fear",
  "fitness",
  "forgiveness",
  "freedom",
  "friendship",
  "god",
  "great",
  "happiness",
  "health",
  "history",
  "money",
  "home",
  "hope",
  "imagination",
  "inspirational",
  "leadership",
  "learning",
  "life",
  "love",
  "morning",
];
function GenerateRandomCategory() {
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}
module.exports = {GenerateRandomCategory, categories};
