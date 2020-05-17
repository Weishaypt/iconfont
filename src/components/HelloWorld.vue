<template>
  <div class="container">
    <b-form-group>
      <b-textarea v-model="css" no-resize rows="10"/>
    </b-form-group>
    <div class="mt-5">
      <b-form-file
        type="file"
        ref="file"
        @change="fileChange"
        multiple
      />
      <b-row>
        <b-col
          v-for="(item, index) in files"
          :key="index"
        >
          <b-card no-body>
            <template v-slot:header>
              <b-btn variant="danger" @click="remove(item)">
                <i class="icon-master-close"></i>
              </b-btn>
            </template>
            <img class="img-fluid" :src="item.base64" />
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      files: [],
      baseName: 'test'
    }
  },
  computed: {
    css () {
      let str = ''
      this.files.forEach(item => {
        str += `
.${this.baseName}-${item.id} {
  background-image: url('${item.base64}')
}
`
      })
      return str
    }
  },
  mounted () {
  },
  methods: {
    remove (target) {
      this.files = this.files.filter(item => item.id !== target.id)
    },
    fileChange: function (e) {
      const self = this
      console.log('file changed')
      var input, fr

      input = this.$refs.file.$refs.input
      console.log(input)
      input.files.forEach((item, index) => {
        perFile(input.files[index])
      })
      function perFile (file) {
        fr = new FileReader()
        fr.onload = createImage
        fr.readAsDataURL(file)

        function createImage () {
          let name = file.name.split('.')
          name.pop()
          name = name.join('.')
          self.files.push({
            id: name,
            base64: fr.result
          })
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .icon-master-close:before {
    content: " ";
  }
  .icon-master-close {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNNDA1IDEzNi43OThMMzc1LjIwMiAxMDcgMjU2IDIyNi4yMDIgMTM2Ljc5OCAxMDcgMTA3IDEzNi43OTggMjI2LjIwMiAyNTYgMTA3IDM3NS4yMDIgMTM2Ljc5OCA0MDUgMjU2IDI4NS43OTggMzc1LjIwMiA0MDUgNDA1IDM3NS4yMDIgMjg1Ljc5OCAyNTZ6Ii8+PC9zdmc+')
  }
</style>
