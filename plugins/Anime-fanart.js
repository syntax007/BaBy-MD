import fetch from 'node-fetch'

let handler = async (m, { conn, command }) => {
	let url = `https://api.lolhuman.xyz/api/random/art?apikey=${global.lolkey}`
	conn.sendButton(m.chat, 'Heres the FanArt ', wm, await(await fetch(url)).buffer(), [['Next',`.${command}`]],m)
	m.react('😳') 
}
handler.command = /^(fanart)$/i
handler.tags = ['anime']
handler.help = ['fanart']
handler.limit = true
handler.premium = true
export default handler
