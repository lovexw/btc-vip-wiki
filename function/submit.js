// 文件路径：functions/submit.js
export async function onRequestPost(context) {
  try {
    const { request } = context;
    const body = await request.json();
    const term = body.term;

    if (!term) {
      return new Response(JSON.stringify({ error: '没有提供词条' }), { status: 400 });
    }

    // 这是你的企业微信 Webhook（藏在云端，前端绝对看不到）
    const wechatWebhookUrl = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=942d7a65-fbd7-46b0-b2b0-56680da4a881";

    const msgPayload = {
      msgtype: "text",
      text: {
        content: `🚨 [Wiki 新词条求助]\n有网友希望解释新黑话：\n【 ${term} 】\n大佬请尽快安排更新！`
      }
    };

    // 转发给企业微信
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