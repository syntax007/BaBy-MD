import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Send/Reply Images with caption .to anime'
m.reply('Wait a moment...')
let media = await q.download()
let url = await uploadImage(media)
let hasil = await (await fetch(`https://xzn.wtf/api/toanime?url=${url}&apikey=${global.xzn}`)).buffer()
await conn.sendFile(m.chat, hasil, '', global.wm, m)
	
}
handler.help = ['toanime']
handler.tags = ['anime', 'ai']
handler.command = /^(toanime)$/i

handler.register = true
handler.limit = true

export default handler
