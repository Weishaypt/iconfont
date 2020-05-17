/* eslint-disable */
let svgicons2svgfont = require('svgicons2svgfont')
let svg2ttf = require('svg2ttf')
let ttf2woff = require('ttf2woff')
let StringDecoder = require('string_decoder').StringDecoder
function SvgFontBuilder() {

    let _self = this
    let _options

    this.bundle = function bundle(icons, options, callback) {
        // Save options
        _options = options || {}
        _options.fontName = _options.fontName || 'iconfont'
        // Generate SVG
        makeSVG(icons, function aSVGCallback(content) {
            let ttfFontBuffer = makeTTF(content)
            callback({ woff: makeWOFF(ttfFontBuffer)})
        })
    }
    function makeSVG(iconStreams, callback) {
        let fontStream = new svgicons2svgfont(_options)
        let parts = []
        let decoder = new StringDecoder('utf8')
        fontStream.on('data', function(chunk) {
            parts.push(decoder.write(chunk))
        });
        fontStream.on('finish', function() {
            callback(parts.join(''))
        });
        iconStreams.forEach(fontStream.write.bind(fontStream))
        fontStream.end()
    }

    function makeTTF(svgFont) {
        return svg2ttf(svgFont).buffer
    }


    function makeWOFF(ttfFontBuffer) {
        return ttf2woff(new Uint8Array(ttfFontBuffer.buffer)).buffer
    }
}

module.exports = SvgFontBuilder
