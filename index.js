export default async function handler(req) {
  const urlParts = req.url.split('/');
  const type = urlParts[1];

  let list = [];

  if (type === 'food') {
    const data = await import('./food.json');
    list = data.default.list;
  } else if (type === 'daily') {
    const data = await import('./daily.json');
    list = data.default.list;
  } else if (type === 'electronics') {
    const data = await import('./electronics.json');
    list = data.default.list;
  } else {
    return new Response(
      JSON.stringify({ code: 404, result: "分类不存在" }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  const randomItem = list[Math.floor(Math.random() * list.length)];

  return new Response(
    JSON.stringify({ code: 200, result: randomItem }),
    { headers: { "Content-Type": "application/json" } }
  );
}
