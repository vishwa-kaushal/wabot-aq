let levelling = require('../lib/levelling')

let handler = m => {
  let user = global.DATABASE.data.users[m.sender]
  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    throw `
Level *${user.level} (${user.exp - min}/${xp})*
Less *${max - user.exp}* again!
`.trim()
  }
  user.level++
  m.reply(`
Congratulations, you have leveled up!
*${user.level - 1}* -> *${user.level}*
  `.trim())
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = /^levelup$/i

module.exports = handler