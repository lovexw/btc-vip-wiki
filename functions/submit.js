// functions/submit.js
export async function onRequestPost(context) {
  try {
    const { request, env } = context; // 从 context 里解构出 env
    const body = await request.json();
    const term = body.term;

    if (!term) {
      return new Response(JSON.stringify({ error: '没有提供词条' }), { status: 400 });
    }

    // ⭐ 魔法就在这里：WECHAT_WEBHOOK_URL 是我们在 CF 后台配置的变量名
    const wechatWebhookUrl = env.WECHAT_WEBHOOK_URL; 

    if (!wechatWebhookUrl) {
      return new Response(JSON.stringify({ error: '后端未配置 Webhook 密钥' }), { status: 500 });
    }

    const msgPayload = {
      msgtype: "text",
      text: {
        content: `🚨 [Wiki 新词条求助]\n有网友希望解释新黑话：\n【 ${term} 】\n大佬请尽快安排更新！`
      }
    };

    await fetch(wechatWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msgPayload)
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}