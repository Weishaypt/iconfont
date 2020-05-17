<template>
  <div id="app">
    <div class="container text-center">
      <h1>Icon Pack generator</h1>
      Icon Packs in one file
      <br/>
      <a href="https://github.com/Weishaypt/iconfont" class="btn p-0 bv-no-focus-ring" target="_blank"><i class="_sanek-dev-logo-github" style="font-size: 2rem"></i></a>
      <br/>
      Author: <a href="https://sanek.dev" target="_blank">sanek.dev</a>
    </div>
    <HomePage/>
  </div>
</template>

<script>
import HomePage from './components/HomePage'

export default {
  name: 'App',
  metaInfo () {
    return {
      title: 'Icon Pack generator'
    }
  },
  components: {
    HomePage
  }
}
</script>

<style>
  [class*='_sanek-dev-']:before{font-family: '_sanek-dev'; display: inline-block; line-height: 1;box-sizing: border-box; font-style: normal;}._sanek-dev-logo-github:before {content: '';}@font-face{font-family:"_sanek-dev";src:url(data:font/woff;charset=utf-8;base64,d09GRgABAAAAAAS0AAsAAAAABvwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAAPgAAAFY2IECwY21hcAAAAYQAAABKAAABcOEpo61nbHlmAAAB0AAAAREAAAEwLvzxRWhlYWQAAALkAAAALgAAADYYlnL7aGhlYQAAAxQAAAAYAAAAJAeTA+tobXR4AAADLAAAAAgAAAAIA+gAAGxvY2EAAAM0AAAABgAAAAYAmAAAbWF4cAAAAzwAAAAeAAAAIAENAHJuYW1lAAADXAAAATMAAAIuw7iTnHBvc3QAAASQAAAAJAAAADUDXTPweJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGT8wjiBgZWBgamKaQ8DA0MPhGZ8wGDIyAQUZWBlZsAKAtJcUxgcHjA+YGR+AeRGgUmgRhABAAF9Cz4AAHic7ZCxDYAwEAPPykOBGIEqNbNQsb/YJPkY2CKWzpJPXz2wACU5kwDdiJErrewLm31QfRPDP2rt79zhRiszu/v4ln/1gjocmAlVAAB4nCWMzWrCQBRG5+ZnMplMsLHmXqlVWwsZN1Y0dQa0xJ2rbkVxJ9Lgxq6EggXXPovP1wdopN/iLD4OhwGr5l7dK/tkDHoBD3jKqQOEeQETzV96OtPZEP5hTT5Cwi5gPrbGVufk7UZraExIhkxlGMIqg2njRsI0aGCOtgBrtLnF4Pe73E1noLPLyvUiBYhtqseSe2EcStGUvrqvKykeRw9NjpvX+SBwnJrv39GT/jroZ0x8v+ZCMJgPN7EIIYo8b3XJNMD7dFe612JW7k/b9fLcAYjDD1+KmlSSEiV4ErigwjgaKZ3Kvj0u8oS0dkCoVrfbUgIcrSnJF0fbl1GD2j9hDNA5L9fb076cFYz9AXxLKUMAAAB4nGNgZGBgAOLt7Nu2xPPbfGXgZn4BFGG49VzcDJlmXsW8CkhxMDCBeAA6oQpAAAB4nGNgZGBgfsHAACdXMTAyoAImAECiAogAAAAAA+gAAAAAAAAAmAAAeJxjYGRgYGBiSGMA0SAWAwMXEDIw/AfzGQASjQGAAAB4nG2RO07DQBRFr/NDJBICgWhopoEGxU5SpqRI+hRuIyceOx/bY40nEdkDK2ARLIKCNbAIFsGNeVIklBnpzZnzrp9kG8A1vuDhuDx063pcDVzw9sdN0o1wi/wg3EYPj8Id+oFwF88YC/dwC80JXuuS5g6vwg1c4U24Sf8u3CJ/CLdxj0/hDv23cBchfoR7ePJe5lVU6G0/1vuZTndZZE/iRKG21doUaugPTnKqC20jp2O1OKhqn46cS1RiTa4mpnA6y4wqrdnopfNXzpXjIEjE+0uTY44KEQq+4RZ9xDz3mLGm2CFjx55NnHMhq6Vfw7CjMITP73kuOWUt6nQExzNmeoEDa8VuihGtQ8J7woxBTprUU4/pjNvQlHVvQ7Ok97Gqnyr53wLu5F/eZ4qTfgHbhmNUAHicY2BigAAuBuyAiZGJkZmBOyc/PV83PbMkozSJgQEAJmgEgg==);}</style>
