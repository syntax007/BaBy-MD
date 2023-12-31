
import yts from 'yt-search'
import { youtubedl, youtubedlv2, youtubedlv3 } from '@bochilteam/scraper'
let limit = 320
let handler = async (m, { conn, text, args, isPrems, isOwner, usedPrefix, command }) => {
  
    if (!text) throw `✳️ Enter a song title\n\n📌Ejemplo *${usedPrefix + command}* Lil Peep hate my life`
  let chat = global.db.data.chats[m.chat]
  let res = await yts(text)
  //let vid = res.all.find(video => video.seconds < 3600)
  let vid = res.videos[0]
  if (!vid) throw `✳️ Video/Audio not found`
  let isVideo = /vid$/.test(command)
  m.react('🎧') 
  
  try {
  let q = isVideo ? '360p' : '128kbps' 
  let v = vid.url
  let yt = await youtubedl(v).catch(async () => await youtubedlv2(v)).catch(async () => await youtubedlv3(v))
  let dl_url = await (isVideo ? yt.video[q].download() : yt.audio[q].download())
  let title = await yt.title
  let size = await (isVideo ? yt.video[q].fileSizeH : yt.audio[q].fileSizeH)
  let play = `
	≡ *SYNTAX MUSIC*
┌──────────────
▢ 📌 *Title* : ${vid.title}
▢ 📆 *Published:* ${vid.ago}
▢ ⌚ *Duration:* ${vid.timestamp}
▢ 👀 *Views:* ${vid.views}
└──────────────

_Sending..._`
conn.sendFile(m.chat, vid.thumbnail, 'play', play, m, null, rpl)

if (size.split('MB')[0] >= limit) return m.reply(` ≡  *SYNTAX YTDL*\n\n▢ *⚖️Weight* : ${size}\n▢ *🎞️Quality* : ${q}\n\n▢ _The file exceeds the download limit__ *+${limit} MB*`) 
if (size.includes('GB')) return m.reply(` ≡  *SYNTAX YTDL*\n\n▢ *⚖️Weight* : ${size}\n▢ *🎞️Quality* : ${q}\n\n▢ _ The file exceeds the download limit _ *+${limit} MB*`)   
	  conn.sendFile(m.chat, dl_url, title + '.mp' + (3 + /vid$/.test(command)), `
 ≡  *SYNTAX YTDL*
  
▢ *📌Title* : ${title}
▢ *🎞️Quality* : ${q}
▢ *⚖️Weight* : ${size}
`.trim(), m, false, { mimetype: isVideo ? '' : 'audio/mpeg', asDocument: chat.useDocument })
		m.react(done) 
    } catch {
		m.reply(`Error: Try again`)
    }

}
handler.help = ['play']
handler.tags = ['dl']
handler.command = ['play2', 'playvid']

export default handler
